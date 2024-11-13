import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import MoviesList from './components/MoviesList';
import SeatSelection from './components/SeatSelection';
import Login from './components/Login';
import Payment from './components/Payment';
import Confirmation from './components/Confirmation';

const App = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentStep(0); // Go to movies list after login
  };

  const handlePaymentSuccess = () => {
    setCurrentStep(3); // Go to confirmation page
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <MoviesList onSelectMovie={() => setCurrentStep(1)} />;
      case 1:
        return <SeatSelection onSelectSeat={() => setCurrentStep(2)} />;
      case 2:
        return <Payment onPaymentSuccess={handlePaymentSuccess} />;
      case 3:
        return <Confirmation />;
      default:
        return <MoviesList />;
    }
  };

  return (
    <AuthProvider>
      <Header />
      <main>
        {!isLoggedIn ? (
          <Login onLoginSuccess={handleLoginSuccess} />
        ) : (
          renderStep()
        )}
      </main>
      <Footer />
    </AuthProvider>
  );
};

export default App;
