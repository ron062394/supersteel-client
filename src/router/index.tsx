import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from '../pages/public/Homepage';
import { Navbar, Footer } from '@/components';
import AboutUs from '@/pages/public/AboutUs';

function AppRouter() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
      	  <Route path="/about-us" element={<AboutUs />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default AppRouter;
