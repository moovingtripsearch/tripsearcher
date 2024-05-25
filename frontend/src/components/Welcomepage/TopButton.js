export default function ButtonVariants({ onTripTypeChange }) {
  const handleButtonClick = (type) => {
    onTripTypeChange(type);
  };

  return (
    <>
      <button className="btn btn-primary" onClick={() => handleButtonClick('Urban')}>
        Urban Trip
      </button>
      <button className="btn btn-success" onClick={() => handleButtonClick('Inter-urban')}>
        Inter-urban Trips
      </button>
      <button className="btn btn-active" onClick={() => handleButtonClick('car-hire')}>
        Car hire
      </button>
    </>
  );
}