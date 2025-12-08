import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import App from './App.tsx';

// Import CSS bắt buộc của Mantine (QUAN TRỌNG NHẤT)
import '@mantine/core/styles.css';
import './index.css'; // File rỗng lúc nãy, cứ import để đó

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Bọc App trong MantineProvider để dùng được UI component */}
    <MantineProvider>
      <App />
    </MantineProvider>
  </React.StrictMode>,
);