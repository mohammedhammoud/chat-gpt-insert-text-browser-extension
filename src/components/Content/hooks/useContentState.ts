import { PORT_NAME } from '@/constants';
import { Message, MessageAction } from '@/types';
import { useLayoutEffect, useRef, useState } from 'react';
import Browser from 'webextension-polyfill';

type InsertTextInRangeProps = {
  range: Range;
  text: string;
};

const insertTextInRange = ({ range, text }: InsertTextInRangeProps) => {
  range.deleteContents();
  range.insertNode(document.createTextNode(text));
};

export enum Status {
  IDLE,
  PROMPT,
  LOADING,
  ERROR,
}

const port = Browser.runtime.connect({ name: PORT_NAME });

type State = {
  data?: unknown | null;
  status: Status;
};

export const useContentState = () => {
  const [state, setState] = useState<State>({
    data: null,
    status: Status.IDLE,
  });
  const targetRef = useRef<{
    element: Element | null;
    range: Range | undefined;
  } | null>();

  const sendToOpenAI = async (text: string) =>
    port.postMessage({
      action: MessageAction.SEND_TO_OPEN_AI,
      text,
    });

  useLayoutEffect(() => {
    const handler = (message: Message | undefined) => {
      if (message?.action === MessageAction.SHOW_PROMPT) {
        targetRef.current = {
          element: document.activeElement,
          range: document.getSelection()?.getRangeAt(0).cloneRange(),
        };
        setState({ status: Status.PROMPT });
      } else if (message?.action === MessageAction.LOADING) {
        setState({ status: Status.LOADING });
      } else if (
        message?.action == MessageAction.INSERT_TEXT &&
        targetRef.current
      ) {
        setState({ status: Status.IDLE });
        const { element, range } = targetRef.current;
        if (element instanceof HTMLElement) {
          if (element.contentEditable === 'true' && range) {
            insertTextInRange({
              range,
              text: message.text,
            });
          } else if ('value' in element) {
            element.value = message.text;
          }
        }
      } else if (message?.action === MessageAction.ERROR) {
        targetRef.current = null;
        setState({ data: message.error, status: Status.ERROR });
      } else if (message?.action === MessageAction.DONE) {
        targetRef.current = null;
        setState({ status: Status.IDLE });
      }
    };

    port.onMessage.addListener(handler);

    return () => {
      port.onMessage.removeListener(handler);
    };
  }, []);

  return { sendToOpenAI, setState, state };
};
