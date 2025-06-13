import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaFileAlt, FaPalette, FaRuler, FaShieldAlt, FaInfoCircle, FaChevronRight } from 'react-icons/fa';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { roofingCorr, roofingRib, roofingTile } from '../../constants';
import { Button, RelatedProducts, FeaturedProducts, ImageCarousel, FullPageLoader, Link } from '../../components';
import type { TRoofingProductData } from '../../types/products';
import { getRelatedProducts, getProductById } from '../../composables';

const RoofingView = () => {
  const { id } = useParams<{ id: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [product, setProduct] = useState<TRoofingProductData | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<TRoofingProductData[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProductData();
    fetchRelatedProducts();
  }, [id]);

  const fetchProductData = () => {
    if (!id) {
      console.error('Product ID is undefined');
      return;
    }
    const allProducts = [...roofingCorr, ...roofingRib, ...roofingTile];
    const foundProduct = getProductById(allProducts, id);
    if (foundProduct) {
      setProduct(foundProduct as TRoofingProductData);
    } else {
      console.error('Product not found');
    }
  };

  const fetchRelatedProducts = () => {
    const allProducts = [...roofingCorr, ...roofingRib, ...roofingTile];
    const filteredProducts = allProducts.filter((p: TRoofingProductData) => p.id !== id);
    const relatedProducts = getRelatedProducts(filteredProducts, id || '', 3);
    setRelatedProducts(relatedProducts as TRoofingProductData[]);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (product?.images?.length || 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + (product?.images?.length || 1)) % (product?.images?.length || 1));
  };

  if (!product) {
    return <FullPageLoader title="Loading product details..." />;
  }
  
  return (
    <div className="min-h-screen bg-gray-100 relative overflow-hidden py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-2">
        <div className="flex flex-col gap-4">
          <Link to="/products" direction="back">Back to Products</Link>
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="md:flex">
              <ImageCarousel images={product.images} currentImageIndex={currentImageIndex} setCurrentImageIndex={setCurrentImageIndex} nextImage={nextImage} prevImage={prevImage} />
              <div className="md:w-1/2 p-8">
                <div>
                  <div className="uppercase tracking-wide text-sm text-[#F71F27] font-semibold">{product.category}</div>
                  <h2 className="mt-1 text-4xl font-bold text-gray-900">{product.name}</h2>
                  <h3 className="mt-2 text-2xl font-semibold text-gray-700">{product.type}</h3>
                </div>
                <div className="mt-6">
                  <h3 className="text-2xl font-semibold text-gray-900 flex items-center">
                    <FaShieldAlt className="mr-2 text-[#F71F27]" />
                    Key Features
                  </h3>
                  <ul className="mt-4 space-y-2 text-gray-700">
                    {product.features.map((feature: string, index: number) => (
                      <li
                        key={index}
                        className="flex items-center"
                      >
                        <FaChevronRight className="text-[#F71F27] mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8">
                  <h3 className="text-2xl font-semibold text-gray-900 flex items-center">
                    <FaRuler className="mr-2 text-[#F71F27]" />
                    Technical Specifications
                  </h3>
                  <div className="mt-4 grid grid-cols-2 gap-4 text-gray-700">
                    <div><strong>Thickness:</strong> {product.detailedDescription.thickness.join(', ')}</div>
                    <div><strong>Width:</strong> {product.detailedDescription.width}</div>
                    <div><strong>Length:</strong> {product.detailedDescription.length}</div>
                    <div><strong>Substrate:</strong> {product.detailedDescription.substrate}</div>
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="text-2xl font-semibold text-gray-900 flex items-center">
                    <FaPalette className="mr-2 text-[#F71F27]" />
                    Available Colors
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {product.colors.map((color: string, index: number) => (
                      <div
                        key={index}
                        className="w-8 h-8 rounded-full border-2 border-gray-300 shadow-md cursor-pointer"
                        style={{
                          backgroundColor: color === 'G.I.' ? '#E8E8E8' : color,
                          backgroundImage: color === 'G.I.' ? 'linear-gradient(45deg, #E8E8E8, #F5F5F5)' : 'none'
                        }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
                <Button
                  onClick={() => navigate('/quotation-form')}
                  variant="primary"
                  icon={<FaFileAlt />}
                >
                  Get a Quotation
                </Button>
              </div>
            </div>
            <div className="p-8 bg-gray-100">
              <h3 className="text-2xl font-semibold text-gray-900 flex items-center mb-4">
                <FaInfoCircle className="mr-2 text-[#F71F27]" />
                Detailed Description
              </h3>
              <div className="text-gray-700 leading-relaxed grid grid-cols-1 md:grid-cols-2 gap-4">
                <p><strong>Description:</strong> {product.description}</p>
                <p><strong>Substrate:</strong> {product.detailedDescription.substrate}</p>
                <p><strong>Thickness:</strong> {product.detailedDescription.thickness.join(', ')}</p>
                <p><strong>Width:</strong> {product.detailedDescription.width}</p>
                <p><strong>Paint System:</strong> {product.detailedDescription.paintSystem}</p>
                <p><strong>Coating Thickness:</strong> {product.detailedDescription.coatingThickness}</p>
                <p><strong>Colors:</strong> {product.detailedDescription.colors.join(', ')}</p>
                <p><strong>Length:</strong> {product.detailedDescription.length}</p>
              </div>
            </div>
          </div>
          <RelatedProducts products={relatedProducts} />
          <FeaturedProducts />
        </div>
      </div>
    </div>
  );
};

export default RoofingView;