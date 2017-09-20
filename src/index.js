import React from 'react';
import {render} from 'react-dom';
import './index.css';
import App from 'components/App.js';
import registerServiceWorker from './registerServiceWorker';




render(<App />, document.getElementById('root'));
registerServiceWorker();
