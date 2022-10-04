import React from 'react';
import ReactDOM from 'react-dom';

import './LoadingModal.css';

const ModalOverlay = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-30 flex justify-center items-center z-20">
      <div>
        <div className="loadingio-spinner-ripple-erqpx0drz1m">
          <div className="ldio-uyafepxuk4">
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoadingModal = () => {
  return <>{ReactDOM.createPortal(<ModalOverlay />, document.getElementById('overlay-root')!)}</>;
};

export default LoadingModal;
