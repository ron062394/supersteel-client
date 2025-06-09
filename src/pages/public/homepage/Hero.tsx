import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaIndustry, FaHardHat, FaChevronDown } from 'react-icons/fa';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { title: "SUPERSTEEL", subtitle: "Forging the Future" },
    { title: "INNOVATION", subtitle: "In Every Sheet" },
    { title: "STRENGTH", subtitle: "You Can Rely On" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const backgroundImages = [
    "url('/store.png')",
    "url('https://w0.peakpx.com/wallpaper/21/875/HD-wallpaper-roof-tiles-texture-gray-tile-roof-tile-background-roof-textures-for-roofing-roof-texture.jpg')",
    "url('https://images.unsplash.com/photo-1587293852726-70cdb56c2866?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80')"
  ];

  // Fix: Check if element exists before calling scrollIntoView
  const handleChevronClick = () => {
    const el = document.getElementById('roofing-services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-950 to-black relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="absolute inset-0 opacity-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{
              backgroundImage: backgroundImages[currentSlide],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </AnimatePresence>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={fadeInUp}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-8xl font-extrabold mb-4 tracking-tight">
                <span className="text-[#F71F27] inline-block transform hover:scale-105 transition-transform duration-300">
                  {slides[currentSlide].title.split(' ')[0]}
                </span>
                <span className="text-white inline-block transform hover:scale-105 transition-transform duration-300">
                  {slides[currentSlide].title.split(' ')[1] || ''}
                </span>
              </h1>
              <p className="text-3xl text-gray-300 mb-12">{slides[currentSlide].subtitle}</p>
            </motion.div>
          </AnimatePresence>
          <motion.p
            className="text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Your trusted partner in steel manufacturing.
            Discover our premium rollforming plant services and roofing solutions.
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-6 mb-12"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <Link
              to="/products"
              className="bg-white text-gray-800 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition duration-300 shadow-lg flex items-center transform hover:scale-105"
            >
              <FaIndustry className="mr-2" />
              Explore Products
            </Link>
            <Link
              to="/contact"
              className="bg-[#F71F27] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-600 transition duration-300 shadow-lg flex items-center transform hover:scale-105"
            >
              <FaHardHat className="mr-2" />
              Contact Us
            </Link>
          </motion.div>
          {/* Removed empty motion.div */}
        </div>
      </div>
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
        onClick={handleChevronClick}
      >
        <FaChevronDown className="text-white text-3xl" />
      </motion.div>
    </div>
  );
};

export default Hero;
