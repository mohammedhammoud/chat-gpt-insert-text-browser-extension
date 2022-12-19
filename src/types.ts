export enum MessageAction {
  SHOW_PROMPT,
  SEND_TO_OPEN_AI,
  LOADING,
  INSERT_TEXT,
  ERROR,
  DONE,
}

export type Message =
  | { action: MessageAction.SHOW_PROMPT }
  | { action: MessageAction.SEND_TO_OPEN_AI; text: string }
  | { action: MessageAction.LOADING }
  | { action: MessageAction.INSERT_TEXT; text: string }
  | { action: MessageAction.ERROR; error: string }
  | { action: MessageAction.DONE };
