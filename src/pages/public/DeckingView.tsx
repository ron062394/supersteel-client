import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaFileAlt, FaPalette, FaRuler, FaShieldAlt, FaInfoCircle, FaChevronRight } from 'react-icons/fa';
import decking from '../../constants/decking.json';
import { Button, RelatedProducts, FeaturedProducts, ImageCarousel, FullPageLoader, Link } from '../../components';
import type { TDeckingProductData } from '../../types/products';
import { getRelatedProducts, getProductById } from '../../composables';

const DeckingView = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [product, setProduct] = useState<TDeckingProductData | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<TDeckingProductData[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProductData();
    fetchRelatedProducts();
  }, [id]);

  const fetchProductData = () => {
    try {
      if (!id) {
        console.error('Product ID is undefined');
        return;
      }
      const foundProduct = getProductById(decking, id);
      if (foundProduct) {
        setProduct(foundProduct as TDeckingProductData);
      } else {
        console.error('Product not found');
      }
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  const fetchRelatedProducts = () => {
    const filteredProducts = decking.filter((p: TDeckingProductData) => p.id !== id);
    const relatedProducts = getRelatedProducts(filteredProducts, id || '', 3);
    setRelatedProducts(relatedProducts as TDeckingProductData[]);
  }

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
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
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
                    {product.features && product.features.length > 0 && product.features.map((feature: string, index: number) => (
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
                    <div><strong>Material:</strong> {product.detailedDescription.material}</div>
                    <div><strong>Thickness:</strong> {product.detailedDescription.thickness}</div>
                    <div><strong>Width:</strong> {product.detailedDescription.width}</div>
                    <div><strong>Length:</strong> {product.detailedDescription.length}</div>
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="text-2xl font-semibold text-gray-900 flex items-center">
                    <FaPalette className="mr-2 text-[#F71F27]" />
                    Available Finishes
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {product.finishes && product.finishes.length > 0 && product.finishes.map((finish: string, index: number) => (
                      <div 
                        key={index} 
                        className="px-3 py-1 bg-gray-200 rounded-full text-gray-700"
                      >
                        {finish}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-10">
                  <Button
                    onClick={() => navigate('/quotation-form')}
                    variant="primary"
                    icon={<FaFileAlt />}
                  >
                    Get a Quotation
                  </Button>
                </div>
              </div>
            </div>
            <div className="p-8 bg-gray-100">
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
                <p><strong>Surface Texture:</strong> {product.detailedDescription.surfaceTexture}</p>
                <p><strong>Maintenance Requirements:</strong> {product.detailedDescription.maintenanceRequirements}</p>
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

export default DeckingView;