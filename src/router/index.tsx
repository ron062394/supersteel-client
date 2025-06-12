import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from '../pages/public/Homepage';
import { Navbar, Footer } from '@/components';
import AboutUs from '@/pages/public/AboutUs';
import ContactUs from '@/pages/public/ContactUs';
import Careers from '@/pages/public/Careers';
import Products from '@/pages/public/Products';
import RoofingView from '@/pages/public/RoofingView';
import QuotationForm from '@/pages/public/QuotationForm';
import DeckingView from '@/pages/public/DeckingView';
import BendedView from '@/pages/public/BendedView';
import LightFramesView from '@/pages/public/LightFramesView';
import SpandrelView from '@/pages/public/SpandrelView';

function AppRouter() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/products" element={<Products />} />
        <Route path="/rib-type/:id" element={<RoofingView />} />
        <Route path="/tilespan/:id" element={<RoofingView />} />
        <Route path="/corrugated/:id" element={<RoofingView />} />
        <Route path="/bended/:id" element={<BendedView />} />
        <Route path="/decking/:id" element={<DeckingView />} />
        <Route path="/light frames/:id" element={<LightFramesView />} />
        <Route path="/spandrel/:id" element={<SpandrelView />} />
        <Route path="/quotation-form" element={<QuotationForm />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default AppRouter;
