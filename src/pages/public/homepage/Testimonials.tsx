import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
}

const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      name: "Salvador RChelle ",
      role: "Homeowner",
      content: "Best roofing company. They have high quality and affordable roofing materials",
      rating: 5,
    },
    {
      name: "Roelito Pablo Vicenio",
      role: "Homeowner", 
      content: "I would highly recommend Supersteel Metal System for any of your roofing needs as we were very pleased & satisfied with their works. If you want the roofing done correctly at a reasonable price, hire Supersteel Metal System.",
      rating: 5,
    },
    {
      name: "Jane Magallanes ",
      role: "Homeowner",
      content: "Materials are in good quality.",
      rating: 5,
    },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="py-12 sm:py-16 md:py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-8 sm:mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          What Our <span className="text-[#F71F27]">Customers</span> Say
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              className="bg-white p-4 sm:p-6 rounded-lg shadow-lg"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
            >
              <FaQuoteLeft className="text-[#F71F27] text-2xl sm:text-3xl mb-3 sm:mb-4" />
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">{testimonial.content}</p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{testimonial.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-500">{testimonial.role}</p>
                </div>
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-sm sm:text-base" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
