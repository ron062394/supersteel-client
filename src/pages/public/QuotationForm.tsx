import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUpload, FaPaperPlane, FaCheckCircle, FaUser, FaEnvelope, FaPhone, FaFileAlt, FaBuilding, FaTrash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FormData {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  company: string;
  projectDescription: string;
}

interface Field {
  name: keyof FormData;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  type?: string;
}

const QuotationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    company: '',
    projectDescription: '',
  });
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newImages = Array.from(event.target.files);
      setImages(prevImages => [...prevImages, ...newImages]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Check if required fields are filled
    const requiredFields: Array<keyof FormData> = ['clientName', 'clientEmail', 'clientPhone', 'projectDescription'];
    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      setIsSubmitting(false);
      toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      // Mock successful submission
      console.log('Form submitted with data:', formData);
      console.log('Images:', images);
      
      setSubmitStatus('success');
      toast.success('Your quotation request has been submitted successfully!');
      
      // Reset form fields
      setFormData({
        clientName: '',
        clientEmail: '',
        clientPhone: '',
        company: '',
        projectDescription: '',
      });
      setImages([]);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      toast.error('An error occurred while submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-12";
  const labelClasses = "block text-gray-700 text-sm font-bold mb-2";

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const fields: Field[] = [
    { name: 'clientName', icon: FaUser, label: 'Client Name' },
    { name: 'clientEmail', icon: FaEnvelope, label: 'Client Email', type: 'email' },
    { name: 'clientPhone', icon: FaPhone, label: 'Client Phone', type: 'tel' },
    { name: 'company', icon: FaBuilding, label: 'Company' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-20">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <h2 className="text-5xl font-bold text-gray-900 my-8 text-center">
          Request a <span className='text-[#F71F27]'>Quotation</span>
        </h2>
        <p className="text-1xl text-gray-700 text-center mb-4 max-w-3xl mx-auto">
          Fill out the form below and our team will get back to you with a customized quote for your project.
        </p>
        <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-lg px-8 pt-8 pb-10 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields.map((field) => (
              <div key={field.name} className="relative">
                <label htmlFor={field.name} className={labelClasses}>
                  <field.icon className="inline mr-2" />
                  {field.label}
                  {field.name !== 'company' && <span className="text-red-500">*</span>}
                </label>
                <input
                  type={field.type || 'text'}
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className={inputClasses}
                  required={field.name !== 'company'}
                />
                <field.icon className="absolute left-3 top-10 text-gray-400" />
              </div>
            ))}
          </div>
          <div className="mt-6 relative">
            <label htmlFor="projectDescription" className={labelClasses}>
              <FaFileAlt className="inline mr-2" />
              Project Description
              <span className="text-red-500">*</span>
            </label>
            <textarea
              id="projectDescription"
              name="projectDescription"
              value={formData.projectDescription}
              onChange={handleChange}
              className={`${inputClasses} h-40`}
              required
            ></textarea>
            <FaFileAlt className="absolute left-3 top-10 text-gray-400" />
          </div>
          <div className="mt-8">
            <label className={labelClasses}>Upload Images</label>
            <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-[#F71F27] transition-colors duration-300">
              <div className="space-y-1 text-center">
                {images.length > 0 ? (
                  <FaCheckCircle className="mx-auto h-12 w-12 text-green-500" />
                ) : (
                  <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
                )}
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-[#F71F27] hover:text-red-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500">
                    <span>Upload files</span>
                    <input
                      id="file-upload"
                      name="images"
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      accept="image/*"
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                {images.length > 0 ? (
                  <p className="text-sm text-green-500">{images.length} file(s) selected</p>
                ) : (
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                )}
              </div>
            </div>
            {images.length > 0 && (
              <ul className="mt-4 space-y-2">
                {images.map((image, index) => (
                  <li key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                    <span className="text-sm text-gray-700 truncate">{image.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isSubmitting}
            className="mt-8 w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-[#F71F27] hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300"
          >
            {isSubmitting ? 'Submitting...' : (
              <>
                <FaPaperPlane className="mr-2" />
                Submit Request
              </>
            )}
          </motion.button>
        </form>

        <AnimatePresence>
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg shadow-md mb-4"
              role="alert"
            >
              <strong className="font-bold">Success!</strong>
              <span className="block sm:inline ml-2">Your quotation request has been submitted.</span>
            </motion.div>
          )}
          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-md mb-4"
              role="alert"
            >
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline ml-2">An error occurred. Please try again.</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default QuotationForm;
