import React, { useState } from 'react';
import MoviesList from './MoviesList';
import SeatSelection from './SeatSelection';
import Payment from './Payment';
import Confirmation from './Confirmation';

const BookingFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingInfo, setBookingInfo] = useState({});

  const handleMovieSelect = (movie) => {
    setBookingInfo((prev) => ({ ...prev, movie }));
    setCurrentStep(2); // Go to seat selection
  };

  const handleSeatSelect = (seat) => {
    setBookingInfo((prev) => ({ ...prev, seat }));
    setCurrentStep(3); // Go to payment
  };

  const handlePaymentSuccess = () => {
    setCurrentStep(4); // Go to confirmation
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1)); // Go back to previous step
  };

  return (
    <div>
      {currentStep === 1 && (
        <div>
          <MoviesList onSelectMovie={handleMovieSelect} />
        </div>
      )}
      {currentStep === 2 && (
        <div>
          <SeatSelection onSelectSeat={handleSeatSelect} bookingInfo={bookingInfo} />
          <button onClick={handleBack}>Back to Movies</button>
        </div>
      )}
      {currentStep === 3 && (
        <div>
          <Payment onPaymentSuccess={handlePaymentSuccess} bookingInfo={bookingInfo} />
          <button onClick={handleBack}>Back to Seat Selection</button>
        </div>
      )}
      {currentStep === 4 && (
        <div>
          <Confirmation bookingInfo={bookingInfo} />
          <button onClick={() => setCurrentStep(1)}>Book Another Movie</button>
        </div>
      )}
    </div>
  );
};

export default BookingFlow;
