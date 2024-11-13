import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FaCheckCircle } from 'react-icons/fa'; // Importing a check icon for confirmation

const Confirmation = () => {
  const { bookingInfo } = useContext(AuthContext);

  return (
    <div style={styles.container}>
      <FaCheckCircle style={styles.icon} />
      <h2 style={styles.title}>Booking Confirmed!</h2>

      {bookingInfo.movie && (
        <div style={styles.details}>
          <p><strong>Movie:</strong> {bookingInfo.movie.title}</p>
          
          {/* Display the chosen seats */}
          <p><strong>Seat(s):</strong> {Array.isArray(bookingInfo.chosenSeats) ? bookingInfo.chosenSeats.join(', ') : bookingInfo.chosenSeats}</p>

          {/* Display theater details */}
          {bookingInfo.theater && (
            <p><strong>Theater:</strong> {bookingInfo.theater.name}</p>
          )}

          <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p> {/* You can customize this with actual date info */}
          <p><strong>Time:</strong> 7:30 PM</p> {/* Sample time, you can replace this with dynamic time if available */}
        </div>
      )}

      <div style={styles.thanksMessage}>
        <p>Thank you for booking with us!</p>
        <p>Your confirmation details have been sent to your email.</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    maxWidth: '400px',
    margin: '0 auto',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  icon: {
    color: '#28a745', // Green color for success
    fontSize: '50px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
  },
  details: {
    textAlign: 'left',
    backgroundColor: '#f8f9fa',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  thanksMessage: {
    fontSize: '16px',
    color: '#555',
  },
};

export default Confirmation;
