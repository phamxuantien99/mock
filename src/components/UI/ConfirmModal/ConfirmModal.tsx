import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const ConfirmModalOverlay: React.FC<{
  target: string;
  toggleConfirmModal: boolean;
  onCancelDelete: () => void;
  onConfirmDelete: () => void;
}> = ({ target, toggleConfirmModal, onCancelDelete, onConfirmDelete }) => {
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  useEffect(() => {
    setShowConfirmModal(toggleConfirmModal);
  }, [toggleConfirmModal]);

  return (
    <div
      id="popup-modal"
      tabIndex={-1}
      className={`${
        showConfirmModal ? '' : 'hidden'
      } bg-black bg-opacity-50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal h-full`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setShowConfirmModal(false);
          onCancelDelete();
        }
      }}
    >
      <div className="top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] relative p-2 sm:p-4 w-full max-w-md h-auto ">
        <div className="relative rounded-lg shadow dark:bg-gray-200">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-toggle="popup-modal"
            onClick={() => {
              setShowConfirmModal(false);
              onCancelDelete();
            }}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="#000"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-6 text-center">
            <svg
              aria-hidden="true"
              className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
              fill="none"
              stroke="red"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <h3 className="mb-5 text-xl font-medium text-black">
              Are you sure you want to delete this {target}?
            </h3>
            <button
              data-modal-toggle="popup-modal"
              type="button"
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              onClick={() => {
                setShowConfirmModal(false);
                onConfirmDelete();
              }}
            >
              Yes, I'm sure
            </button>
            <button
              data-modal-toggle="popup-modal"
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              onClick={() => {
                setShowConfirmModal(false);
                onCancelDelete();
              }}
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ConfirmModal: React.FC<{
  target: string;
  toggleConfirmModal: boolean;
  onCancelDelete: () => void;
  onConfirmDelete: () => void;
}> = ({ target, toggleConfirmModal, onCancelDelete, onConfirmDelete }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <ConfirmModalOverlay
          target={target}
          toggleConfirmModal={toggleConfirmModal}
          onCancelDelete={onCancelDelete}
          onConfirmDelete={onConfirmDelete}
        />,
        document.getElementById('confirm-modal')!
      )}
    </>
  );
};

export default ConfirmModal;
