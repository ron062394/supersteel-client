import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from '../pages/public/Homepage';
import { Navbar } from '@/components';

function AppRouter() {
  return (
    <Router>
        <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
