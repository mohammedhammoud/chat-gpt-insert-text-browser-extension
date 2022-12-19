import { ErrorModal } from '../ErrorModal';
import { Prompt } from '../Prompt';
import { Spinner } from '../Spinner';
import { Status, useContentState } from './hooks/useContentState';

export const Content = () => {
  const { sendToOpenAI, setState, state } = useContentState();

  const onClose = () => setState({ status: Status.IDLE });

  switch (state.status) {
    case Status.PROMPT:
      return <Prompt onClose={onClose} onSend={sendToOpenAI} />;
    case Status.LOADING:
      return <Spinner />;
    case Status.ERROR:
      return <ErrorModal error={state.data} onClose={onClose} />;
    default:
      return null;
  }
};
