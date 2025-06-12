
import { motion } from 'framer-motion';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface CarouselItem {
  image: string;
  title: string; 
  description: string;
}

const carouselItems: CarouselItem[] = [
    {
      image: 'https://png.pngtree.com/background/20231016/original/pngtree-rendering-of-house-roof-with-a-red-metal-sheet-picture-image_5578494.jpg',
      title: 'Featured Product 1',
      description: 'Discover our latest innovation in roofing technology.',
    },
  ];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const FeaturedProducts: React.FC = () => {
  return (
    <motion.div
      className="mt-20"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      transition={{ delay: 0.7 }}
    >
      <Carousel
        showArrows={true}
        showStatus={false}
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={5000}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        {carouselItems.map((item, index) => (
          <div key={index} className="relative">
            <img src={item.image} alt={item.title} className="w-full h-96 object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-8">
              <h3 className="text-3xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-xl text-gray-200">{item.description}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </motion.div>
  );
};

export default FeaturedProducts;