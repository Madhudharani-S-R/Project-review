import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import seatLogo from '../assets/seat-logo.png'; // Import your seat logo image

const SeatSelection = ({ onSelectSeat }) => {
  const { bookingInfo, setBookingInfo } = useContext(AuthContext);
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Simulated seats data with more realistic theater layout
  const rows = 10;
  const seatsPerRow = 12;
  const aisleIndexes = [4, 8]; // Aisles after these seat indexes

  // Generate alphabet labels for rows (reversed, so A is farthest from the screen)
  const rowLabels = Array.from({ length: rows }, (_, i) => String.fromCharCode(65 + i)).reverse();

  // Initial available seats
  const initialSeats = Array.from({ length: rows }, (_, rowIndex) => {
    return Array.from({ length: seatsPerRow }, (_, seatIndex) => ({
      id: `${rowLabels[rowIndex]}-${seatIndex + 1}`, // Using row labels for seat ID
      booked: Math.random() < 0.3, // Randomly mark some seats as booked (30% chance)
    }));
  });

  const [seats] = useState(initialSeats);

  const toggleSeatSelection = (seat) => {
    const isSelected = selectedSeats.includes(seat.id);
    const updatedSeats = isSelected
      ? selectedSeats.filter((s) => s !== seat.id) // Remove from selected
      : [...selectedSeats, seat.id]; // Add to selected

    setSelectedSeats(updatedSeats);
    setBookingInfo({ ...bookingInfo, chosenSeats: updatedSeats });
  };

  return (
    <div style={styles.container}>
      <h2>Select Seats for {bookingInfo.movie?.title}</h2>

      {/* Screen representation */}
      <div style={styles.screen}>SCREEN</div>

      <div style={styles.seatContainer}>
        {seats.map((row, rowIndex) => (
          <div key={rowIndex} style={{ ...styles.row, marginBottom: rowIndex % 5 === 4 ? '20px' : '0' }}> {/* Add margin after every 5th row */}
            <div style={styles.rowLabel}>{rowLabels[rowIndex]}</div> {/* Row label */}
            {row.map((seat, seatIndex) => (
              <React.Fragment key={seat.id}>
                {/* Insert an aisle space */}
                {aisleIndexes.includes(seatIndex) && <div style={styles.aisle} />}
                
                <button
                  onClick={() => toggleSeatSelection(seat)}
                  style={{
                    ...styles.seat,
                    backgroundColor: seat.booked
                      ? '#ff4d4d' // Red for booked
                      : selectedSeats.includes(seat.id)
                      ? '#28a745' // Green for selected
                      : '#ccc', // Gray for available
                  }}
                  disabled={seat.booked} // Disable button if booked
                >
                  <img 
                    src={seatLogo} 
                    alt={`Seat ${seat.id}`} 
                    style={styles.seatLogo} 
                  />
                </button>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>

      <div>
        <h3>Selected Seats: {selectedSeats.join(', ')}</h3>
        <button onClick={onSelectSeat} style={styles.confirmButton} disabled={selectedSeats.length === 0}>
          Confirm Selection
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
  },
  screen: {
    width: '80%',
    margin: '20px auto',
    padding: '10px',
    backgroundColor: '#333',
    color: 'white',
    textAlign: 'center',
    fontSize: '18px',
    borderRadius: '4px',
  },
  seatContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center', // Align row label with seats
  },
  rowLabel: {
    marginRight: '10px', // Space between row label and seats
    fontWeight: 'bold',
  },
  seat: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #333',
    cursor: 'pointer',
    margin: '0 5px',
    transition: 'background-color 0.3s',
    display: 'flex', // Flex display to center the logo
    justifyContent: 'center',
    alignItems: 'center',
  },
  seatLogo: {
    width: '20px', // Adjust size as needed
    height: '20px',
  },
  aisle: {
    width: '30px', // Space for aisles
  },
  confirmButton: {
    marginTop: '20px',
    padding: '10px 15px',
    fontSize: '16px',
    borderRadius: '4px',
    backgroundColor: '#28a745',
    color: 'white',
    cursor: 'pointer',
  },
};

export default SeatSelection;
