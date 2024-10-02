import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { FirebaseContext } from './store/Context';
import { auth } from './firebase/config'; // Exporting the auth object from the updated config
import Context from './store/Context'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <FirebaseContext.Provider value={{ auth }}> {/* Use auth instead of app */}
    <React.StrictMode>
        <Context>
            <App />
        </Context>
    </React.StrictMode>
  </FirebaseContext.Provider>
);

reportWebVitals();
