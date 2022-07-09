import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivateRoute from './component/privateRoute';
import PublicRoute from './component/publicRoute';
import { useProfile } from './component/useProfile';
import Dashboard from './page/dashboard';
import Login from './page/login';
import NotFound from './page/notFound';
import Register from './page/register';

function App() {
  const auth = useProfile()
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PublicRoute><Login /></PublicRoute>} />
        <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />
        <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
