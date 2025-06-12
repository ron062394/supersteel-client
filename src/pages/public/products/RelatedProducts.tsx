import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';

interface Product {
  id: string;
  name: string;
  type: string;
  description: string;
  images: string[];
}

interface RelatedProductsProps {
  products: Product[];
  fadeInUp: Variants;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products, fadeInUp }) => {
  return (
    <motion.div
      className="mt-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4 }}
    >
      <h3 className="text-3xl font-semibold text-gray-900 mb-8">Related Products</h3>
      <AnimatePresence mode="wait">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={fadeInUp}
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:scale-105"
              variants={fadeInUp}
              transition={{ delay: index * 0.1 }}
            >
              <div className="h-96 w-96 overflow-hidden bg-gray-200">
                <img 
                  src={product.images[0].replace('./', '/')} 
                  alt={product.name} 
                  loading="lazy" 
                  className="h-full w-full object-cover object-center" 
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = '/placeholder-image.jpg';
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description.length > 100 ? `${product.description.substring(0, 100)}...` : product.description}</p>
                <Link to={`/${product.type.toLowerCase()}/${product.id}`} className="text-[#F71F27] font-semibold hover:underline flex items-center">
                  Learn More
                  <FaChevronRight className="ml-2" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default RelatedProducts;