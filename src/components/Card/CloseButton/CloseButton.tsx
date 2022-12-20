import styled from '@emotion/styled';

const StyledButton = styled.button`
  border: 4px solid #fff;
  position: absolute;
  top: -12px;
  right: -12px;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  background-color: #000000;
  cursor: pointer;

  &:hover {
    background-color: #333333;
  }
`;

type CloseButtonProps = Omit<JSX.IntrinsicElements['button'], 'children'>;

export const CloseButton = (props: CloseButtonProps) => {
  return <StyledButton {...props}>x</StyledButton>;
};
