import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { FaIndustry, FaHardHat, FaChevronDown, FaArrowRight } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

const Flagship = () => {
  const [currentProduct, setCurrentProduct] = useState(0);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const flagshipProducts = [
    { 
      name: 'MasterPiece', 
      description: 'Our premium roofing solution with unmatched durability and weather resistance.',
      image: 'https://i.imgur.com/96wPGrW.png',
      features: ['Extreme Durability', 'Weather Resistant', 'Energy Efficient']
    },
    { 
      name: 'Royalty', 
      description: 'High-performance steel siding for ultimate protection and aesthetic appeal.',
      image: 'https://i.imgur.com/2riqGKc.png',
      features: ['Low Maintenance', 'Customizable Colors', 'Insulation Properties']
    },
    { 
      name: 'MasterRib', 
      description: 'Revolutionary truss design for maximum structural integrity and load-bearing capacity.',
      image: 'https://i.imgur.com/p8YPkZn.png',
      features: ['Superior Strength', 'Lightweight Design', 'Easy Installation']
    },
  ];

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProduct((prev) => (prev + 1) % flagshipProducts.length);
    }, 8000);  // Changed from 5000 to 8000 milliseconds (8 seconds)
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={ref} className="min-h-screen py-20 flex flex-col items-center justify-center bg-white relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0 opacity-20"
          initial={{ backgroundPosition: '0% 0%' }}
          animate={{ backgroundPosition: '100% 100%' }}
          transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1530349115551-89d5654ae1a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')",
            backgroundSize: '200% 200%',
          }}
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2 
          className="text-6xl font-bold text-center mb-16 text-gray-900"
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
        >
          Our <span className='text-[#F71F27]'>Flagship</span> Products
        </motion.h2>
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]"
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
        >
          <div className="space-y-8">
            {flagshipProducts.map((product, index) => (
              <motion.div
                key={product.name}
                className={`bg-gray-100 rounded-xl shadow-2xl overflow-hidden transition-all duration-700 ease-in-out ${index === currentProduct ? 'scale-105 border-2 border-[#F71F27]' : 'scale-95 opacity-50'}`}
                initial="hidden"
                animate={controls}
                variants={fadeInUp}
                transition={{ delay: index * 0.2 }}
              >
                <div className="flex items-center p-6">
                  <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-full mr-6" />
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm">{product.description}</p>
                  </div>
                </div>
                <AnimatePresence>
                  {index === currentProduct && (
                    <motion.div 
                      className="bg-gray-200 p-4"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.7, ease: "easeInOut" }}
                    >
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Key Features:</h4>
                      <ul className="list-disc list-inside text-gray-700">
                        {product.features.map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                      <Link to={`/products/${product.name.toLowerCase().replace(' ', '-')}`} className="mt-4 inline-flex items-center text-[#F71F27] font-semibold hover:underline transition-all duration-300">
                        Learn More <FaArrowRight className="ml-2 transition-transform duration-300 transform group-hover:translate-x-1" />
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
          <motion.div
            className="relative h-[700px]" // Increased height
            initial="hidden"
            animate={controls}
            variants={fadeInUp}
          >
            {flagshipProducts.map((product, index) => (
              <motion.img
                key={product.name}
                src={product.image}
                alt={product.name}
                className="absolute w-full h-full object-contain"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: index === currentProduct ? 1 : 0,
                  y: index === currentProduct ? [0, -10, 0] : 20,
                  scale: index === currentProduct ? 1.2 : 1 // Added scale
                }}
                transition={{ 
                  duration: 1.5, 
                  ease: "easeInOut",
                  y: {
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut"
                  },
                  scale: { duration: 0.5 } // Transition for scale
                }}
              />
            ))}
          </motion.div>
        </motion.div>
        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center mt-16 space-y-4 sm:space-y-0 sm:space-x-6"
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
          transition={{ delay: 0.6 }}
        >
          <Link to="/products" className="w-full sm:w-auto bg-gray-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition duration-300 shadow-lg flex items-center justify-center group">
            <FaIndustry className="mr-3 transition-transform duration-300 transform group-hover:rotate-12" />
            Explore All Products
          </Link>
          <Link to="/quotation-form" className="w-full sm:w-auto bg-[#F71F27] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition duration-300 shadow-lg flex items-center justify-center group">
            <FaHardHat className="mr-3 transition-transform duration-300 transform group-hover:rotate-12" />
            Request a Quote
          </Link>
        </motion.div>
      </div>
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1, repeat: Infinity, repeatType: 'reverse' }}
        onClick={() => document.getElementById('roofing-profiles')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <FaChevronDown className="text-gray-900 text-3xl" />
      </motion.div>
    </div>
  );
};

export default Flagship;
