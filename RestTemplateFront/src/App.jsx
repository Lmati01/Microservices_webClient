import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CarManagement from './components/CarManagement';
import ClientManagement from './components/ClientManagement';

function App() {
  return (
    <Router>
      <div className="container">
        <nav>
          <ul>
            <li><Link to="/cars">Cars</Link></li>
            <li><Link to="/clients">Clients</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/cars" element={<CarManagement />} />
          <Route path="/clients" element={<ClientManagement />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;