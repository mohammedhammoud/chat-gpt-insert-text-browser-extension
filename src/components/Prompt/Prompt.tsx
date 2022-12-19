import styled from '@emotion/styled';
import { useState } from 'react';

import { Backdrop } from '../Backdrop';
import { Card } from '../Card';

const StyledTextarea = styled.textarea`
  display: block;
  background-color: #f9f9f9;
  color: #000000;
  height: 30vh;
  max-height: 200px;
  max-width: 500px;
  width: 30vw;
  resize: none;
  margin-bottom: 16px;
  padding: 12px;
  border: 1px solid #000000;
`;

const StyledButton = styled.button`
  background: #000000;
  color: #ffffff;
  margin: 0;
  padding: 12px 24px;
  border-radius: 16px;
  width: 100%;
  border: 0;
  cursor: pointer;

  &:hover {
    background-color: #333333;
  }
`;

type PromptProps = {
  onClose: () => void;
  onSend: (text: string) => void;
};

export const Prompt = ({ onClose, onSend }: PromptProps) => {
  const [text, setText] = useState<string>();

  const handleSend = async () => {
    if (!text) {
      return;
    }
    onSend(text);
  };

  return (
    <Backdrop>
      <Card onClose={onClose}>
        <StyledTextarea
          autoFocus
          onChange={(event) => setText(event.target.value)}
          placeholder="Write something"
          value={text}
        />
        <StyledButton disabled={!text} onClick={handleSend}>
          Send
        </StyledButton>
      </Card>
    </Backdrop>
  );
};
