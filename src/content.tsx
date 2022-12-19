import { Content } from './components/Content';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { css, Global } from '@emotion/react';

const root = document.createElement('div');
root.id = 'crx-root';
document.body.append(root);

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Global
      styles={css`
        #crx-root {
          color: #000;
        }
      `}
    />
    <Content />
  </React.StrictMode>
);
