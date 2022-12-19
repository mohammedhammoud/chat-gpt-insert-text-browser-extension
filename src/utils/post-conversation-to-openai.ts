import { v4 as uuidv4 } from 'uuid';

import { fetchServerSentEvents } from './fetch-server-sent-events';
import { getAccessToken } from './get-access-token';

type Response = {
  message: {
    content?: {
      parts?: string[];
    };
  };
};

type PostConversationToOpenAIFnProps = {
  abortController: AbortController;
  onTextChange: (text: string) => void;
  text: string;
};

export const postConversationToOpenAI = async ({
  abortController,
  onTextChange,
  text,
}: PostConversationToOpenAIFnProps) => {
  const accessToken = await getAccessToken();

  await fetchServerSentEvents(
    'https://chat.openai.com/backend-api/conversation',
    {
      body: JSON.stringify({
        action: 'next',
        messages: [
          {
            content: {
              content_type: 'text',
              parts: [text],
            },
            id: uuidv4(),
            role: 'user',
          },
        ],
        model: 'text-davinci-002-render',
        parent_message_id: uuidv4(),
      }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      onEvent(data: Response) {
        const text = data.message?.content?.parts?.[0];
        if (text) {
          onTextChange(text);
        }
      },
      signal: abortController.signal,
    }
  );
};
