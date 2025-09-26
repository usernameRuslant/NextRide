import { StrictMode } from 'react';
import './index.css';
import 'modern-normalize';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import 'react-datepicker/dist/react-datepicker.css';
import './datepicker-overrides.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
