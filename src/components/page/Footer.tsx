import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaMobileAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 text-center md:text-left">
          <div>
            <Link to="/">
              <img src="/logo_supersteel.png" alt="Supersteel" className="h-8 mx-auto md:mx-0 mb-2" />
            </Link>
            <p className="text-gray-400">Innovative steel solutions for a stronger future.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-1">
              <li><Link to="/" className="hover:text-[#F71F27] transition duration-300">Home</Link></li>
              <li><Link to="/about" className="hover:text-[#F71F27] transition duration-300">About Us</Link></li>
              <li><Link to="/services" className="hover:text-[#F71F27] transition duration-300">Services</Link></li>
              <li><Link to="/contact" className="hover:text-[#F71F27] transition duration-300">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
            <p className="text-gray-400">Purok 1, Cinco-cinco, Cabanatuan City, Nueva Ecija, Philippines</p>
            <p className="text-gray-400 flex items-center justify-center md:justify-start">
              <FaMobileAlt className="mr-2" /> 0906 201 5955 (GLOBE)
            </p>
            <p className="text-gray-400 flex items-center justify-center md:justify-start">
              <FaMobileAlt className="mr-2" /> 0919 861 2533 (SMART)
            </p>
            <p className="text-gray-400 flex items-center justify-center md:justify-start">
              <FaPhone className="mr-2" /> 044 958 7142 (LANDLINE)
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="https://www.facebook.com/supersteelmetalsystems" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#F71F27] transition duration-300">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#F71F27] transition duration-300">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#F71F27] transition duration-300">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#F71F27] transition duration-300">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-6 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} SuperSteel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
