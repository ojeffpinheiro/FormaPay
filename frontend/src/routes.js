import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from './screens/Dashboard';
import EventPage from './screens/EventPage'
import Login from './screens/Login'
import PaymentRegistration from './screens/PaymentRegistration'
import PaymentReport from './screens/PaymentReport'


function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/event" element={<EventPage />} />
          <Route path="/payment-registration" element={<PaymentRegistration />} />
          <Route path="/payment-report-generation" element={<PaymentReport />} />
        </Routes>
      </Router>
  );
}

export default App;