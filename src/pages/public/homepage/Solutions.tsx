import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { FaHardHat, FaHome, FaRecycle, FaRuler, FaWrench, FaDoorOpen, FaSolarPanel, FaLeaf, FaChevronRight } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

const Solutions = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [activeTab, setActiveTab] = useState(0);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const solutions = useMemo(() => [
    {
      title: "Roofing Design and Installation",
      description: "From planning to execution, we provide comprehensive roofing solutions. Our expert team ensures that every aspect of your roofing project is handled with precision and care, resulting in a durable and aesthetically pleasing roof that protects your home for years to come.",
      icon: FaHardHat,
      image: "https://images.unsplash.com/photo-1632759145351-1d592919f522?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      link: "/services/roofing-design-installation"
    },
    {
      title: "Steel Trusses",
      description: "We specialize in the installation of sturdy steel trusses for your roof. Our steel trusses provide unparalleled strength and durability, ensuring your roof structure can withstand even the harshest weather conditions while maintaining its integrity for decades.",
      icon: FaHome,
      image: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
      link: "/services/steel-trusses"
    },
    {
      title: "New Roofing",
      description: "Need a fresh start? We can install a brand new roof tailored to your needs. Our new roofing solutions incorporate the latest materials and techniques to provide you with a roof that not only looks great but also offers superior protection and energy efficiency.",
      icon: FaLeaf,
      image: "https://images.unsplash.com/photo-1632154939372-5f0241704426?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      link: "/services/new-roofing"
    },
    {
      title: "Re-Roofing",
      description: "Extend the life of your home with our expert re-roofing services. We can breathe new life into your existing roof, addressing any issues and upgrading its performance. Our re-roofing solutions are cost-effective and can significantly improve your home's value and appearance.",
      icon: FaRecycle,
      image: "https://images.unsplash.com/photo-1632154939902-acd1a71b3d97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      link: "/services/re-roofing"
    },
    {
      title: "Metal Roofing",
      description: "Durable and stylish, metal roofing is a popular choice. Our metal roofing solutions offer longevity, energy efficiency, and a sleek modern look. We work with various metal roofing materials to provide you with options that suit your style and budget.",
      icon: FaWrench,
      image: "https://images.unsplash.com/photo-1621121539195-0d40e27455dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      link: "/services/metal-roofing"
    },
    {
      title: "Roofing Materials",
      description: "We supply and install various roofing materials, including gutters and other accessories. Our extensive range of high-quality roofing materials ensures that you can find the perfect match for your home's style and your personal preferences.",
      icon: FaRuler,
      image: "https://images.unsplash.com/photo-1605152276897-4f618f831968?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      link: "/services/roofing-materials"
    },
    {
      title: "Ceilings",
      description: "We can also assist with ceiling installation and repair. Our ceiling services complement our roofing solutions, ensuring that your home's interior is as well-protected and beautiful as its exterior. We offer a variety of ceiling styles and materials to suit your needs.",
      icon: FaSolarPanel,
      image: "https://images.unsplash.com/photo-1613575831056-0acd5da8f085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      link: "/services/ceilings"
    },
    {
      title: "Additional Services",
      description: "We offer stainless steel railings, grills, and aluminum doors and windows. These additional services allow us to provide comprehensive solutions for your home improvement needs, ensuring a cohesive and high-quality finish across all aspects of your property.",
      icon: FaDoorOpen,
      image: "https://images.unsplash.com/photo-1534237710431-e2fc698436d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      link: "/services/additional-services"
    }
  ], []);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center bg-white relative overflow-hidden py-20" id='roofing-services'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2 
          className="text-5xl font-bold text-center text-gray-900 mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          Our Roofing <span className="text-[#F71F27]">Services</span>
        </motion.h2>
        <motion.div 
          className="flex flex-col md:flex-row items-start"
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
        >
          <div className="md:w-1/3 mb-8 md:mb-0 md:mr-8">
            <ul className="space-y-2">
              {solutions.map((solution, index) => (
                <motion.li key={solution.title} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <button
                    className={`w-full text-left px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-between ${
                      activeTab === index
                        ? 'bg-[#F71F27] text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                    }`}
                    onClick={() => setActiveTab(index)}
                  >
                    <span className="flex items-center">
                      <solution.icon className="mr-2" />
                      {solution.title}
                    </span>
                    <FaChevronRight className={`transition-transform duration-300 ${activeTab === index ? 'rotate-90' : ''}`} />
                  </button>
                </motion.li>
              ))}
            </ul>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:w-2/3 bg-white rounded-xl shadow-lg overflow-hidden p-6 border border-gray-200"
            >
              <div className="flex flex-col">
                <motion.div className="mb-4" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <img
                    src={solutions[activeTab].image}
                    alt={solutions[activeTab].title}
                    className="w-full h-64 object-cover rounded-lg transition-transform duration-300"
                  />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">{solutions[activeTab].title}</h3>
                  <p className="text-gray-600 mb-6">{solutions[activeTab].description}</p>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link to="/contact" className="bg-[#F71F27] text-white px-6 py-2 rounded-full font-semibold hover:bg-red-700 transition duration-300 inline-flex items-center">
                      Contact Us
                      <FaChevronRight className="ml-2" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Solutions;
