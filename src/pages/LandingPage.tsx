import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Apple, 
  Calendar, 
  ShoppingBag, 
  Users, 
  Trophy,
  Star,
  ArrowRight,
  Play,
  CheckCircle,
  Zap,
  Heart,
  Target,
  Award,
  TrendingUp
} from 'lucide-react';

export function LandingPage() {
  const features = [
    {
      icon: Activity,
      title: 'Smart Fitness Tracking',
      description: 'AI-powered workout tracking with real-time form analysis and personalized recommendations',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Apple,
      title: 'Intelligent Nutrition',
      description: 'Personalized meal plans with macro tracking and smart grocery lists',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Calendar,
      title: 'Expert Consultations',
      description: 'Video sessions with certified trainers, nutritionists, and wellness experts',
      color: 'from-purple-500 to-violet-500'
    },
    {
      icon: ShoppingBag,
      title: 'Premium Supplements',
      description: 'Curated supplements with location-based delivery and UPI payments',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Fitness Enthusiast',
      content: 'FitVibe completely transformed my approach to fitness. The AI recommendations are spot-on and the community support is incredible!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      location: 'Mumbai, India'
    },
    {
      name: 'Rajesh Kumar',
      role: 'Software Engineer',
      content: 'The nutrition tracking and supplement recommendations helped me achieve my fitness goals while managing a busy work schedule.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      location: 'Bangalore, India'
    },
    {
      name: 'Priya Sharma',
      role: 'Yoga Instructor',
      content: 'As a fitness professional, I love how FitVibe integrates traditional wellness with modern technology. Perfect for my clients!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      location: 'Delhi, India'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Active Users', icon: Users },
    { number: '1M+', label: 'Workouts Completed', icon: Activity },
    { number: '4.9★', label: 'App Rating', icon: Star },
    { number: '95%', label: 'Success Rate', icon: Trophy }
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Enhanced Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-lg border-b border-gray-100 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gradient">FitVibe</span>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Link to="/auth/login" className="btn-ghost">
                Login
              </Link>
              <Link to="/auth/signup" className="btn-modern">
                Get Started Free
              </Link>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <section className="pt-24 pb-20 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-transparent"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary-200 rounded-full blur-3xl opacity-20 floating-animation"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent-200 rounded-full blur-3xl opacity-15 floating-animation" style={{ animationDelay: '1s' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-primary-600 border border-primary-200 mb-6"
              >
                <Zap className="w-4 h-4 mr-2" />
                India's #1 Fitness App
              </motion.div>
              
              <h1 className="text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
                Transform Your
                <span className="text-gradient block">Fitness Journey</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Experience the future of fitness with AI-powered workouts, personalized nutrition, 
                expert consultations, and premium supplements delivered across India.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to="/auth/signup" className="btn-modern group">
                  Start Your Journey
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="btn-secondary group">
                  <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </button>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="flex items-center justify-center mb-2">
                      <stat.icon className="w-5 h-5 text-primary-500 mr-1" />
                      <span className="text-2xl font-bold text-gray-900">{stat.number}</span>
                    </div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative z-10 glass-card rounded-3xl p-8 pulse-glow">
                <img 
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="FitVibe App Interface"
                  className="rounded-2xl shadow-2xl w-full"
                />
                
                {/* Floating UI Elements */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="absolute -right-4 top-8 bg-white rounded-2xl p-4 shadow-xl border border-gray-100"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Heart className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Heart Rate</p>
                      <p className="text-lg font-bold text-green-500">142 BPM</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="absolute -left-4 bottom-8 bg-white rounded-2xl p-4 shadow-xl border border-gray-100"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Target className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Daily Goal</p>
                      <p className="text-lg font-bold text-blue-500">85% Complete</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Everything You Need for
              <span className="text-gradient block">Complete Wellness</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools powered by AI and backed by expert guidance to transform your health journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="card card-hover text-center h-full">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Loved by Fitness
              <span className="text-gradient block">Enthusiasts Across India</span>
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands who have transformed their lives with FitVibe
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="card card-hover h-full">
                  <div className="flex items-center mb-6">
                    <img 
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover mr-4 ring-4 ring-primary-100"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                      <p className="text-primary-500 text-xs">{testimonial.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 italic leading-relaxed">"{testimonial.content}"</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-white mb-6">
              Ready to Transform Your Life?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join over 50,000 users who have already started their fitness journey with FitVibe. 
              Your transformation begins today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link 
                to="/auth/signup" 
                className="bg-white text-primary-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center group"
              >
                Start Your Free Trial
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <div className="flex items-center text-primary-100">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span>No credit card required</span>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-8 text-primary-100">
              <div className="flex items-center">
                <Award className="w-5 h-5 mr-2" />
                <span>7-day free trial</span>
              </div>
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">FitVibe</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Your ultimate fitness companion for a healthier, stronger you. 
                Transforming lives across India.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold mb-4 text-lg">Features</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">AI Fitness Tracking</li>
                <li className="hover:text-white transition-colors cursor-pointer">Smart Nutrition</li>
                <li className="hover:text-white transition-colors cursor-pointer">Expert Consultations</li>
                <li className="hover:text-white transition-colors cursor-pointer">Premium Supplements</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4 text-lg">Support</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">Help Center</li>
                <li className="hover:text-white transition-colors cursor-pointer">Contact Us</li>
                <li className="hover:text-white transition-colors cursor-pointer">Privacy Policy</li>
                <li className="hover:text-white transition-colors cursor-pointer">Terms of Service</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4 text-lg">Connect</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">Instagram</li>
                <li className="hover:text-white transition-colors cursor-pointer">YouTube</li>
                <li className="hover:text-white transition-colors cursor-pointer">Twitter</li>
                <li className="hover:text-white transition-colors cursor-pointer">LinkedIn</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FitVibe. All rights reserved. Made with ❤️ in India</p>
          </div>
        </div>
      </footer>
    </div>
  );
}