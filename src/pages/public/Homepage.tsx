import Hero from './homepage/Hero';
import Solutions from './homepage/Solutions';
import RoofModel from './homepage/RoofModel';
import Flagship from './homepage/Flagship';
import FinishOptions from './homepage/Finish-options';
import Testimonials from './homepage/Testimonials';

const Homepage = () => {
  return (
    <div className="homepage">
        <Hero />
        <Solutions />
        <RoofModel />
        <Flagship />
        <FinishOptions />
        <Testimonials />
    </div>
  );
};

export default Homepage;
