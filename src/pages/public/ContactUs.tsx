import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaBuilding, FaFileAlt, FaMapMarkerAlt, FaChevronDown, FaLinkedin, FaTwitter, FaFacebook, FaMobileAlt, FaDownload, FaExpand } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

interface Facility {
  name: string;
  description: string;
  image: string;
}

interface FAQ {
  question: string;
  answer: string;
}

const ContactUs = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', formData);
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
      setIsSubmitted(true);
      toast.success('Message sent successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  };

  const facilities: Facility[] = [
    { name: "Manufacturing Plant", description: "State-of-the-art facility equipped with the latest technology in steel production.", image: "/placeholder-facility1.jpg" },
    { name: "R&D Center", description: "Where innovation happens. Our R&D team works on developing new steel alloys and processes.", image: "/placeholder-facility2.jpg" },
    { name: "Distribution Center", description: "Efficient logistics hub ensuring timely delivery of our products worldwide.", image: "/placeholder-facility3.jpg" },
  ];

  const faqs: FAQ[] = [
    { question: "What types of steel products do you offer?", answer: "We offer a wide range of steel products including structural steel, sheet metal, steel pipes, and custom fabrications." },
    { question: "Do you provide international shipping?", answer: "Yes, we ship our products internationally. Please contact us for specific shipping details and costs." },
    { question: "Can you handle custom orders?", answer: "Absolutely! We specialize in custom steel fabrication. Contact us with your specific requirements." },
    { question: "What are your quality control measures?", answer: "We have rigorous quality control processes in place, including regular inspections and testing to ensure all our products meet industry standards." },
    { question: "Do you offer technical support?", answer: "Yes, our team of experts is available to provide technical support and advice on product selection and usage." },
  ];

  const handleMapFullScreen = () => {
    const elem = document.getElementById('mapImage');
    if (elem) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if ('webkitRequestFullscreen' in elem) {
        (elem as any).webkitRequestFullscreen();
      } else if ('msRequestFullscreen' in elem) {
        (elem as any).msRequestFullscreen();
      }
    }
  };

  const handleMapDownload = () => {
    const link = document.createElement('a');
    link.href = '/map.jpg';
    link.download = 'location_map.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-white py-20" ref={ref}>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-20">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <h1 className="text-6xl font-bold text-gray-900 mb-4 text-center">
            Let's <span className='text-[#F71F27]'>Connect</span>
          </h1>
          <p className="text-2xl text-gray-700 text-center mb-12 max-w-3xl mx-auto">
            Have questions or need assistance? We're here to help! Reach out to our team of experts and let's build something great together.
          </p>
          
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/2">
              <form onSubmit={handleSubmit} className="bg-gray-100 shadow-xl rounded-lg px-8 pt-6 pb-8 mb-4">
                {(['name', 'email', 'phone', 'company'] as const).map((field) => (
                  <div key={field} className="mb-4">
                    <label htmlFor={field} className="block text-gray-700 text-sm font-bold mb-2">
                      {field === 'name' && <FaUser className="inline mr-2" />}
                      {field === 'email' && <FaEnvelope className="inline mr-2" />}
                      {field === 'phone' && <FaPhone className="inline mr-2" />}
                      {field === 'company' && <FaBuilding className="inline mr-2" />}
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      id={field}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                      required={field !== 'phone' && field !== 'company'}
                    />
                  </div>
                ))}
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
                    <FaFileAlt className="inline mr-2" />
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 bg-white"
                    required
                  ></textarea>
                </div>
                <div className="flex items-center justify-left">
                  <button
                    type="submit"
                    className={`bg-[#F71F27] hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-300 text-lg ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
                    role="alert"
                  >
                    <strong className="font-bold">Success!</strong>
                    <span className="block sm:inline"> Your message has been sent.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="lg:w-1/2">
              <motion.div 
                className="bg-gray-100 shadow-xl rounded-lg px-8 py-6 mb-4"
                variants={scaleIn}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <p className="flex items-center text-gray-700">
                    <FaMapMarkerAlt className="mr-3 text-[#F71F27]" />
                    Purok 1, Cinco-cinco, Cabanatuan City, Nueva Ecija, Philippines
                  </p>
                  <p className="flex items-center text-gray-700">
                    <FaMobileAlt className="mr-3 text-[#F71F27]" />
                    0906 201 5955 (GLOBE)
                  </p>
                  <p className="flex items-center text-gray-700">
                    <FaMobileAlt className="mr-3 text-[#F71F27]" />
                    0919 861 2533 (SMART)
                  </p>
                  <p className="flex items-center text-gray-700">
                    <FaPhone className="mr-3 text-[#F71F27]" />
                    044 958 7142 (LANDLINE)
                  </p>
                </div>
                <div className="mt-6 relative">
                  <img 
                    id="mapImage"
                    src="/map.jpg" 
                    alt="Location Map" 
                    className="w-full h-full object-cover rounded-lg"
                    style={{ height: '100%' }}
                  />
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <button
                      onClick={handleMapFullScreen}
                      className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
                    >
                      <FaExpand className="text-gray-700" />
                    </button>
                    <button
                      onClick={handleMapDownload}
                      className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
                    >
                      <FaDownload className="text-gray-700" />
                    </button>
                  </div>
                </div>
                <div className="mt-6 flex justify-left space-x-4">
                  <a href="#" className="text-[#F71F27] hover:text-red-700 transition-colors duration-300">
                    <FaLinkedin size={24} />
                  </a>
                  <a href="#" className="text-[#F71F27] hover:text-red-700 transition-colors duration-300">
                    <FaTwitter size={24} />
                  </a>
                  <a href="https://www.facebook.com/supersteelmetalsystems" target="_blank" rel="noopener noreferrer" className="text-[#F71F27] hover:text-red-700 transition-colors duration-300">
                    <FaFacebook size={24} />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
          
          <motion.div 
            className="mt-16"
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-left">Our Facilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {facilities.map((facility, index) => (
                <motion.div 
                  key={index}
                  className="bg-gray-100 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                  variants={scaleIn}
                  transition={{ delay: index * 0.1 }}
                >
                  <img src={facility.image} alt={facility.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{facility.name}</h3>
                    <p className="text-gray-700">{facility.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="mt-16"
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-left">FAQ</h2>
            <div className="bg-gray-900 text-white shadow-xl rounded-lg px-8 py-6">
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div 
                    key={index}
                    className="border-b border-gray-700 pb-4"
                    initial={false}
                    animate={{ backgroundColor: expandedFAQ === index ? "#1f2937" : "transparent" }}
                    transition={{ duration: 0.3 }}
                  >
                    <button
                      className="flex justify-between items-center w-full text-left font-semibold text-gray-300 hover:text-white focus:outline-none"
                      onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                    >
                      {faq.question}
                      <FaChevronDown
                        className={`transform transition-transform duration-300 ${
                          expandedFAQ === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {expandedFAQ === index && (
                        <motion.div
                          key="content"
                          initial="collapsed"
                          animate="open"
                          exit="collapsed"
                          variants={{
                            open: { opacity: 1, height: "auto" },
                            collapsed: { opacity: 0, height: 0 }
                          }}
                          transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                        >
                          <p className="mt-2 text-gray-400">{faq.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactUs;
