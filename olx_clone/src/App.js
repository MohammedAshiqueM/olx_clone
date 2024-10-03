import React, { useEffect, useContext } from 'react';
import './App.css';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Create from './Pages/Create';
import View from './Pages/ViewPost';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContext } from './store/Context';
import { auth } from './firebase/config';
import { PostProvider } from './store/postContext';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <PostProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            {user && <Route path="/create" element={<Create />} />} 
            {user && <Route path="/view" element={<View />} />}
          </Routes>
        </Router>
      </PostProvider>
    </div>
  );
}

export default App;
