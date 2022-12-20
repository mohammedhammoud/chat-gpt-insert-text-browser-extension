import { Content } from './components/Content';
import React from 'react';
import ReactDOM from 'react-dom/client';

const root = document.createElement('div');
root.id = 'crx-root';
document.body.append(root);

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Content />
  </React.StrictMode>
);
