import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaArrowLeft, FaFileAlt, FaPalette, FaRuler, FaShieldAlt, FaInfoCircle, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { RelatedProducts, FeaturedProducts, ImageCarousel } from '../index';

export type TProductSpecification = {
  thickness: string[];
  width: string;
  length: string;
  substrate: string;
  paintSystem: string;
  coatingThickness: string;
  colors: string[];
};

export type TProduct = {
  id: string;
  category: string;
  name: string;
  type: string;
  description: string;
  features: string[];
  colors: string[];
  images: string[];
  detailedDescription: TProductSpecification;
};

interface ProductViewProps {
  products: TProduct[];
  backLink: string;
}

const ProductView = ({ products, backLink }: ProductViewProps) => {
  const { id } = useParams<{ id: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [product, setProduct] = useState<TProduct | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<TProduct[]>([]);

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
    const foundProduct = products.find((p: TProduct) => p.id === id);
    if (foundProduct) {
      const modifiedProduct = {
        ...foundProduct,
        images: foundProduct.images.map((img: string) => img.replace('./', '/'))
      };
      setProduct(modifiedProduct);
    } else {
      console.error('Product not found');
    }
  };

  const fetchRelatedProducts = () => {
    const filteredProducts = products.filter((p: TProduct) => p.id !== id);
    const randomProducts = getRandomProducts(filteredProducts, 3);
    const modifiedRelatedProducts = randomProducts.map((product: TProduct) => ({
      ...product,
      images: product.images.map((img: string) => img.replace('./', '/'))
    }));
    setRelatedProducts(modifiedRelatedProducts);
  };

  const getRandomProducts = (products: TProduct[], count: number): TProduct[] => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (product?.images?.length || 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + (product?.images?.length || 1)) % (product?.images?.length || 1));
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#F71F27] mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">Loading product details...</p>
          <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 relative overflow-hidden py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div>
          <Link to={backLink} className="text-gray-800 hover:text-[#F71F27] transition duration-300 flex items-center mb-8">
            <FaArrowLeft className="mr-2" />
            Back to Products
          </Link>

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
                        className="w-10 h-10 rounded-full border-2 border-gray-300 shadow-lg cursor-pointer"
                        style={{
                          backgroundColor: color === 'G.I.' ? '#E8E8E8' : color,
                          backgroundImage: color === 'G.I.' ? 'linear-gradient(45deg, #E8E8E8, #F5F5F5)' : 'none'
                        }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
                <div className="mt-10">
                  <Link to="/quotation-form" className="bg-[#F71F27] text-white px-8 py-4 rounded-full font-semibold hover:bg-red-700 transition duration-300 flex items-center inline-block shadow-lg hover:shadow-xl">
                    <FaFileAlt className="mr-3" />
                    Request a Quotation
                  </Link>
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

export default ProductView; 