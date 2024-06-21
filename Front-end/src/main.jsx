import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { StudentSignup } from './components/StudentDetails/signUp/signUp.jsx';
import { StudentLogin } from './components/StudentDetails/Login/login.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/student/signUp" element={<StudentSignup />} />
        <Route path="/student/login" element={<StudentLogin />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
