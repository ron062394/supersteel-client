import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaMobileAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/">
              <img src="/logo_supersteel.png" alt="Supersteel" className="h-8" />
            </Link>
            <p className="text-gray-400">Innovative steel solutions for a stronger future.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-[#F71F27] transition duration-300">Home</Link></li>
              <li><Link to="/about" className="hover:text-[#F71F27] transition duration-300">About Us</Link></li>
              <li><Link to="/services" className="hover:text-[#F71F27] transition duration-300">Services</Link></li>
              <li><Link to="/contact" className="hover:text-[#F71F27] transition duration-300">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p className="text-gray-400">Purok 1, Cinco-cinco, Cabanatuan City, Nueva Ecija, Philippines</p>
            <p className="text-gray-400 flex items-center">
              <FaMobileAlt className="mr-2" /> 0906 201 5955 (GLOBE)
            </p>
            <p className="text-gray-400 flex items-center">
              <FaMobileAlt className="mr-2" /> 0919 861 2533 (SMART)
            </p>
            <p className="text-gray-400 flex items-center">
              <FaPhone className="mr-2" /> 044 958 7142 (LANDLINE)
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
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
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} SuperSteel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
