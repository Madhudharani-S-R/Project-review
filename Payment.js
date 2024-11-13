import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const Payment = ({ onPaymentSuccess }) => {
  const { bookingInfo } = useContext(AuthContext);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');

  const handlePayment = () => {
    // Simulate payment processing
    console.log('Payment processed for:', bookingInfo);
    console.log('Card Number:', cardNumber);
    console.log('Expiry:', expiry);
    console.log('CVV:', cvv);
    console.log('Name:', name);
    onPaymentSuccess();
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Payment</h2>

      {/* Display movie title */}
      <p>Movie: <strong>{bookingInfo.movie?.title}</strong></p>

      {/* Display theater name */}
      <p>Theater: <strong>{bookingInfo.movie?.theaters}</strong></p>

      {/* Display chosen seats */}
      <p>Seat(s): <strong>{Array.isArray(bookingInfo.chosenSeats) ? bookingInfo.chosenSeats.join(', ') : bookingInfo.chosenSeats}</strong></p>

      <div style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Name on Card</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            placeholder="John Doe"
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Card Number</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            style={styles.input}
            placeholder="1234 5678 9101 1121"
            maxLength="16"
            required
          />
        </div>

        <div style={styles.inputRow}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Expiry Date</label>
            <input
              type="text"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              style={styles.input}
              placeholder="MM/YY"
              maxLength="5"
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>CVV</label>
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              style={styles.input}
              placeholder="123"
              maxLength="3"
              required
            />
          </div>
        </div>

        <button onClick={handlePayment} style={styles.button}>Confirm Payment</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  inputRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    marginTop: '20px',
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Payment;
