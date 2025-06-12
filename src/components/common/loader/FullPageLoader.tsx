type FullPageLoaderProps = {
  title?: string;
  subtitle?: string;
};

export const FullPageLoader = ({
  title = "Loading...",
  subtitle = "This may take a few moments",
}: FullPageLoaderProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#F71F27] mx-auto mb-4"></div>
        <p className="text-xl font-semibold text-gray-700">{title}</p>
        <p className="text-sm text-gray-500 mt-2">{subtitle}</p>
      </div>
    </div>
  );
};
