import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHardHat, FaChevronRight, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";

// Import JSON data';
import roofingCorr from './products/data/roofing-corr.json';
import roofingRib from './products/data/roofing-rib.json';
import roofingTile from './products/data/roofing-tile.json';
import decking from './products/data/decking.json';
import lightFrame from './products/data/light-frame.json';
import spandrel from './products/data/spandrel.json';
import bended from './products/data/bended.json';
import FeaturedProduct from './products/FeaturedProduct';

interface Product {
  id: string;
  name: string;
  type: string;
  description: string;
  images: string[];
  category?: string;
}

const Products = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryLoading, setCategoryLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 12;

  useEffect(() => {
    window.scrollTo(0, 0);
    loadProducts();
  }, []);

  const loadProducts = (): void => {
    try {
      const roofingProducts = [
        ...(Array.isArray(roofingCorr) ? roofingCorr : [roofingCorr]),
        ...(Array.isArray(roofingRib) ? roofingRib : [roofingRib]),
        ...(Array.isArray(roofingTile) ? roofingTile : [roofingTile])
      ].map(product => ({
        ...product,
        category: 'Roofing'
      }));

      const allProducts = [
        ...roofingProducts,
        ...(Array.isArray(decking) ? decking : [decking]),
        ...(Array.isArray(lightFrame) ? lightFrame : [lightFrame]),
        ...(Array.isArray(spandrel) ? spandrel : [spandrel]),
        ...(Array.isArray(bended) ? bended : [bended])
      ] as Product[];

      setProducts(allProducts);
      setLoading(false);
    } catch (err) {
      console.error('Error loading products:', err);
      setError('Failed to load products. Please try again later.');
      setLoading(false);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const categories = useMemo(() => {
    const priorityCategories = ['All', 'Tilespan', 'Rib-Type', 'Corrugated'];
    const otherCategories = [...new Set(products.map(product => product.type))].filter(cat => !priorityCategories.includes(cat));
    return [...priorityCategories, ...otherCategories];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const priorityOrder = ['Tilespan', 'Rib-Type', 'Corrugated'];
    return products.filter(product =>
      (activeCategory === 'All' || product.type === activeCategory) &&
      (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       product.description.toLowerCase().includes(searchTerm.toLowerCase()))
    ).sort((a, b) => {
      const indexA = priorityOrder.indexOf(a.type);
      const indexB = priorityOrder.indexOf(b.type);
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return 0;
    });
  }, [products, activeCategory, searchTerm]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    return filteredProducts.slice(startIndex, startIndex + productsPerPage);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleCategoryChange = (category: string): void => {
    setCategoryLoading(true);
    setActiveCategory(category);
    setTimeout(() => {
      setCategoryLoading(false);
    }, 500); // Simulating a short delay for category change
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#F71F27] mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">Loading products...</p>
          <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 relative overflow-hidden py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/4 pr-0 md:pr-8 mb-8 md:mb-0">
            <div className="bg-gray-200 rounded-xl shadow-md p-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Categories</h2>
              {categories.map((category) => (
                <motion.button
                  key={category}
                  className={`w-full text-left px-4 py-2 rounded-lg font-semibold mb-2 transition duration-300 flex items-center justify-between ${
                    activeCategory === category
                      ? 'bg-[#F71F27] text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => handleCategoryChange(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>{category}</span>
                  <FaChevronRight className={`transition-transform duration-300 ${activeCategory === category ? 'rotate-90' : ''}`} />
                </motion.button>
              ))}
            </div>
          </div>

          <div className="w-full md:w-3/4">
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 rounded-full border-2 border-gray-300 focus:outline-none focus:border-[#F71F27]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <AnimatePresence mode="wait">
              {categoryLoading ? (
                <motion.div
                  key="loading"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={fadeInUp}
                  className="flex justify-center items-center h-64"
                >
                  <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#F71F27]"></div>
                </motion.div>
              ) : (
                <>
                  <motion.div 
                    key={activeCategory}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={fadeInUp}
                  >
                    {paginatedProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:scale-105"
                        variants={fadeInUp}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="w-full aspect-square overflow-hidden bg-gray-200">
                          <img 
                            src={product.images[0]} 
                            alt={product.name} 
                            loading="lazy"
                            className="w-full h-full object-contain transition-opacity duration-300"
                            onLoad={(e) => {
                              e.currentTarget.style.opacity = '1';
                            }}
                            style={{ opacity: 0 }}
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                          <p className="text-gray-600 mb-4">{product.description.length > 100 ? `${product.description.substring(0, 100)}...` : product.description}</p>
                          <Link to={`/${product.type.toLowerCase()}/${product.id}`} className="text-[#F71F27] font-semibold hover:underline flex items-center">
                            Learn More
                            <FaChevronRight className="ml-2" />
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  {totalPages > 1 && (
                    <div className="flex justify-center mt-8 gap-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-4 py-2 rounded-lg ${
                            currentPage === page
                              ? 'bg-[#F71F27] text-white'
                              : 'bg-white text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        <motion.div
          className="flex justify-center mt-16"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.5 }}
        >
          <Link to="/quotation" className="bg-[#F71F27] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition duration-300 shadow-md flex items-center justify-center group">
            <FaHardHat className="mr-3 group-hover:animate-bounce" />
            Request a Quote
          </Link>
        </motion.div>

        <FeaturedProduct />
      </div>
    </div>
  );
};

export default Products;