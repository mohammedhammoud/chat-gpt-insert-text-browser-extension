import styled from '@emotion/styled';

const StyledButton = styled.button`
  border: 2px solid #fff;
  position: absolute;
  top: -16px;
  right: -8px;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  text-align: center;
  font-size: 18px;
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
  return <StyledButton {...props}>✖</StyledButton>;
};
