import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './Root.tsx'
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from 'styled-components';
import theme from './theme';

import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Root />
    </ThemeProvider>
  </React.StrictMode>
)
