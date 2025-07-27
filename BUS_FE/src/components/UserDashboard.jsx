import React, { useEffect, useState } from "react";
import {
  Bus,
  Search,
  MapPin,
  Clock,
  Users,
  Star,
  ArrowLeft,
  Calendar,
  Phone,
  Mail,
  CreditCard,
  LogOut,
  User,
} from "lucide-react";
import axios from "axios";
import SeatSelection from "./SeatSelection";

function UserDashboard({ onAddBooking, onNavigate, onLogout, currentUser }) {
  const [searchForm, setSearchForm] = useState({
    from: "",
    to: "",
    date: "",
  });
  const [bookings, setBookings] = useState([]);
  const addBooking = (booking) => {
    const newBooking = {
      ...booking,
      id: `booking-${Date.now()}`,
      userId: currentUser?.id,
    };
    setBookings([...bookings, newBooking]);

    // Update available seats
  };
  const [buses, setBuses] = useState([
    {
      id: "bus-1",
      name: "Express Deluxe",
      operator: "City Transport Co.",
      from: "New York",
      to: "Washington DC",
      departureTime: "08:00",
      arrivalTime: "12:30",
      price: 45,
      availableSeats: 28,
      totalSeats: 40,
      amenities: ["WiFi", "AC", "Charging Port", "Refreshments"],
      rating: 4.5,
      date: "2025-01-15",
      operatorId: "operator-1",
    },
    {
      id: "bus-2",
      name: "Comfort Cruiser",
      operator: "Metro Lines",
      from: "Los Angeles",
      to: "San Francisco",
      departureTime: "14:00",
      arrivalTime: "20:15",
      price: 65,
      availableSeats: 15,
      totalSeats: 35,
      amenities: ["WiFi", "AC", "Reclining Seats", "Entertainment"],
      rating: 4.7,
      date: "2025-01-15",
      operatorId: "operator-1",
    },
    {
      id: "bus-3",
      name: "Swift Shuttle",
      operator: "Quick Transit",
      from: "Chicago",
      to: "Detroit",
      departureTime: "10:30",
      arrivalTime: "15:45",
      price: 38,
      availableSeats: 22,
      totalSeats: 42,
      amenities: ["AC", "Charging Port"],
      rating: 4.2,
      date: "2025-01-15",
      operatorId: "operator-1",
    },
  ]);
  const [filteredBuses, setFilteredBuses] = useState(buses);
  const [selectedBus, setSelectedBus] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    passengerName: "",
    passengerEmail: "",
    passengerPhone: "",
    seatsBooked: 1,
  });

  useEffect(() => {
    const getBuses = async () => {
      try {
        const response = await axios.get(
          "https://bus-ticketing-backend.onrender.com/home/user/getAllBuses",
          { withCredentials: true }
        );
        console.log(response.data);
        setBuses(response.data);
        setFilteredBuses(response.data);
      } catch (error) {
        console.error("Error fetching buses:", error);
      }
    };
    getBuses();
  }, [showBookingForm, selectedBus]);

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = buses.filter((bus) => {
      const fromMatch =
        !searchForm.from ||
        bus.from.toLowerCase().includes(searchForm.from.toLowerCase());
      const toMatch =
        !searchForm.to ||
        bus.to.toLowerCase().includes(searchForm.to.toLowerCase());
      const dateMatch = !searchForm.date || bus.date === searchForm.date;
      return fromMatch && toMatch && dateMatch;
    });
    setFilteredBuses(filtered);
  };
  useEffect(() => {
    const getBookingForUser = async () => {
      try {
        const response = await axios.get(
          "https://bus-ticketing-backend.onrender.com/home/user/getAllBookings",
          { withCredentials: true }
        );
        console.log(response.data);
        const allTickets = response.data; // your full array of ticket objects
        const bookingDate = new Date().toISOString().split("T")[0];

        const bookings = allTickets.flatMap((ticket) =>
          ticket.seats.map((seat) => ({
            busId: ticket.busId,
            passengerName: seat.passengerId.name,
            passengerEmail: seat.passengerId.email,
            passengerPhone: seat.passengerId.phone || null,
            seatNumber: seat.number,
            seatsBooked: 1,
            totalAmount: seat.price,
            bookingDate,
            status: "confirmed",
          }))
        );

        console.log(bookings);

        setBookings(bookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    getBookingForUser();
  }, [showBookingForm, selectedBus]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => onNavigate("landing")}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back
              </button>
              <Bus className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Book Your Journey
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                  Welcome, {currentUser?.name}
                </span>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span className="hidden sm:block">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        {!showBookingForm && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Search Buses
            </h2>
            <form onSubmit={handleSearch} className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From
                </label>
                <input
                  type="text"
                  value={searchForm.from}
                  onChange={(e) =>
                    setSearchForm({ ...searchForm, from: e.target.value })
                  }
                  placeholder="Departure city"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To
                </label>
                <input
                  type="text"
                  value={searchForm.to}
                  onChange={(e) =>
                    setSearchForm({ ...searchForm, to: e.target.value })
                  }
                  placeholder="Destination city"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={searchForm.date}
                  onChange={(e) =>
                    setSearchForm({ ...searchForm, date: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Search className="h-5 w-5" />
                  <span>Search</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Bus Results */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900">
            Available Buses ({filteredBuses.length})
          </h3>

          {!showBookingForm &&
            filteredBuses.map((bus, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="grid lg:grid-cols-4 gap-6">
                    {/* Bus Info */}
                    <div className="lg:col-span-2">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-xl font-bold text-gray-900 mb-1">
                            {bus.name}
                          </h4>
                          <p className="text-gray-600">{bus.operator}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium text-gray-700">
                            {bus.rating}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>
                            {bus.from} → {bus.to}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>
                            {bus.departureTime} - {bus.arrivalTime}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {bus.amenities.map((amenity, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Pricing & Booking */}
                    <div className="lg:col-span-2 flex flex-col justify-between">
                      <div className="mb-4">
                        <div className="text-right mb-2">
                          <div className="text-2xl font-bold text-gray-900">
                            ${bus.price}
                          </div>
                          <div className="text-sm text-gray-600">per seat</div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center justify-end space-x-1 text-sm">
                            <Users className="h-4 w-4 text-green-600" />
                            <span className="text-green-600 font-medium">
                              {bus.availableSeats} seats available
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedBus(bus);
                          setShowBookingForm(true);
                        }}
                        disabled={bus.availableSeats === 0}
                        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        {bus.availableSeats === 0 ? "Sold Out" : "Book Now"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          {filteredBuses.length === 0 && (
            <div className="text-center py-12">
              <Bus className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No buses found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search criteria
              </p>
            </div>
          )}
        </div>
        {showBookingForm && selectedBus && (
          <SeatSelection
            bus={selectedBus}
            onBack={() => {
              setSelectedBus(null);
              setShowBookingForm(false);
            }}
            onBook={(seats, id) => {
              console.log(seats, id);
              setShowBookingForm(!showBookingForm);
              setBuses(
                buses.map((bus, i) =>
                  bus.id === id
                    ? {
                        ...bus,
                        availableSeats:
                          bus.availableSeats - bookings[i].seats.length,
                      }
                    : bus
                )
              );
              // handleBooking(seats)
            }}
          />
        )}

        {/* My Bookings */}
        {bookings.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              My Bookings
            </h3>
            <div className="bg-white rounded-2xl shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                        Booking ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                        Route
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                        Seats
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                        Amount
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {bookings.map((booking, j) => {
                      const bus = buses.find((b) => b._id === booking.busId);
                      return (
                        <tr key={j}>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">
                            #{booking.id}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {bus?.from} → {bus?.to}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {booking.bookingDate}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {booking.seatsBooked}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">
                            ${booking.totalAmount}
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                              {booking.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
