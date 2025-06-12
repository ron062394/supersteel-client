import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface ImageCarouselProps {
  images: string[];
  currentImageIndex: number;
  setCurrentImageIndex: (index: number) => void;
  nextImage: () => void;
  prevImage: () => void;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, currentImageIndex, setCurrentImageIndex, nextImage, prevImage }) => {
  return (
    <div className="md:w-1/2 h-full flex flex-col items-center justify-center p-8">
      <motion.div 
        className="w-[500px] h-[500px] flex items-center justify-center relative"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            className="w-full h-full object-cover rounded-lg shadow-2xl"
            src={images[currentImageIndex]}
            alt={`Image ${currentImageIndex + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
        <button onClick={prevImage} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-r-md">
          <FaChevronLeft />
        </button>
        <button onClick={nextImage} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-l-md">
          <FaChevronRight />
        </button>
      </motion.div>
      <div className="flex mt-4 space-x-2">
        {images.map((_: string, index: number) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full ${index === currentImageIndex ? 'bg-[#F71F27]' : 'bg-gray-400'}`}
          />
        ))}
      </div>
      <div className="flex mt-6 space-x-4 overflow-x-auto">
        {images.map((image: string, index: number) => (
          <div
            key={index}
            className={`w-16 h-16 rounded-md cursor-pointer transition-all duration-300 ${index === currentImageIndex ? 'border-2 border-[#F71F27]' : 'opacity-50 hover:opacity-100'}`}
            onClick={() => setCurrentImageIndex(index)}
          >
            <img
              src={image}
              alt={`Preview ${index + 1}`}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
