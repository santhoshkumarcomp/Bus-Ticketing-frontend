import './Confirmation.css'

const Confirmation = ({ bookingData, bus, seats, onNewSearch }) => {
  const bookingId = `BG${Date.now().toString().slice(-8)}`
  const totalAmount = seats.reduce((sum, seat) => sum + seat.price, 0)

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="confirmation fade-in">
      <div className="confirmation-container">
        <div className="success-header">
          <div className="success-icon">✓</div>
          <h1>Booking Confirmed!</h1>
          <p>Your bus ticket has been successfully booked</p>
        </div>

        <div className="booking-details">
          <div className="booking-id-section">
            <h2>Booking ID: <span className="booking-id">{bookingId}</span></h2>
            <p className="booking-note">
              Please save this booking ID for future reference. A confirmation email has been sent to {bookingData.contactInfo.email}
            </p>
          </div>

          <div className="ticket-details">
            <div className="ticket-section">
              <h3>Journey Details</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <span className="label">Bus Operator:</span>
                  <span className="value">{bus.operator}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Bus Type:</span>
                  <span className="value">{bus.type}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Departure:</span>
                  <span className="value">{bus.departureTime}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Arrival:</span>
                  <span className="value">{bus.arrivalTime}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Duration:</span>
                  <span className="value">{bus.duration}</span>
                </div>
              </div>
            </div>

            <div className="ticket-section">
              <h3>Passenger Details</h3>
              <div className="passengers-list">
                {bookingData.passengers.map((passenger, index) => (
                  <div key={index} className="passenger-item">
                    <div className="passenger-info">
                      <span className="passenger-name">{passenger.name}</span>
                      <span className="passenger-details">
                        {passenger.age} years, {passenger.gender}
                      </span>
                    </div>
                    <div className="seat-info">
                      <span className="seat-number">Seat {passenger.seatId}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="ticket-section">
              <h3>Contact Information</h3>
              <div className="contact-details">
                <div className="contact-item">
                  <span className="label">Phone:</span>
                  <span className="value">{bookingData.contactInfo.phone}</span>
                </div>
                <div className="contact-item">
                  <span className="label">Email:</span>
                  <span className="value">{bookingData.contactInfo.email}</span>
                </div>
              </div>
            </div>

            <div className="ticket-section payment-summary">
              <h3>Payment Summary</h3>
              <div className="payment-details">
                <div className="payment-row">
                  <span>Ticket Fare ({seats.length} seat{seats.length !== 1 ? 's' : ''})</span>
                  <span>₹{totalAmount}</span>
                </div>
                <div className="payment-row">
                  <span>Booking Fee</span>
                  <span>₹0</span>
                </div>
                <div className="payment-row total">
                  <span>Total Paid</span>
                  <span>₹{totalAmount}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="important-info">
            <h3>Important Information</h3>
            <ul>
              <li>Please arrive at the boarding point at least 15 minutes before departure</li>
              <li>Carry a valid photo ID proof during your journey</li>
              <li>Cancellation must be done at least 2 hours before departure</li>
              <li>Contact customer support for any assistance: 1800-123-4567</li>
            </ul>
          </div>

          <div className="action-buttons">
            <button onClick={handlePrint} className="btn btn-secondary">
              📄 Print Ticket
            </button>
            <button onClick={onNewSearch} className="btn btn-primary">
              Book Another Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Confirmation