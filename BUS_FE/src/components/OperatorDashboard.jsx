import React, { useCallback, useEffect, useState } from "react";
import {
  Bus,
  Plus,
  Edit,
  Trash2,
  ArrowLeft,
  Users,
  DollarSign,
  Calendar,
  Clock,
  MapPin,
  Star,
  LogOut,
  Building2,
} from "lucide-react";
import axios from "axios";
function OperatorDashboard({
  bookings,

  onNavigate,
  onLogout,
  currentUser,
}) {
  const [showAddBusForm, setShowAddBusForm] = useState(false);
  const [editingBus, setEditingBus] = useState(null);
  const [busForm, setBusForm] = useState({
    name: "",
    operator: "",
    from: "",
    to: "",
    departureTime: "",
    arrivalTime: "",
    price: "",
    totalSeats: "",
    amenities: [],
    rating: 4.0,
    date: "",
  });
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
  const addBus = useCallback((bus) => {
    const newBus = {
      ...bus,
      id: `bus-${Date.now()}`,
      operatorId: currentUser?.id,
    };
    setBuses([...buses, newBus]);
  }, []);
  useEffect(() => {
    const getBuses = async () => {
      try {
        const response = await axios.get(
          "https://bus-ticketing-backend.onrender.com/auth/busOperator/getBuses",
          { withCredentials: true }
        );
        console.log(response.data);
        setBuses(response.data);
      } catch (error) {
        console.error("Error fetching buses:", error);
      }
    };
    getBuses();
  }, [addBus]);

  const updateBus = (busId, updates) => {
    setBuses(
      buses.map((bus) => (bus.id === busId ? { ...bus, ...updates } : bus))
    );
  };
  const availableAmenities = [
    "WiFi",
    "AC",
    "Charging Port",
    "Refreshments",
    "Reclining Seats",
    "Entertainment",
    "Blanket",
    "Reading Light",
  ];

  const resetForm = () => {
    setBusForm({
      name: "",
      operator: "",
      from: "",
      to: "",
      departureTime: "",
      arrivalTime: "",
      price: "",
      totalSeats: "",
      amenities: [],
      rating: 4.0,
      date: "",
    });
  };
  // name,
  // operator,
  // from,
  // to,
  // departureTime,
  // arrivalTime,
  // price,
  // totalSeats,
  // amenities,
  // rating,
  // date,
  // availableSeats,
  // busType,
  // status

  const handleAddBus = async (e) => {
    e.preventDefault();
    if (busForm.name && busForm.from && busForm.to) {
      const newBus = {
        ...busForm,
        availableSeats: busForm.totalSeats,
        busType: "AC",
        status: "Active",
      };
      const response = await axios.post(
        `https://bus-ticketing-backend.onrender.com/auth/busOperator/create`,
        { ...newBus },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);

      addBus(newBus);
      setShowAddBusForm(false);
      resetForm();
    }
  };

  const handleEditBus = async (bus) => {
    console.log(bus);
    setEditingBus({ ...bus, id: bus._id });
    setBusForm({
      id: bus._id,
      name: bus.name,
      operator: bus.operator,
      from: bus.from,
      to: bus.to,
      departureTime: bus.departureTime,
      arrivalTime: bus.arrivalTime,
      price: bus.price.toString(),
      totalSeats: bus.totalSeats.toString(),
      amenities: bus.amenities,
      rating: bus.rating,
      date: bus.date,
    });

    setShowAddBusForm(true);
  };

  const handleUpdateBus = async (e) => {
    e.preventDefault();
    if (editingBus && busForm.name && busForm.from && busForm.to) {
      const updatedBus = {
        ...busForm,
        price: parseFloat(busForm.price),
        totalSeats: parseInt(busForm.totalSeats),
        availableSeats:
          editingBus.availableSeats +
          (parseInt(busForm.totalSeats) - editingBus.totalSeats),
        rating: parseFloat(busForm.rating),
      };
      console.log(updatedBus);
      const { id, _id, ...payload } = updatedBus;
      const response = await axios.put(
        `https://bus-ticketing-backend.onrender.com/auth/busOperator/updateBus/${_id}`,
        payload,
        { withCredentials: true }
      );
      console.log(response);
      updateBus(editingBus._id, updatedBus);
      setShowAddBusForm(false);
      setEditingBus(null);
      resetForm();
    }
  };
  const deleteBus = async (busId) => {
    setBuses(buses.filter((bus) => bus.id !== busId));
    const response = await axios.delete(
      `https://bus-ticketing-backend.onrender.com/auth/busOperator/delete/${busId}`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
  };
  const handleAmenityToggle = (amenity) => {
    const updatedAmenities = busForm.amenities.includes(amenity)
      ? busForm.amenities.filter((a) => a !== amenity)
      : [...busForm.amenities, amenity];
    setBusForm({ ...busForm, amenities: updatedAmenities });
  };

  const totalRevenue = bookings.reduce(
    (sum, booking) => sum + booking.totalAmount,
    0
  );
  const totalBookings = bookings.length;
  const operatorBuses = buses.length;

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
              <Bus className="h-8 w-8 text-green-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Operator Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Building2 className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                  {currentUser?.name}
                </span>
              </div>
              <button
                onClick={() => {
                  setShowAddBusForm(true);
                  setEditingBus(null);
                  resetForm();
                }}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span className="hidden sm:block">Add Bus</span>
              </button>
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
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Revenue
                </p>
                <p className="text-3xl font-bold text-green-600">
                  ${totalRevenue}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Bookings
                </p>
                <p className="text-3xl font-bold text-blue-600">
                  {totalBookings}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Buses
                </p>
                <p className="text-3xl font-bold text-purple-600">
                  {operatorBuses}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Bus className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Bus Management */}
        <div className="bg-white rounded-2xl shadow-sm mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Manage Buses</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Bus Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Route
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Schedule
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Occupancy
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {buses.map((bus) => (
                  <tr key={bus._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">
                          {bus.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {bus.operator}
                        </div>
                        <div className="flex items-center mt-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 ml-1">
                            {bus.rating}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>
                          {bus.from} → {bus.to}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>
                            {bus.departureTime} - {bus.arrivalTime}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 mt-1">
                          <Calendar className="h-4 w-4" />
                          <span>{bus.date}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="text-gray-900 font-medium">
                          {bus.totalSeats - bus.availableSeats}/{bus.totalSeats}
                        </div>
                        <div className="text-gray-600">
                          {bus.availableSeats} available
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        ${bus.price}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditBus(bus)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteBus(bus._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {buses.length === 0 && (
            <div className="text-center py-12">
              <Bus className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No buses added yet
              </h3>
              <p className="text-gray-600">
                Start by adding your first bus to the fleet
              </p>
            </div>
          )}
        </div>

        {/* Recent Bookings */}
        {bookings.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                Recent Bookings
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                      Booking ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                      Passenger
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                      Bus
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
                  {bookings.slice(0, 10).map((booking) => {
                    const bus = buses.find((b) => b.id === booking.busId);
                    return (
                      <tr key={booking.id}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          #{booking.id.slice(-8)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <div className="font-medium text-gray-900">
                              {booking.passengerName}
                            </div>
                            <div className="text-gray-600">
                              {booking.passengerEmail}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {bus?.name || "N/A"}
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
        )}
      </div>

      {/* Add/Edit Bus Modal */}
      {showAddBusForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {editingBus ? "Edit Bus" : "Add New Bus"}
                </h3>
                <button
                  onClick={() => {
                    setShowAddBusForm(false);
                    setEditingBus(null);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <form
                onSubmit={editingBus ? handleUpdateBus : handleAddBus}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bus Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={busForm.name}
                      onChange={(e) =>
                        setBusForm({ ...busForm, name: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Operator *
                    </label>
                    <input
                      type="text"
                      required
                      value={busForm.operator}
                      onChange={(e) =>
                        setBusForm({ ...busForm, operator: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      From *
                    </label>
                    <input
                      type="text"
                      required
                      value={busForm.from}
                      onChange={(e) =>
                        setBusForm({ ...busForm, from: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      To *
                    </label>
                    <input
                      type="text"
                      required
                      value={busForm.to}
                      onChange={(e) =>
                        setBusForm({ ...busForm, to: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Departure Time *
                    </label>
                    <input
                      type="time"
                      required
                      value={busForm.departureTime}
                      onChange={(e) =>
                        setBusForm({
                          ...busForm,
                          departureTime: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Arrival Time *
                    </label>
                    <input
                      type="time"
                      required
                      value={busForm.arrivalTime}
                      onChange={(e) =>
                        setBusForm({ ...busForm, arrivalTime: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price ($) *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={busForm.price}
                      onChange={(e) =>
                        setBusForm({ ...busForm, price: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Seats *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      max="60"
                      value={busForm.totalSeats}
                      onChange={(e) =>
                        setBusForm({ ...busForm, totalSeats: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rating
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      step="0.1"
                      value={busForm.rating}
                      onChange={(e) =>
                        setBusForm({ ...busForm, rating: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={busForm.date}
                      onChange={(e) =>
                        setBusForm({ ...busForm, date: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Amenities
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {availableAmenities.map((amenity) => (
                      <label
                        key={amenity}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={busForm.amenities.includes(amenity)}
                          onChange={() => handleAmenityToggle(amenity)}
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <span className="text-sm text-gray-700">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddBusForm(false);
                      setEditingBus(null);
                      resetForm();
                    }}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    {editingBus ? "Update Bus" : "Add Bus"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OperatorDashboard;
