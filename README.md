# FitVibe - Full-Stack Fitness Platform

A comprehensive fitness platform with real-time capabilities, built with React, Node.js, MongoDB, and Socket.io.

## 🚀 Features

### 🔐 Authentication & Authorization
- **Multi-role system**: User, Trainer, Consultant, Vendor, Admin
- **Multiple login methods**: Email/Password, Google OAuth, LinkedIn OAuth, Mobile OTP
- **₹500 Access Pass**: Required for full platform access
- **Protected routes** with role-based permissions

### 💳 Payment Integration
- **Razorpay UPI Integration** for seamless payments
- **Location-based pricing** for products and services
- **Subscription management** with multiple tiers
- **Payment history** and transaction tracking

### 🛒 E-commerce Features
- **Product catalog** with categories and filters
- **Shopping cart** with real-time updates
- **Order management** with tracking
- **Vendor dashboard** for product uploads
- **Location-based delivery** with cost calculation

### 📹 Video Consultations
- **Real-time video calls** with WebRTC
- **Google Meet integration** for professional consultations
- **Minimum ₹500 consultation fee**
- **Booking system** with calendar integration
- **Chat functionality** during consultations

### 👨‍💼 Admin CMS
- **Complete user management**
- **Product approval workflow**
- **Trainer verification system**
- **Order and payment tracking**
- **Real-time analytics dashboard**
- **Notification system**

### 📱 Mobile-Ready PWA
- **Progressive Web App** with offline capabilities
- **Push notifications**
- **App-like experience** on mobile devices
- **Responsive design** for all screen sizes

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Socket.io Client** for real-time features
- **React Query** for data fetching
- **Zustand** for state management
- **PWA** capabilities with Vite

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **Socket.io** for real-time communication
- **JWT** authentication
- **Razorpay** payment integration
- **Cloudinary** for image uploads
- **Nodemailer** for emails
- **Twilio** for SMS

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB
- Razorpay account
- Cloudinary account
- Twilio account (for SMS)
- Gmail account (for emails)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd fitvibe-platform
```

2. **Install dependencies**
```bash
npm run install-all
```

3. **Setup environment variables**
```bash
# Copy server environment file
cp server/.env.example server/.env

# Edit server/.env with your credentials
```

4. **Start the development servers**
```bash
npm run dev
```

This will start:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 📋 Environment Setup

### Required Environment Variables

Create `server/.env` file with:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/fitvibe

# JWT
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# Server
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Twilio
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
```

## 🏗️ Project Structure

```
fitvibe-platform/
├── src/                    # Frontend React app
│   ├── components/         # Reusable components
│   ├── pages/             # Page components
│   ├── services/          # API services
│   ├── store/             # State management
│   ├── hooks/             # Custom hooks
│   └── utils/             # Utility functions
├── server/                # Backend Node.js app
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Express middleware
│   ├── socket/            # Socket.io handlers
│   └── utils/             # Server utilities
└── public/                # Static assets
```

## 🔑 Key Features Implementation

### 1. Access Pass System
- Users must pay ₹500 to access full platform
- Implemented in middleware and frontend guards
- Razorpay integration for payments

### 2. Real-time Features
- Socket.io for live consultations
- Real-time order tracking
- Live workout sessions
- Instant messaging

### 3. Location-based Services
- Products filtered by user location
- Delivery cost calculation
- Regional pricing

### 4. Video Consultations
- WebRTC for peer-to-peer video
- Google Meet integration
- Screen sharing capabilities
- Chat during calls

### 5. Admin Dashboard
- Complete CRUD operations
- Real-time analytics
- User management
- Content moderation

## 📱 Mobile App (PWA)

The app is built as a Progressive Web App (PWA) that provides:
- **App-like experience** on mobile devices
- **Offline functionality** for core features
- **Push notifications** for important updates
- **Add to home screen** capability
- **Fast loading** with service workers

## 🔒 Security Features

- **JWT authentication** with refresh tokens
- **Rate limiting** on API endpoints
- **Input validation** and sanitization
- **CORS protection**
- **Helmet.js** for security headers
- **Password hashing** with bcrypt
- **Role-based access control**

## 🚀 Deployment

### Production Setup

1. **Environment Variables**
```bash
NODE_ENV=production
MONGODB_URI=your_production_mongodb_uri
CLIENT_URL=https://your-domain.com
```

2. **Build the app**
```bash
npm run build
```

3. **Deploy to your preferred platform**
- Vercel/Netlify (Frontend)
- Railway/Heroku (Backend)
- MongoDB Atlas (Database)

## 📊 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/google` - Google OAuth
- `POST /api/auth/linkedin` - LinkedIn OAuth

### Payment Endpoints
- `POST /api/payments/create-access-order` - Create access pass order
- `POST /api/payments/verify-access-payment` - Verify access payment
- `POST /api/payments/create-product-order` - Create product order
- `POST /api/payments/create-consultation-order` - Create consultation order

### Product Endpoints
- `GET /api/products` - Get products with filters
- `POST /api/products` - Create product (vendor/admin)
- `GET /api/products/:id` - Get product details
- `POST /api/products/:id/reviews` - Add product review

### Consultation Endpoints
- `GET /api/consultations` - Get user consultations
- `POST /api/consultations` - Book consultation
- `POST /api/consultations/:id/join` - Join consultation
- `POST /api/consultations/:id/feedback` - Add feedback

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@fitvibe.com or join our Discord community.

---

**FitVibe** - Your ultimate fitness companion! 💪🏃‍♀️🥗