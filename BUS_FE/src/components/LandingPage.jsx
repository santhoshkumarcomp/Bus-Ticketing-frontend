import React, { useState } from 'react';
import { Bus, Users, Building2, ArrowRight, MapPin, Clock, Shield, Star, CheckCircle, Award, Globe, Headphones } from 'lucide-react';
import LoginModal from './LoginModal';

function LandingPage({ onNavigate, onLogin, onRegister }) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginUserType, setLoginUserType] = useState(null);

  const handleUserLogin = () => {
    setLoginUserType('user');
    setShowLoginModal(true);
  };

  const handleOperatorLogin = () => {
    setLoginUserType('operator');
    setShowLoginModal(true);
  };

  const handleLoginSuccess = (user, type) => {
    setShowLoginModal(false);
    onLogin(user, type);
    onNavigate(type);
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
    setLoginUserType(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Bus className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">BusBook</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Features</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Your Journey Starts Here
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Book bus tickets instantly or manage your fleet with our comprehensive platform. 
              Safe, reliable, and convenient travel solutions for everyone.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleUserLogin}
                className="group bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all duration-300 flex items-center space-x-3 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Users className="h-6 w-6" />
                <span>Start Booking</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={handleOperatorLogin}
                className="group bg-green-600 text-white px-8 py-4 rounded-xl hover:bg-green-700 transition-all duration-300 flex items-center space-x-3 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Building2 className="h-6 w-6" />
                <span>Operator Dashboard</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">50,000+</h3>
              <p className="text-gray-600">Happy Passengers</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bus className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">500+</h3>
              <p className="text-gray-600">Bus Operators</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">200+</h3>
              <p className="text-gray-600">Cities Connected</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose BusBook?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of bus travel with our innovative platform designed for both passengers and operators.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Instant Booking</h3>
              <p className="text-gray-600">
                Book your tickets in seconds with our streamlined booking process. No waiting, no hassle.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Secure Payments</h3>
              <p className="text-gray-600">
                Your transactions are protected with bank-level security and encryption.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                <Star className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Premium Experience</h3>
              <p className="text-gray-600">
                Enjoy comfortable journeys with verified operators and quality service.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Globe className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Wide Network</h3>
              <p className="text-gray-600">
                Connect to over 200 cities with our extensive network of trusted operators.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <Award className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quality Assured</h3>
              <p className="text-gray-600">
                All our partner operators are verified and maintain high service standards.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <Headphones className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">24/7 Support</h3>
              <p className="text-gray-600">
                Get help whenever you need it with our round-the-clock customer support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For Passengers Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                For Passengers
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Discover a new way to travel with comfort, convenience, and confidence.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Search & Book</h3>
                    <p className="text-gray-600">Find and book the perfect bus for your journey in just a few clicks.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Updates</h3>
                    <p className="text-gray-600">Get live updates on your booking status and bus location.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Flexible Cancellation</h3>
                    <p className="text-gray-600">Cancel or modify your booking with our flexible policies.</p>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleUserLogin}
                className="mt-8 bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-colors flex items-center space-x-3 text-lg font-semibold"
              >
                <Users className="h-6 w-6" />
                <span>Start Your Journey</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Passenger Benefits</h3>
              </div>
              
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>Instant booking confirmation</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>Multiple payment options</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>Booking history & receipts</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>Customer support chat</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>Loyalty rewards program</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* For Operators Section */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Operator Benefits</h3>
                </div>
                
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Fleet management dashboard</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Real-time booking analytics</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Revenue tracking & reports</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Customer management tools</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Marketing & promotion tools</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                For Bus Operators
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Grow your business with our comprehensive operator platform and reach more customers.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Manage Your Fleet</h3>
                    <p className="text-gray-600">Add, edit, and manage your buses with our intuitive dashboard.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Track Performance</h3>
                    <p className="text-gray-600">Monitor bookings, revenue, and customer satisfaction in real-time.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Expand Your Reach</h3>
                    <p className="text-gray-600">Connect with thousands of passengers across our network.</p>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleOperatorLogin}
                className="mt-8 bg-green-600 text-white px-8 py-4 rounded-xl hover:bg-green-700 transition-colors flex items-center space-x-3 text-lg font-semibold"
              >
                <Building2 className="h-6 w-6" />
                <span>Join as Operator</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers and operators who trust BusBook for their travel needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleUserLogin}
              className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center space-x-3 text-lg font-semibold"
            >
              <Users className="h-6 w-6" />
              <span>Book Your Ticket</span>
            </button>
            
            <button
              onClick={handleOperatorLogin}
              className="bg-green-600 text-white px-8 py-4 rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center space-x-3 text-lg font-semibold"
            >
              <Building2 className="h-6 w-6" />
              <span>Become an Operator</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Bus className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold">BusBook</span>
              </div>
              <p className="text-gray-400">
                Your trusted partner for safe and comfortable bus travel across the country.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">For Passengers</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Book Tickets</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Manage Bookings</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Travel Insurance</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">For Operators</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Partner with Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Operator Dashboard</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Business Solutions</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>📧 support@busbook.com</li>
                <li>📞 1-800-BUS-BOOK</li>
                <li>📍 123 Travel Street, City</li>
                <li>🕒 24/7 Customer Support</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 BusBook. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal
          userType={loginUserType}
          onClose={handleCloseModal}
          onLogin={handleLoginSuccess}
          onRegister={onRegister}
        />
      )}
    </div>
  );
}

export default LandingPage;