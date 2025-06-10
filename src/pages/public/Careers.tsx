import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBuilding, FaMapMarkerAlt, FaCalendarAlt, FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface Job {
  id: number;
  title: string;
  location: string;
  type: string;
  posted: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
}

const Careers = () => {
  const [expandedJob, setExpandedJob] = useState<number | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setJobs([
      {
        id: 1,
        title: 'Sales Representative',
        location: 'San Leonardo, Nueva Ecija',
        type: 'Full-time',
        posted: '2023-05-15',
        description: 'We are seeking a motivated Sales Representative to join our team. The ideal candidate will have excellent communication skills and a passion for customer service.',
        responsibilities: [
          'Develop and maintain client relationships',
          'Meet or exceed sales targets',
          'Provide product demonstrations and technical information',
          'Collaborate with the marketing team on sales strategies'
        ],
        qualifications: [
          'Bachelor\'s degree in Business or related field',
          'Minimum 2 years of sales experience',
          'Strong negotiation and presentation skills',
          'Proficiency in MS Office and CRM software'
        ]
      },
      {
        id: 2,
        title: 'Roofing Technician',
        location: 'Multiple Locations',
        type: 'Full-time',
        posted: '2023-05-10',
        description: 'Supersteel is looking for experienced Roofing Technicians to join our growing team. This role involves installing and repairing various roofing systems.',
        responsibilities: [
          'Install and repair roofing systems',
          'Ensure compliance with safety regulations',
          'Maintain tools and equipment',
          'Provide excellent customer service'
        ],
        qualifications: [
          'High school diploma or equivalent',
          'Minimum 3 years of roofing experience',
          'Knowledge of various roofing materials and techniques',
          'Valid driver\'s license and reliable transportation'
        ]
      },
      {
        id: 3,
        title: 'Driver',
        location: 'San Leonardo, Nueva Ecija',
        type: 'Full-time',
        posted: '2023-05-20',
        description: 'Supersteel is seeking a reliable and experienced Driver to join our logistics team. The ideal candidate will be responsible for safely transporting our products and materials to various locations.',
        responsibilities: [
          'Safely operate company vehicles to transport materials and products',
          'Perform pre-trip and post-trip vehicle inspections',
          'Maintain accurate logs of deliveries and vehicle maintenance',
          'Assist with loading and unloading of materials when necessary',
          'Adhere to all traffic laws and company safety policies'
        ],
        qualifications: [
          'Valid professional driver\'s license',
          'Minimum 2 years of professional driving experience',
          'Clean driving record',
          'Knowledge of road safety and traffic rules',
          'Ability to lift and handle heavy materials',
          'Excellent time management and organizational skills'
        ]
      }
    ]);
  }, []);

  const toggleJobExpansion = (jobId: number): void => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <img 
            src="https://www.shutterstock.com/image-photo/young-asian-business-team-work-260nw-1695247384.jpg" 
            alt="High Performing Team Members" 
            className="w-full h-72 object-cover rounded-lg shadow-lg"
          />
        </motion.div>
        <motion.h1 
          className="text-5xl font-bold text-gray-900 mb-8 text-left"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          Join Our <span className="text-[#F71F27]">Team</span>
        </motion.h1>
        
        <motion.p 
          className="text-xl text-gray-700 text-left mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          Explore exciting career opportunities at Supersteel and be part of our mission to deliver excellence in the construction industry.
        </motion.p>

        <AnimatePresence>
          {jobs.map((job) => (
            <motion.div
              key={job.id}
              className="bg-gray-100 rounded-lg shadow-lg mb-6 overflow-hidden"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-semibold text-gray-900">{job.title}</h2>
                  <span className="bg-[#F71F27] text-white px-3 py-1 rounded-full text-sm">{job.type}</span>
                </div>
                <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
                  <div className="flex items-center">
                    <FaBuilding className="mr-2" />
                    <span>Supersteel</span>
                  </div>
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-2" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-2" />
                    <span>Posted on {job.posted}</span>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{job.description}</p>
                <button
                  className="flex items-center text-[#F71F27] hover:text-red-400 transition-colors duration-200"
                  onClick={() => toggleJobExpansion(job.id)}
                >
                  {expandedJob === job.id ? 'Show Less' : 'Learn More'}
                  <FaChevronDown className={`ml-2 transition-transform duration-200 ${expandedJob === job.id ? 'transform rotate-180' : ''}`} />
                </button>
              </div>
              <AnimatePresence>
                {expandedJob === job.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-200 p-6"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Responsibilities:</h3>
                    <ul className="list-disc list-inside text-gray-700 mb-4">
                      {job.responsibilities.map((resp: string, index: number) => (
                        <li key={index}>{resp}</li>
                      ))}
                    </ul>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Qualifications:</h3>
                    <ul className="list-disc list-inside text-gray-700 mb-4">
                      {job.qualifications.map((qual: string, index: number) => (
                        <li key={index}>{qual}</li>
                      ))}
                    </ul>
                    <Link
                      to="/contact"
                      className="inline-block bg-[#F71F27] text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors duration-200"
                    >
                      Apply Now
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>

        {jobs.length === 0 && (
          <motion.p
            className="text-left text-gray-600 text-xl"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            No job openings available at the moment. Please check back later!
          </motion.p>
        )}

        <motion.div
          className="text-left mt-12"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <p className="text-gray-700 mb-4">Don't see a position that fits your skills?</p>
          <Link
            to="/contact"
            className="inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-300 transition-colors duration-200"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Careers;
