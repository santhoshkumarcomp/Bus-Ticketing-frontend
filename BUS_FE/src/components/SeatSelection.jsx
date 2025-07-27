import { useEffect, useMemo, useState } from "react";
import "./SeatSelection.css";
import axios from "axios";
import Confirmation from "./Confirmation";
const SeatSelection = ({ bus, onBack, onBook }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [unavailableSeats, setUnAvailableSeats] = useState([]);
  const [addedSeats, setAddedSeats] = useState([]);
  const [currentStep, setCurrentStep] = useState("search");
  const handleSeatSelect = async (totalAmount) => {
    const payload = {
      busId: bus.id,
      totalAmount: totalAmount,
      seats: selectedSeats,
    };
    const response = await axios.put(
      "https://bus-ticketing-backend.onrender.com/home/user/book",
      payload,
      { withCredentials: true }
    );
    console.log(response);
  };

  // Generate seat layout (40 seats total - 10 rows x 4 seats)
  const generateSeats = (addedSeats) => {
    const bookedSeats = addedSeats.map((s) => s.number);
    const seats = unavailableSeats || [];
    // Mock booked seats

    for (let row = 1; row <= 10; row++) {
      const rowSeats = [];
      for (let seat = 1; seat <= 4; seat++) {
        const seatNumber = (row - 1) * 4 + seat;
        const seatId = `${row}${String.fromCharCode(64 + seat)}`; // 1A, 1B, etc.

        rowSeats.push({
          id: seatId,
          number: seatNumber,
          row,
          column: seat,
          isBooked: bookedSeats.includes(seatNumber),
          price: seat <= 2 ? bus.price : bus.price + 100, // Window seats cost more
        });
      }
      seats.push(rowSeats);
    }
    return seats;
  };
  useEffect(() => {
    const getSeats = async () => {
      const response = await axios.get(
        `https://bus-ticketing-backend.onrender.com/home/user/getBookings/${bus._id}`,
        { withCredentials: true }
      );
      console.log(response.data);
      const addedSeats = (response.data || []).flatMap(bus => 
        (bus.seats || []).filter(seat => seat.isBooked)
      );
      console.log(addedSeats);
      setAddedSeats(addedSeats);
      setUnAvailableSeats(response.data.seats);
    };
    getSeats();
  }, [bus._id]);
  unavailableSeats;
  const seats = useMemo(() => generateSeats(addedSeats), [unavailableSeats,bus._id]);

  const handleSeatClick = (seat) => {
    if (seat.isBooked) return;

    if (selectedSeats.find((s) => s.id === seat.id)) {
      setSelectedSeats(selectedSeats.filter((s) => s.id !== seat.id));
    } else {
      if (selectedSeats.length < 6) {
        // Max 6 seats
        setSelectedSeats([...selectedSeats, seat]);
      }
    }
  };

  const totalAmount = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  const getSeatClass = (seat) => {
    if (seat.isBooked) return "seat seat-booked";
    if (selectedSeats.find((s) => s.id === seat.id))
      return "seat seat-selected";
    return "seat seat-available";
  };

  return (
    <div className="seat-selection fade-in">
      <div className="step-nav">
        <button onClick={onBack} className="btn btn-secondary">
          ← Back to Results
        </button>
        <div className="step-title">Select Your Seats</div>
        <div className="bus-info">
          {bus.operator} - {bus.type}
        </div>
      </div>

      <div className="seat-container">
        <div className="seat-layout-section">
          <div className="bus-layout">
            <div className="bus-header-section">
              <div className="driver-section">
                <div className="steering">🚗</div>
                <span>Driver</span>
              </div>
            </div>

            <div className="seats-grid">
              {seats.map((row, rowIndex) => (
                <div key={rowIndex} className="seat-row">
                  <div className="row-number">{rowIndex + 1}</div>
                  <div className="row-seats">
                    <div className="seat-pair">
                      {row.slice(0, 2).map((seat) => (
                        <button
                          key={seat.id}
                          className={getSeatClass(seat)}
                          onClick={() => handleSeatClick(seat)}
                          disabled={seat.isBooked}
                          title={`Seat ${seat.id} - ₹${seat.price}`}
                        >
                          {seat.id}
                        </button>
                      ))}
                    </div>
                    <div className="aisle"></div>
                    <div className="seat-pair">
                      {row.slice(2, 4).map((seat) => (
                        <button
                          key={seat.id}
                          className={getSeatClass(seat)}
                          onClick={() => handleSeatClick(seat)}
                          disabled={seat.isBooked}
                          title={`Seat ${seat.id} - ₹${seat.price}`}
                        >
                          {seat.id}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="seat-legend">
            <h3>Seat Legend</h3>
            <div className="legend-items">
              <div className="legend-item">
                <div className="seat seat-available"></div>
                <span>Available</span>
              </div>
              <div className="legend-item">
                <div className="seat seat-selected"></div>
                <span>Selected</span>
              </div>
              <div className="legend-item">
                <div className="seat seat-booked"></div>
                <span>Booked</span>
              </div>
            </div>
          </div>
        </div>

        <div className="booking-summary">
          <div className="summary-card">
            <h3>Booking Summary</h3>

            <div className="trip-details">
              <div className="detail-row">
                <span>Bus:</span>
                <span>{bus.operator}</span>
              </div>
              <div className="detail-row">
                <span>Type:</span>
                <span>{bus.type}</span>
              </div>
              <div className="detail-row">
                <span>Departure:</span>
                <span>{bus.departureTime}</span>
              </div>
              <div className="detail-row">
                <span>Duration:</span>
                <span>{bus.duration}</span>
              </div>
            </div>

            <div className="selected-seats">
              <h4>Selected Seats ({selectedSeats.length})</h4>
              {selectedSeats.length === 0 ? (
                <p className="no-seats">No seats selected</p>
              ) : (
                <div className="seats-list">
                  {selectedSeats.map((seat) => (
                    <div key={seat.id} className="selected-seat-item">
                      <span className="seat-name">{seat.id}</span>
                      <span className="seat-price">₹{seat.price}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pricing">
              <div className="price-row">
                <span>Base Fare:</span>
                <span>
                  ₹{selectedSeats.reduce((sum, seat) => sum + bus.price, 0)}
                </span>
              </div>
              <div className="price-row">
                <span>Window Seat Charges:</span>
                <span>
                  ₹
                  {selectedSeats.reduce(
                    (sum, seat) => sum + (seat.price - bus.price),
                    0
                  )}
                </span>
              </div>
              <div className="price-row total">
                <span>Total Amount:</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>

            <button
              className={`btn ${
                selectedSeats.length > 0 ? "btn-primary" : "btn-secondary"
              } continue-btn`}
              onClick={() => {
                handleSeatSelect(seats, totalAmount);
                onBook(selectedSeats,bus.id);
              }}
              disabled={selectedSeats.length === 0}
            >
              Book ({selectedSeats.length} seat
              {selectedSeats.length !== 1 ? "s" : ""})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
