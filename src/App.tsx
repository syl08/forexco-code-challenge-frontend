import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PublicRoute from './component/publicRoute';
import Login from './page/login';
import NotFound from './page/notFound';
import Register from './page/register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PublicRoute><Login /></PublicRoute>} />
        <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
