import React from 'react';
import ReactDOM from 'react-dom/client';

import { Popup } from './components/Popup';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const rootElement = document.getElementById('root')!;

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
