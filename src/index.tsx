import * as React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import './styles.css';
import './styles.less';

const container = document.getElementById('app');
createRoot(container!).render(<App />);
