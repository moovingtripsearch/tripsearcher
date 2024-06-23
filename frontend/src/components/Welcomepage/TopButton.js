import React, { useState } from 'react';

export default function ButtonVariants({ onTripTypeChange }) {
  const [selectedType, setSelectedType] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = (type) => {
    onTripTypeChange(type);
    setSelectedType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button className="btn btn-primary" onClick={() => handleButtonClick('Urban trips')}>
        Urban Trip
      </button>
      <button className="btn btn-success" onClick={() => handleButtonClick('Inter-urban trips')}>
        Inter-urban Trips
      </button>
      <button className="btn btn-active" onClick={() => handleButtonClick('car-hire')}>
        Car hire
      </button>

      {isModalOpen && (
        <dialog id="my_modal_4" className="modal" open>
          <div className="modal-box w-11/12 max-w-1xl">
            <h3 className="font-bold text-lg">Find a trip!</h3>
            <p className="py-4 h4">You are now under <span style={{color: "#86b7fe"}}>{selectedType}</span></p>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn" onClick={closeModal}>Close</button>
              </form>
            </div>
          </div>
        </dialog>
      )}
{/* 
      <div role="alert" className="alert alert-info position-absolute bottom-0 end-10 max-w-2xl">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
          className="stroke-current shrink-0 w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z">

            </path>    
        </svg>
        <span>Search for an {selectedType}</span>
      </div>
*/}
    </>
  );
}