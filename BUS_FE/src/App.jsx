import React, { useState } from "react";
import {
  Bus,
  Users,
  MapPin,
  Calendar,
  Clock,
  Phone,
  Mail,
  Star,
  ArrowRight,
  LogOut,
} from "lucide-react";
import LandingPage from "./components/LandingPage";
import UserDashboard from "./components/UserDashboard";
import OperatorDashboard from "./components/OperatorDashboard";
import axios from "axios";

function App() {
  const [currentView, setCurrentView] = useState("landing");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userType, setUserType] = useState(null); // 'user' or 'operator'
  const [bookings, setBookings] = useState([]);

  const [users, setUsers] = useState([
    {
      id: "user-1",
      email: "user@example.com",
      password: "password123",
      name: "John Doe",
      phone: "+1-555-0123",
      type: "user",
    },
    {
      id: "operator-1",
      email: "operator@example.com",
      password: "password123",
      name: "Bus Company Ltd",
      phone: "+1-555-0456",
      type: "operator",
    },
  ]);

  const handleLogin = (user, type) => {
    setCurrentUser(user);
    setUserType(type);
    setIsAuthenticated(true);
  };

  const handleRegister = async (userData) => {
    if (userType === "operator") {
      const response = await axios.post(
        `https://bus-ticketing-backend.onrender.com/auth/busOperator/register`,
        {
          name: userData.name,
          email: userData.email,
          password: userData.password,
          phone: userData.phone,
        }
      );
      console.log(response);

      // Validate required fields
      if (!userData.name || !userData.email || !userData.password) {
        return {
          success: false,
          message: "Please fill in all required fields",
        };
      }

      if (userData.password.length < 6) {
        return {
          success: false,
          message: "Password must be at least 6 characters",
        };
      }

      const newUser = {
        id: `${userData.type}-${Date.now()}`,
        ...userData,
        createdAt: new Date().toISOString(),
      };

      setUsers([...users, newUser]);
      return { success: true, user: newUser };
    } else {
      const response = await axios.post(
        `https://bus-ticketing-backend.onrender.com/auth/user/register`,
        {
          name: userData.name,
          email: userData.email,
          password: userData.password,
          phone: userData.phone,
        }
      );
      console.log(response);

      // Validate required fields
      if (!userData.name || !userData.email || !userData.password) {
        return {
          success: false,
          message: "Please fill in all required fields",
        };
      }

      if (userData.password.length < 6) {
        return {
          success: false,
          message: "Password must be at least 6 characters",
        };
      }

      const newUser = {
        id: `${userData.type}-${Date.now()}`,
        ...userData,
        createdAt: new Date().toISOString(),
      };

      setUsers([...users, newUser]);

      return { success: true, user: newUser };
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setUserType(null);
    setIsAuthenticated(false);
    setCurrentView("landing");
  };

  const handleNavigate = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === "landing" && (
        <LandingPage
          onNavigate={handleNavigate}
          onLogin={handleLogin}
          onRegister={handleRegister}
        />
      )}

      {currentView === "user" && isAuthenticated && userType === "user" && (
        <UserDashboard
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          currentUser={currentUser}
        />
      )}

      {currentView === "operator" &&
        isAuthenticated &&
        userType === "operator" && (
          <OperatorDashboard
            bookings={bookings.filter((b) => {
              const bus = buses.find((bus) => bus.id === b.busId);
              return bus?.operatorId === currentUser?.id;
            })}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
            currentUser={currentUser}
          />
        )}
    </div>
  );
}

export default App;
