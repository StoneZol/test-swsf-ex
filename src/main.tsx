import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { store } from './../store/store';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
  <MantineProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </MantineProvider>
  </Provider>
)
