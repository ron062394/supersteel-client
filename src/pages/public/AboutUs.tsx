import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaIndustry, FaRecycle, FaHandshake, FaChevronDown } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import type { IconType } from 'react-icons';

interface AboutSection {
  icon: IconType;
  title: string;
  description: string;
}

interface Milestone {
  year: number;
  event: string;
  details: string;
}

interface CoreValue {
  title: string;
  description: string;
}

interface HistorySection {
  title: string;
  content: string;
  image?: string;
}

const AboutUs: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<number | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  };

  const aboutSections: AboutSection[] = [
    { icon: FaIndustry, title: "Our Facilities", description: "With multiple branch offices established since 2017, we're equipped to serve clients across the province with high-quality roofing solutions." },
    { icon: FaRecycle, title: "Quality Commitment", description: "Our name, Supersteel, embodies our commitment to reliability, durability, superior quality, strength, and greatness in all our products and services." },
    { icon: FaHandshake, title: "Client Support", description: "We're dedicated to providing exceptional support and service to our clients in all aspects of the construction industry." },
  ];

  const toggleExpand = (index: number): void => {
    if (expandedSection === index) {
      setExpandedSection(null);
    } else {
      setExpandedSection(index);
    }
  };

  const milestones: Milestone[] = [
    { year: 2012, event: "Founded as a small-scale freelance dealer", details: "Supersteel Metal Systems Trading began operations in San Leonardo, Nueva Ecija, focusing on various roofing materials and services." },
    { year: 2017, event: "Expanded operations with first branch offices", details: "After years of meticulous planning, we successfully launched our first branch offices, marking a significant milestone in our growth." },
    { year: 2020, event: "Introduced state-of-the-art rollforming technology", details: "This technological advancement significantly improved our production efficiency and product quality." },
    { year: 2022, event: "Launched eco-friendly steel manufacturing processes", details: "We committed to sustainable practices, reducing our environmental impact while maintaining product excellence." },
    { year: 2023, event: "Celebrating over a decade of innovation and quality", details: "We continue to lead the industry with cutting-edge solutions and unwavering commitment to our customers." },
  ];

  return (
    <div className="min-h-screen bg-white relative overflow-hidden py-20" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center my-16"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h1 className="text-6xl font-bold text-black mb-4">
            Discover the <span className='text-[#F71F27]'>Supersteel</span> Story
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From humble beginnings to industry leadership, our journey is built on innovation, quality, and unwavering commitment to excellence.
          </p>
        </motion.div>

        <motion.div 
          className="mb-16"
          initial="hidden"
          animate="visible"
          variants={scaleIn}
        >
          <img 
            src="https://as1.ftcdn.net/v2/jpg/02/88/07/74/1000_F_288077416_SCYPrCxNlPwexpf6o8YiDtUxqfqouHRD.jpg" 
            alt="Construction workers on site" 
            className="w-full h-96 object-cover rounded-xl shadow-2xl"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={scaleIn}
            className="bg-gray-900 text-white rounded-xl shadow-2xl overflow-hidden p-8 flex flex-col justify-between"
          >
            <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-300 text-lg">
              To provide world-class roofing materials at affordable and competitive prices, catering to all areas of the construction industry.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={scaleIn}
            className="bg-gray-100 rounded-xl shadow-2xl overflow-hidden p-8 flex flex-col justify-between"
          >
            <h2 className="text-3xl font-semibold text-black mb-4">Our Vision</h2>
            <p className="text-gray-700 text-lg">
              To contribute quality roofing materials to the construction industry, providing world-class quality at affordable prices for the benefit of the masses, our employees and their families, and to the glory of God.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="mb-16"
          initial="hidden"
          animate="visible"
          variants={scaleIn}
        >
          <div className="bg-gray-900 text-white rounded-xl shadow-2xl overflow-hidden p-8">
            <h2 className="text-3xl font-semibold mb-4">Company Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: "Prioritizing Clients", description: "We always prioritize our clients' welfare at all times." },
                { title: "Adherence to Rules", description: "We strictly adhere to our company's rules and regulations to achieve our mission and vision." },
                { title: "Integrity and Honesty", description: "We preserve our personal and professional integrity and honesty, applying these values to our work at all times." },
                { title: "Excellence in Work", description: "We strive to give our very best in all areas and departments of the company." }
              ].map((value: CoreValue, index: number) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold text-[#F71F27] mb-2">{value.title}</h3>
                  <p className="text-gray-300">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="mb-16 bg-gray-100 rounded-xl shadow-2xl overflow-hidden"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={scaleIn}
        >
          <h2 className="text-3xl font-semibold text-black p-8 pb-4">Supersteel Metal Systems Trading: A History of Quality and Excellence</h2>
          <div className="p-8 pt-0">
            {[
              { title: "Humble Beginnings", content: "Founded in 2012 in San Leonardo, Nueva Ecija, Supersteel Metal Systems Trading began as a small-scale freelance dealer of various roofing materials and services. The company's founders envisioned expanding their operations and established a plan to open sales offices in different locations within the province.", image: "/images/humble-beginnings.jpg" },
              { title: "A Vision Realized", content: "After years of meticulous planning and preparation, Supersteel's vision became a reality in 2017. The company successfully launched its first branch offices, marking a significant milestone in its growth." },
              { title: "The Supersteel Promise", content: "The company's name, Supersteel, embodies its commitment to reliability, durability, superior quality, strength, and greatness. Supersteel Metal Systems Trading is dedicated to providing exceptional support and service to its clients in all aspects of the construction industry.", image: "/images/supersteel-promise.jpg" },
              { title: "A Commitment to Excellence", content: "Over the years, Supersteel has consistently strived to offer the best possible products and services. The company's focus on quality materials, innovative roofing designs, and exceptional customer service has solidified its reputation as a leading player in the construction market." },
              { title: "The Future of Supersteel", content: "As Supersteel continues to evolve, it remains committed to its core values and its mission to provide unparalleled service to its clients. With a strong foundation and a bright future ahead, Supersteel is poised to remain a trusted and respected name in the construction industry.", image: "/images/future-supersteel.jpg" }
            ].map((section: HistorySection, index: number) => (
              <motion.div 
                key={index} 
                className="mb-6 bg-white p-4 rounded-lg transform hover:scale-105 transition-transform duration-300"
                variants={fadeInUp}
                custom={index}
              >
                <h3 className="text-2xl font-semibold text-[#F71F27] mb-2">{section.title}</h3>
                <p className="text-gray-700 mb-4">{section.content}</p>
                {section.image && (
                  <img 
                    src={section.image} 
                    alt={section.title} 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-24"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-4xl font-semibold text-gray-900 mb-12 text-center">Key Milestones</h3>
          <div className="relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#F71F27]"></div>
            <div className="flex justify-between">
              {milestones.map((milestone: Milestone, index: number) => (
                <motion.div 
                  key={index} 
                  className="relative pt-8"
                  initial="hidden"
                  animate="visible"
                  variants={fadeInUp}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 bg-[#F71F27] rounded-full border-4 border-white shadow"></div>
                  </div>
                  <div 
                    className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow duration-300 cursor-pointer w-40"
                    onClick={() => toggleExpand(index)}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-[#F71F27] font-bold text-2xl">{milestone.year}</span>
                      <h4 className="text-sm font-semibold text-gray-800 mt-2 text-center">{milestone.event}</h4>
                      <FaChevronDown className={`text-gray-500 transition-transform duration-300 mt-2 ${expandedSection === index ? 'transform rotate-180' : ''}`} />
                    </div>
                    {expandedSection === index && (
                      <motion.p 
                        className="text-gray-600 mt-4 text-xs"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {milestone.details}
                      </motion.p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            exit="hidden"
            variants={fadeInUp}
          >
            {aboutSections.map((section: AboutSection, index: number) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6"
                variants={fadeInUp}
                custom={index}
              >
                <section.icon className="text-4xl text-[#F71F27] mb-4" />
                <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
                <p className="text-gray-600">{section.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AboutUs;
