import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Orders from './pages/Orders/Orders';
import Payment from './pages/Payment/Payment';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/pedidos" element={<Orders />} />
        <Route path="/pagamento/:id" element={<Payment />} />
      </Routes>
    </Router>
  );
}

export default App;