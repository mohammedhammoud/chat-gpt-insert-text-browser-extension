import styled from '@emotion/styled';

import { CloseButton } from './CloseButton';

const StyledContainer = styled.div`
  position: relative;
  background-color: #ffffff;
  border-radius: 16px;
  padding: 16px;
`;

export type CardProps = {
  onClose?: () => void;
} & JSX.IntrinsicElements['div'];

export const Card = ({ children, onClose, ...rest }: CardProps) => {
  return (
    <StyledContainer {...rest}>
      {onClose ? <CloseButton onClick={onClose} /> : null}
      {children}
    </StyledContainer>
  );
};
