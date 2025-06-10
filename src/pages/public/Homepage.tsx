import Hero from './homepage/Hero';
import Solutions from './homepage/Solutions';
import RoofModel from './homepage/RoofModel';
import Flagship from './homepage/Flagship';

const Homepage = () => {
  return (
    <div className="homepage">
        <Hero />
        <Solutions />
        <RoofModel />
        <Flagship />
    </div>
  );
};

export default Homepage;
