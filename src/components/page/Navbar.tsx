import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFileAlt, FaHardHat, FaBars, FaTimes, FaBriefcase } from 'react-icons/fa';
import { Button } from '@/components';

// Main navigation items
const NAV_ITEMS = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'About Us', path: '/about-us' },
  { name: 'Contact Us', path: '/contact-us' },
  { name: 'Careers', path: '/careers' },
];

// Mobile menu action buttons
const MOBILE_ACTIONS = [
  {
    name: 'Contact Us',
    path: '/contact-us',
    icon: <FaHardHat className="inline mr-2" />,
    className:
      'block mt-3 bg-white text-gray-800 px-4 py-2 rounded-full font-bold text-sm hover:bg-gray-200 transition duration-300 shadow-lg text-center',
  },
  {
    name: 'Get a Quotation',
    path: '/quotation-form',
    icon: <FaFileAlt className="inline mr-2" />,
    className:
      'block mt-3 bg-[#F71F27] text-white px-4 py-2 rounded-full font-bold text-sm hover:bg-red-600 transition duration-300 shadow-lg text-center',
  },
  {
    name: 'Join Our Team',
    path: '/careers',
    icon: <FaBriefcase className="inline mr-2" />,
    className:
      'block mt-3 bg-blue-500 text-white px-4 py-2 rounded-full font-bold text-sm hover:bg-blue-600 transition duration-300 shadow-lg text-center',
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Memoize navItems to avoid unnecessary re-renders
  const navItems = useMemo(() => NAV_ITEMS, []);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const isHomePage = location.pathname === '/';

  // Handlers
  const handleMobileMenuToggle = useCallback(() => {
    setIsMobileMenuOpen((open) => !open);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full shadow-lg z-50 transition-all duration-300 ${
        isScrolled || !isHomePage ? 'bg-gray-900' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2 sm:py-3 md:py-4 min-h-[32px] sm:min-h-[56px] md:min-h-[64px]">
          <Link to="/">
            <img
              src="/logo_supersteel.png"
              alt="Supersteel"
              className="h-6 sm:h-8 md:h-10"
            />
          </Link>

          <nav className="hidden lg:flex space-x-6">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="mx-2"
              >
                <Link
                  to={item.path}
                  className={`no-underline text-sm font-medium transition duration-300 hover:text-[#F71F27] ${
                    location.pathname === item.path ? 'text-[#F71F27]' : 'text-white'
                  }`}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="hidden lg:flex items-center"
          >
            <Button
              onClick={() => navigate('/contact-us')}
              variant="secondary"
              icon={<FaHardHat />}
              className="mr-2"
            >
              Contact Us
            </Button>
            <Button
              onClick={() => navigate('/quotation-form')}
              variant="primary"
              icon={<FaFileAlt />}
            >
              Get a Quotation
            </Button>
          </motion.div>

          <button
            className="lg:hidden text-white"
            onClick={handleMobileMenuToggle}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden bg-gray-900"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block py-2 no-underline text-lg font-medium transition duration-300 hover:text-[#F71F27] ${
                    location.pathname === item.path ? 'text-[#F71F27]' : 'text-white'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {MOBILE_ACTIONS.map((action) => (
                <Link
                  key={action.name}
                  to={action.path}
                  className={action.className}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {action.icon}
                  {action.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;