import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaFileAlt, FaPalette, FaRuler, FaShieldAlt, FaInfoCircle, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import spandrel from './products/data/spandrel.json';
import RelatedProducts from './products/RelatedProducts';
import FeaturedProducts from './products/FeaturedProduct';
import ImageCarousel from './products/imageCarousel';

interface DetailedDescription {
  material: string;
  thickness: string;
  width: string;
  length: string;
  finish: string;
}

interface Product {
  id: string;
  name: string;
  type: string;
  category: string;
  description: string;
  images: string[];
  features: string[];
  colors: string[];
  detailedDescription: DetailedDescription;
}

const SpandrelView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProductData();
    fetchRelatedProducts();
  }, [id]);

  const fetchProductData = (): void => {
    try {
      if (!id) {
        console.error('Product ID is undefined');
        return;
      }
      const foundProduct = spandrel.find((p: Product) => p.id === id);
      if (foundProduct) {
        // Modify the image paths to remove the leading './'
        const modifiedProduct = {
          ...foundProduct,
          images: foundProduct.images.map((img: string) => img.replace('./', '/'))
        };
        setProduct(modifiedProduct);
      } else {
        console.error('Product not found');
      }
    } catch (error) {
      console.error('Error fetching product data:', error);
      // Handle error state here
    }
  };

  const fetchRelatedProducts = (): void => {
    try {
      // Check if spandrel is an array
      if (!Array.isArray(spandrel)) {
        console.error('Spandrel data is not an array');
        return;
      }
      const filteredProducts = spandrel.filter((p: Product) => p.id !== id);
      const randomProducts = getRandomProducts(filteredProducts, 3);
      setRelatedProducts(randomProducts);
    } catch (error) {
      console.error('Error fetching related products:', error);
    }
  };

  const getRandomProducts = (products: Product[], count: number): Product[] => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const nextImage = (): void => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (product?.images?.length || 1));
  };

  const prevImage = (): void => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + (product?.images?.length || 1)) % (product?.images?.length || 1));
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#F71F27] mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">Loading product...</p>
          <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 relative overflow-hidden py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <Link to="/products" className="text-gray-800 hover:text-[#F71F27] transition duration-300 flex items-center mb-8">
            <FaArrowLeft className="mr-2" />
            Back to Products
          </Link>

          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="md:flex">

              <ImageCarousel images={product.images} currentImageIndex={currentImageIndex} setCurrentImageIndex={setCurrentImageIndex} nextImage={nextImage} prevImage={prevImage} />
              
              <div className="md:w-1/2 p-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="uppercase tracking-wide text-sm text-[#F71F27] font-semibold">{product.category}</div>
                  <h2 className="mt-1 text-4xl font-bold text-gray-900">{product.name}</h2>
                  <h3 className="mt-2 text-2xl font-semibold text-gray-700">{product.type}</h3>
                </motion.div>
                <motion.div 
                  className="mt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="text-2xl font-semibold text-gray-900 flex items-center">
                    <FaShieldAlt className="mr-2 text-[#F71F27]" />
                    Key Features
                  </h3>
                  <ul className="mt-4 space-y-2 text-gray-700">
                    {product.features.map((feature: string, index: number) => (
                      <motion.li 
                        key={index} 
                        className="flex items-center"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <FaChevronRight className="text-[#F71F27] mr-2" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
                <motion.div 
                  className="mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <h3 className="text-2xl font-semibold text-gray-900 flex items-center">
                    <FaRuler className="mr-2 text-[#F71F27]" />
                    Technical Specifications
                  </h3>
                  <div className="mt-4 grid grid-cols-2 gap-4 text-gray-700">
                    <div><strong>Material:</strong> {product.detailedDescription.material}</div>
                    <div><strong>Thickness:</strong> {product.detailedDescription.thickness}</div>
                    <div><strong>Width:</strong> {product.detailedDescription.width}</div>
                    <div><strong>Length:</strong> {product.detailedDescription.length}</div>
                  </div>
                </motion.div>
                <motion.div 
                  className="mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <h3 className="text-2xl font-semibold text-gray-900 flex items-center">
                    <FaPalette className="mr-2 text-[#F71F27]" />
                    Available Colors
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {product.colors.map((color: string, index: number) => (
                      <motion.div 
                        key={index} 
                        className="w-10 h-10 rounded-full border-2 border-gray-300 shadow-lg cursor-pointer"
                        style={{ backgroundColor: color }}
                        title={color}
                        whileHover={{ scale: 1.2, boxShadow: "0px 0px 8px rgba(0,0,0,0.2)" }}
                      />
                    ))}
                  </div>
                </motion.div>
                <motion.div 
                  className="mt-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  <Link to="/quotation-form" className="bg-[#F71F27] text-white px-8 py-4 rounded-full font-semibold hover:bg-red-700 transition duration-300 flex items-center inline-block shadow-lg hover:shadow-xl">
                    <FaFileAlt className="mr-3" />
                    Request a Quotation
                  </Link>
                </motion.div>
              </div>
            </div>
            <motion.div 
              className="p-8 bg-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <h3 className="text-2xl font-semibold text-gray-900 flex items-center mb-4">
                <FaInfoCircle className="mr-2 text-[#F71F27]" />
                Detailed Description
              </h3>
              <div className="text-gray-700 leading-relaxed grid grid-cols-1 md:grid-cols-2 gap-4">
                <p><strong>Description:</strong> {product.description}</p>
                <p><strong>Material:</strong> {product.detailedDescription.material}</p>
                <p><strong>Thickness:</strong> {product.detailedDescription.thickness}</p>
                <p><strong>Width:</strong> {product.detailedDescription.width}</p>
                <p><strong>Length:</strong> {product.detailedDescription.length}</p>
                <p><strong>Finish:</strong> {product.detailedDescription.finish}</p>
              </div>
            </motion.div>
          </div>

          <RelatedProducts products={relatedProducts} fadeInUp={fadeInUp} />

          <FeaturedProducts />

        </motion.div>
      </div>
    </div>
  );
};

export default SpandrelView;
