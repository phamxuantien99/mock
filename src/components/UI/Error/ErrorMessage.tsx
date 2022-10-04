/* eslint-disable no-restricted-globals */

const ErrorMessage = () => {
  return (
    <div className="flex justify-center items-center h-[60vh] text-center">
      <div>
        <span className="text-5xl font-medium block">Something went wrong...</span>
        <span className="block font-light mt-2 mb-6">
          Please check your connection and try again!
        </span>
        <span className="text-green-500 cursor-pointer text-lg" onClick={() => location.reload()}>
          <i className="fa-solid fa-rotate-right"></i> Refresh page
        </span>
      </div>
    </div>
  );
};

export default ErrorMessage;
