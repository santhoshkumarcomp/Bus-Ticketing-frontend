import React, { useState } from "react";
import {
  Bus,
  User,
  Building2,
  Eye,
  EyeOff,
  Mail,
  Lock,
  Phone,
  UserPlus,
  X,
  CheckCircle,
} from "lucide-react";
import axios from "axios";

function LoginModal({ userType, onClose, onLogin, onRegister }) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (isLogin) {
      const result = await handleLogin(
        formData.email,
        formData.password,
        userType
      );
      if (!result.success) {
        setError(result.message);
      } else {
        onLogin(result.user, userType);
      }
    } else {
      // Registration validation
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      }
      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters");
        setLoading(false);
        return;
      }
      if (!formData.name.trim()) {
        setError("Name is required");
        setLoading(false);
        return;
      }

      const userData = {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        phone: formData.phone,
        type: userType,
      };

      const result = onRegister(userData);
      if (!result.success) {
        setError(result.message);
      } else {
        setSuccess("Account created successfully! Signing you in...");
        setTimeout(() => {
          onLogin(result.user, userType);
        }, 1500);
      }
    }

    setLoading(false);
  };

  const handleLogin = async (email, password, type) => {
    // Demo users for testing
    const demoUsers = [
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
    ];

    const user = demoUsers.find(
      (u) => u.email === email && u.password === password && u.type === type
    );
    if (type === "operator") {
      const response = await axios.post(
        `https://bus-ticketing-backend.onrender.com/auth/busOperator/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);

      if (response.status === 200) {
        return { success: true, user };
      } else {
        return { success: false, message: "Invalid credentials" };
      }
    } else {
      const response = await axios.post(
        `https://bus-ticketing-backend.onrender.com/auth/user/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);

      if (response.status === 200) {
        return { success: true, user };
      } else {
        return { success: false, message: "Invalid credentials" };
      }
    }
  };

  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
      name: "",
      phone: "",
      confirmPassword: "",
    });
    setError("");
    setSuccess("");
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  const getRoleInfo = () => {
    if (userType === "user") {
      return {
        title: "Passenger Portal",
        subtitle: "Book your next journey",
        icon: User,
        color: "blue",
      };
    } else {
      return {
        title: "Operator Portal",
        subtitle: "Manage your fleet",
        icon: Building2,
        color: "green",
      };
    }
  };

  const roleInfo = getRoleInfo();
  const IconComponent = roleInfo.icon;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-screen overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-3">
              <Bus className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-bold text-gray-900">BusBook</span>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="text-center mb-6">
            <div
              className={`w-16 h-16 bg-${roleInfo.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}
            >
              <IconComponent className={`h-8 w-8 text-${roleInfo.color}-600`} />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {roleInfo.title}
            </h2>
            <p className="text-gray-600">{roleInfo.subtitle}</p>
          </div>

          {/* Login/Register Form */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {isLogin ? "Sign In" : "Create Account"}
            </h3>
            <p className="text-gray-600">
              {isLogin
                ? "Welcome back! Please sign in to continue."
                : "Join us today and start your journey."}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <p className="text-green-600 text-sm">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {userType === "operator" ? "Company Name" : "Full Name"} *
                </label>
                <div className="relative">
                  <UserPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={
                      userType === "operator"
                        ? "Enter company name"
                        : "Enter your full name"
                    }
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={
                    isLogin ? "Enter your password" : "Minimum 6 characters"
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {!isLogin && (
                <p className="text-xs text-gray-500 mt-1">
                  Password must be at least 6 characters long
                </p>
              )}
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Confirm your password"
                  />
                </div>
              </div>
            )}

            {!isLogin && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="text-sm font-medium text-blue-900 mb-2">
                  {userType === "operator"
                    ? "Operator Benefits:"
                    : "User Benefits:"}
                </h4>
                <ul className="text-xs text-blue-700 space-y-1">
                  {userType === "operator" ? (
                    <>
                      <li>• Manage your bus fleet and routes</li>
                      <li>• Track bookings and revenue in real-time</li>
                      <li>• Access detailed analytics and reports</li>
                      <li>• 24/7 customer support</li>
                    </>
                  ) : (
                    <>
                      <li>• Book tickets instantly with confirmation</li>
                      <li>• Access to exclusive deals and discounts</li>
                      <li>• Track your booking history</li>
                      <li>• 24/7 customer support</li>
                    </>
                  )}
                </ul>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || success}
              className={`w-full bg-${roleInfo.color}-600 text-white px-6 py-3 rounded-lg hover:bg-${roleInfo.color}-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2`}
            >
              {success ? (
                <>
                  <CheckCircle className="h-5 w-5" />
                  <span>Success!</span>
                </>
              ) : loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>{isLogin ? "Sign In" : "Create Account"}</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                onClick={toggleMode}
                disabled={loading || success}
                className={`text-${roleInfo.color}-600 hover:text-${roleInfo.color}-700 font-medium`}
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>

          
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
