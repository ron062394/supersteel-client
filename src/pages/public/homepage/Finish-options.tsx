import { FaPalette, FaShieldAlt, FaSun, FaLayerGroup, FaInfoCircle, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components';

interface ColorOption {
  name: string;
  hex: string;
  description: string;
}

interface FinishType {
  name: string;
  description: string;
  benefit: string;
}

interface RoofingLayer {
  name: string;
  color: string;
  thickness: string;
  benefit: string;
}

const FinishOptions: React.FC = () => {
  const navigate = useNavigate();
  const standardColorOptions: ColorOption[] = [
    { name: 'Blue', hex: '#032445', description: 'Classic and calming' },
    { name: 'Gray', hex: '#231c1c', description: 'Sophisticated and neutral' },
    { name: 'Red', hex: '#f20604', description: 'Bold and traditional' },
    { name: 'Green', hex: '#008000', description: 'Natural and harmonious' },
    { name: 'White', hex: '#f7fbf7', description: 'Clean and timeless' },
    { name: 'Brown', hex: '#230505', description: 'Earthy and rustic' },
    { name: 'Beige', hex: '#d3df93', description: 'Warm and inviting' },
    { name: 'Terracotta', hex: '#E2725B', description: 'Rustic and vibrant' },
    { name: 'Darkwood Grain', hex: '#4B3621', description: 'Natural and rich' },
    { name: 'Foam Green', hex: '#a2e6a9', description: 'Soft and fresh' },
    { name: 'Apple Green', hex: '#8DB600', description: 'Bright and lively' },
  ];

  const superPanelOptions: ColorOption[] = [
    { name: 'Super Panel Gold', hex: '#FFD700', description: 'Shimmery, reflective finish with tiny metal particles' },
    { name: 'Super Panel Green', hex: '#4CAF50', description: 'Shimmery, reflective finish with tiny metal particles' },
    { name: 'Super Panel Orange', hex: '#FF9800', description: 'Shimmery, reflective finish with tiny metal particles' },
    { name: 'Super Panel Blue', hex: '#2196F3', description: 'Shimmery, reflective finish with tiny metal particles' },
    { name: 'Super Panel Brown', hex: '#795548', description: 'Shimmery, reflective finish with tiny metal particles' },
  ];

  const finishTypes: FinishType[] = [
    { name: 'Glossy', description: 'Shiny, reflective surface', benefit: 'Easy to clean' },
    { name: 'Metallic', description: 'Shimmery, reflective finish with tiny metal particles', benefit: 'Adds a premium, eye-catching look' },
    { name: 'G.I. (Galvanized Iron)', description: 'Corrosion-resistant, zinc-coated finish', benefit: 'Provides strong protection against rust and weather' }
  ];

  const roofingLayers: RoofingLayer[] = [
    { name: 'Polyester Paint Coating', color: '#FF6B6B', thickness: '20-25 microns', benefit: 'UV & weather protection' },
    { name: 'Epoxy Primer Coating', color: '#4ECDC4', thickness: '5-7 microns', benefit: 'Improves paint adhesion and longevity' },
    { name: 'Zinc Phosphate Film', color: '#45B7D1', thickness: '1-2 microns', benefit: 'Enhances corrosion resistance' },
    { name: 'Zinc (45%) + Aluminum (55%) Alloy', color: '#DAE1E7', thickness: '150 g/m²', benefit: 'Superior rust protection' },
    { name: 'CRS (Cold Rolled Steel)', color: '#99A3A4', thickness: '0.30-0.50 mm', benefit: 'Structural integrity' },
    { name: 'Back Coating', color: '#A9A9A9', thickness: '7-10 microns', benefit: 'Additional protection for reverse side' },
  ];

  return (
    <div className="py-20 bg-gray-900 relative" id='finish-options'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-5xl font-bold text-center text-white mb-12">
          Color and Finish <span className="text-[#F71F27]">Options</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 flex items-center text-white">
              <FaPalette className="text-[#F71F27] mr-2" />
              Color Options
            </h3>
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
              {standardColorOptions.map((color, index) => (
                <div key={index} className="flex flex-col items-center group relative">
                  <div 
                    className="w-8 h-8 rounded-full mb-1 shadow-md" 
                    style={{ backgroundColor: color.hex }}
                  ></div>
                  <span className="text-xs text-gray-300">{color.name}</span>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {color.description}
                  </div>
                </div>
              ))}
            </div>
            <h4 className="text-xl font-semibold mt-8 mb-4 flex items-center text-white">
              <FaStar className="text-[#F71F27] mr-2" />
              Super Panel Options
            </h4>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
              {superPanelOptions.map((color, index) => (
                <div key={index} className="flex flex-col items-center group relative">
                  <div 
                    className="w-8 h-8 rounded-full mb-1 shadow-md" 
                    style={{ backgroundColor: color.hex }}
                  ></div>
                  <span className="text-xs text-gray-300">{color.name}</span>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {color.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 flex items-center text-white">
              <FaShieldAlt className="text-[#F71F27] mr-2" />
              Finish Types
            </h3>
            <ul className="space-y-4">
              {finishTypes.map((finish, index) => (
                <li key={index} className="flex items-start">
                  <FaSun className="text-[#F71F27] mt-1 mr-2 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-white">{finish.name}</span>
                    <p className="text-gray-300">{finish.description}</p>
                    <p className="text-sm text-[#F71F27] mt-1">Benefit: {finish.benefit}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 flex items-center text-white">
              <FaLayerGroup className="text-[#F71F27] mr-2" />
              Roofing Layers
            </h3>
            <div className="space-y-2">
              {roofingLayers.map((layer, index) => (
                <div key={index} className="flex items-center bg-gray-700 p-2 rounded-lg shadow">
                  <div 
                    className="w-8 h-4 mr-2 rounded shadow-md" 
                    style={{ backgroundColor: layer.color }}
                  ></div>
                  <div className="flex-grow">
                    <span className="font-semibold text-white text-sm">{layer.name}</span>
                    <span className="text-xs text-[#F71F27] ml-2">{layer.thickness}</span>
                  </div>
                  <p className="text-xs text-gray-300">{layer.benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-gray-300 mt-12 text-lg">
          Customize your roof with our wide range of colors and finishes. 
          Our expert team can help you choose the perfect combination for your home.
        </p>
        
        <div className="mt-8 flex justify-center">
          <Button
            onClick={() => navigate('/contact')}
            variant="primary"
            icon={<FaInfoCircle />}
          >
            Ask for a Swatches Sample
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FinishOptions;
