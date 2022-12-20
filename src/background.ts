import Browser from 'webextension-polyfill';

import { Message, MessageAction } from './types';
import { postConversationToOpenAI } from './utils/post-conversation-to-openai';

const ports: Record<number, Browser.Runtime.Port | undefined> = {};

Browser.contextMenus.create({
  contexts: ['editable'],
  id: 'insert-gpt-response',
  title: 'Insert ChatGPT response',
});

Browser.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId !== 'insert-gpt-response' || !tab?.id) {
    return;
  }
  const port = ports[tab.id];
  if (port) {
    port.postMessage({
      action: MessageAction.SHOW_PROMPT,
    });
  }
});

Browser.runtime.onConnect.addListener((port) => {
  if (!port.sender?.tab?.id) {
    return;
  }

  ports[port.sender.tab.id] = port;

  port.onMessage.addListener(async (message: Message | undefined) => {
    if (message?.action === MessageAction.SEND_TO_OPEN_AI) {
      port.postMessage({
        action: MessageAction.LOADING,
      });

      const abortController = new AbortController();

      port.onDisconnect.addListener(() => {
        abortController.abort();
      });

      try {
        await postConversationToOpenAI({
          abortController,
          onTextChange: (text) => {
            port.postMessage({
              action: MessageAction.INSERT_TEXT,
              text,
            });
          },
          text: message.text,
        });
        port.postMessage({
          action: MessageAction.DONE,
        });
      } catch (error) {
        port.postMessage({
          action: MessageAction.ERROR,
          error: error instanceof Error ? error.name : 'UNEXPECTED',
        });
      }
    }
  });
});
