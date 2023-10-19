import React from 'react';
import './App.css';
import { BrowserRouter ,Route, Routes} from "react-router-dom";
import Langing from './components/layout/Langing';
import Auth from './views/Auth';
import AuthContextProvider from './contexts/AuthContex';
import Dashboard from './views/Dashboard';
import ProtectedRoute from './components/routing/ProtectedRoute';
import About from './views/About';
import PostContextProvider from './contexts/PostContext';

function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <BrowserRouter>   
          <Routes>
            <Route path="/" element={<Langing />} />
            <Route path="/login" element={ <Auth  authRoute='login'/>} />
            <Route path="/register" element={  <Auth authRoute='register'/>} />
            <Route path="/dashboard" element={
                <ProtectedRoute element={<Dashboard />}/>
              }
              />
              <Route path="/about" element={
                <ProtectedRoute element={<About />}/>
              }
              />
            <Route path="/dashboard" element={<Dashboard />} />

          </Routes>
        </BrowserRouter>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;
