import { createParser } from 'eventsource-parser';

const streamAsyncIterable = async function* streamAsyncIterable(
  stream: ReadableStream
) {
  const reader = stream.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        return;
      }
      yield value;
    }
  } finally {
    reader.releaseLock();
  }
};

type FetchServerSentEventsOptions = RequestInit & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onEvent: (data: any) => void;
};

export const fetchServerSentEvents = async (
  resource: string,
  options: FetchServerSentEventsOptions
) => {
  const { onEvent, ...fetchOptions } = options;
  const response = await fetch(resource, fetchOptions);
  const parser = createParser((event) => {
    if (event.type === 'event') {
      if (event.data === '[DONE]') {
        return;
      }
      const data = JSON.parse(event.data);
      onEvent(data);
    }
  });
  if (response.body) {
    for await (const chunk of streamAsyncIterable(response.body)) {
      const str = new TextDecoder().decode(chunk);
      parser.feed(str);
    }
  }
};
