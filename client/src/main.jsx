import { createRoot } from 'react-dom/client'

import { BrowserRouter as Router } from 'react-router-dom'

import { App } from './containers'
import AuthProvider from './contexts/AuthProvider'

import './index.css'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <Router>
      <App />
    </Router>
  </AuthProvider>,
);
