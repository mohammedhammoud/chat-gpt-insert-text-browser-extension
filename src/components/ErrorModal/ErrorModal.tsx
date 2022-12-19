import { Backdrop } from '../Backdrop';
import { Card, CardProps } from '../Card';

type ErrorMessageProps = {
  error?: 'ForbiddenError' | 'UnauthorizedError' | unknown | null;
} & CardProps;

export const ErrorModal = ({ error, ...rest }: ErrorMessageProps) => {
  return (
    <Backdrop>
      <Card {...rest}>
        {(() => {
          switch (error) {
            case 'ForbiddenError':
              return (
                <p>
                  The action we trried to do was forbidden. Please try to sign
                  in at{' '}
                  <a
                    href="https://chat.openai.com"
                    rel="noreferrer"
                    target="_blank"
                  >
                    chat.openai.com
                  </a>{' '}
                  and try again.
                </p>
              );

            case 'UnauthorizedError':
              return (
                <p>
                  We could unfortunately not proceed. Please sign in at{' '}
                  <a
                    href="https://chat.openai.com"
                    rel="noreferrer"
                    target="_blank"
                  >
                    chat.openai.com
                  </a>{' '}
                  and try again.
                </p>
              );
            default:
              return (
                <p>
                  An unknown error was caught. We can unfortunately not proceed
                  with your request.
                </p>
              );
          }
        })()}
      </Card>
    </Backdrop>
  );
};
