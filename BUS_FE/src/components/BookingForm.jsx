import { useEffect, useState } from "react";
import "./BookingForm.css";

const BookingForm = ({ bus, seats, onSubmit, onBack, onBook }) => {
  const [passengers, setPassengers] = useState(
    seats.map((seat, index) => ({
      seatId: seat.id,
      name: "",
      age: "",
      gender: "",
      phone: index === 0 ? "" : "",
      email: index === 0 ? "" : "",
    }))
  );
  useEffect(() => {
    onBook();
  }, []);
  const [contactInfo, setContactInfo] = useState({
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index][field] = value;
    setPassengers(updatedPassengers);

    // Clear error when user starts typing
    if (errors[`passenger_${index}_${field}`]) {
      const newErrors = { ...errors };
      delete newErrors[`passenger_${index}_${field}`];
      setErrors(newErrors);
    }
  };

  const handleContactChange = (field, value) => {
    setContactInfo({
      ...contactInfo,
      [field]: value,
    });

    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate contact info
    if (!contactInfo.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(contactInfo.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!contactInfo.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(contactInfo.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Validate passengers
    passengers.forEach((passenger, index) => {
      if (!passenger.name) {
        newErrors[`passenger_${index}_name`] = "Name is required";
      }
      if (!passenger.age) {
        newErrors[`passenger_${index}_age`] = "Age is required";
      } else if (passenger.age < 1 || passenger.age > 120) {
        newErrors[`passenger_${index}_age`] = "Please enter a valid age";
      }
      if (!passenger.gender) {
        newErrors[`passenger_${index}_gender`] = "Gender is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        passengers,
        contactInfo,
        totalAmount: seats.reduce((sum, seat) => sum + seat.price, 0),
      });
    }
  };

  const totalAmount = seats.reduce((sum, seat) => sum + seat.price, 0);

  return (
    <div className="booking-form fade-in">
      <div className="step-nav">
        <button onClick={onBack} className="btn btn-secondary">
          ← Back to Seat Selection
        </button>
        <div className="step-title">Passenger Details</div>
        <div className="seats-info">
          {seats.length} seat{seats.length !== 1 ? "s" : ""} selected
        </div>
      </div>

      <div className="booking-container">
        <div className="form-section">
          <form onSubmit={handleSubmit} className="booking-form-content">
            <div className="contact-section">
              <h3>Contact Information</h3>
              <p className="section-desc">
                We'll send booking confirmation to this contact information
              </p>

              <div className="grid grid-2">
                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    className={`form-input ${errors.phone ? "error" : ""}`}
                    value={contactInfo.phone}
                    onChange={(e) =>
                      handleContactChange("phone", e.target.value)
                    }
                    placeholder="Enter 10-digit mobile number"
                  />
                  {errors.phone && (
                    <span className="error-text">{errors.phone}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    className={`form-input ${errors.email ? "error" : ""}`}
                    value={contactInfo.email}
                    onChange={(e) =>
                      handleContactChange("email", e.target.value)
                    }
                    placeholder="Enter email address"
                  />
                  {errors.email && (
                    <span className="error-text">{errors.email}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="passengers-section">
              <h3>Passenger Details</h3>
              <p className="section-desc">
                Please enter details for each passenger
              </p>

              {passengers.map((passenger, index) => (
                <div key={index} className="passenger-card">
                  <h4>
                    Passenger {index + 1} - Seat {passenger.seatId}
                  </h4>

                  <div className="grid grid-3">
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        className={`form-input ${
                          errors[`passenger_${index}_name`] ? "error" : ""
                        }`}
                        value={passenger.name}
                        onChange={(e) =>
                          handlePassengerChange(index, "name", e.target.value)
                        }
                        placeholder="Enter full name"
                      />
                      {errors[`passenger_${index}_name`] && (
                        <span className="error-text">
                          {errors[`passenger_${index}_name`]}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Age *</label>
                      <input
                        type="number"
                        className={`form-input ${
                          errors[`passenger_${index}_age`] ? "error" : ""
                        }`}
                        value={passenger.age}
                        onChange={(e) =>
                          handlePassengerChange(index, "age", e.target.value)
                        }
                        placeholder="Age"
                        min="1"
                        max="120"
                      />
                      {errors[`passenger_${index}_age`] && (
                        <span className="error-text">
                          {errors[`passenger_${index}_age`]}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Gender *</label>
                      <select
                        className={`form-select ${
                          errors[`passenger_${index}_gender`] ? "error" : ""
                        }`}
                        value={passenger.gender}
                        onChange={(e) =>
                          handlePassengerChange(index, "gender", e.target.value)
                        }
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      {errors[`passenger_${index}_gender`] && (
                        <span className="error-text">
                          {errors[`passenger_${index}_gender`]}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="terms-section">
              <label className="checkbox-label">
                <input type="checkbox" required />
                <span className="checkmark"></span>I agree to the{" "}
                <a href="#" className="link">
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a href="#" className="link">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button type="submit" className="btn btn-primary submit-btn">
              Proceed to Payment - ₹{totalAmount}
            </button>
          </form>
        </div>

        <div className="summary-sidebar">
          <div className="summary-card">
            <h3>Booking Summary</h3>

            <div className="trip-summary">
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
                <span>Arrival:</span>
                <span>{bus.arrivalTime}</span>
              </div>
            </div>

            <div className="seats-summary">
              <h4>Selected Seats</h4>
              <div className="seats-grid-summary">
                {seats.map((seat) => (
                  <div key={seat.id} className="seat-summary-item">
                    <span className="seat-id">{seat.id}</span>
                    <span className="seat-price">₹{seat.price}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="total-section">
              <div className="total-row">
                <span>Total Amount</span>
                <span className="total-amount">₹{totalAmount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
