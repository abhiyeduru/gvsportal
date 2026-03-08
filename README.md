# 🎓 Gravity Job Portal

> A comprehensive job portal platform connecting teachers with educational institutions and tutoring opportunities.

![Gravity Portal](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Version](https://img.shields.io/badge/Version-2.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 🌟 Features

### 👨‍🏫 For Teachers
- **Job Discovery** - Browse and search teaching positions
- **Application System** - Complete application process with resume upload
- **My Classes Dashboard** - Manage students, requests, and opportunities
- **Analytics** - Track profile views, applications, and success metrics
- **Messaging** - Communicate with parents and institutions
- **Profile Management** - Comprehensive profile with skills and experience

### 🏫 For Schools/Institutions  
- **Job Posting** - Post teaching positions and requirements
- **Candidate Management** - Review applications and manage hiring
- **Company Profiles** - Showcase institution information
- **Application Tracking** - Monitor hiring pipeline

### 👨‍👩‍👧‍👦 For Parents
- **Teacher Discovery** - Find qualified tutors and teachers
- **Booking System** - Request and book tutoring sessions
- **Reviews & Ratings** - Rate and review teaching experiences
- **Communication** - Direct messaging with teachers

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (v5 or higher)
- AWS S3 account (for file uploads)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/abhiyeduru/gravity-job-portal.git
cd gravity-job-portal
```

2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Install frontend dependencies**
```bash
cd ../client
npm install
```

4. **Environment Setup**
```bash
# Backend environment (.env)
cd ../backend
cp .env.example .env
# Edit .env with your configuration
```

5. **Start the application**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd client
npm run dev
```

6. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

---

## 🏗️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Recharts** - Interactive charts and analytics
- **React Router** - Client-side routing
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **Multer** - File upload handling
- **AWS S3** - File storage
- **Socket.io** - Real-time communication

---

## 📱 Screenshots

### Teacher Dashboard
![Teacher Dashboard](./screenshots/teacher-dashboard.png)

### Job Application Form
![Job Application](./screenshots/job-application.png)

### My Classes Page
![My Classes](./screenshots/my-classes.png)

---

## 🎨 Design System

### Color Palette
```css
--primary-purple: #5B2EFF
--secondary-purple: #7B61FF
--accent-green: #30C48D
--accent-orange: #FFA500
--background: #F5F6FA
--card-background: #FFFFFF
```

### Typography
- **Font Family:** Inter
- **Headings:** Bold, 24-32px
- **Body:** Regular, 14-16px
- **Small:** 12-14px

---

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
# Database
MONGODB_URI=mongodb://localhost:27017/gravity-portal

# JWT
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRES_IN=7d

# AWS S3
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=your-region
AWS_S3_BUCKET=your-bucket-name

# Server
PORT=8000
NODE_ENV=development
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=Gravity Portal
```

---

## 📚 API Documentation

### Authentication
```bash
# Register
POST /api/auth/register
Content-Type: application/json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "teacher"
}

# Login
POST /api/auth/login
Content-Type: application/json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Jobs
```bash
# Get all jobs
GET /api/jobs?limit=10&page=1

# Get job details
GET /api/jobs/:jobId/job-data

# Apply for job
POST /api/jobs/:jobId/apply
Authorization: Bearer <token>
Content-Type: application/json
{
  "coverLetter": "I am interested...",
  "expectedSalary": 50000,
  "resumeUrl": "https://s3.amazonaws.com/...",
  "applicantDetails": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phoneNumber": "+1234567890"
  }
}
```

### File Upload
```bash
# Upload file
POST /api/upload/single
Authorization: Bearer <token>
Content-Type: multipart/form-data
file: <file-data>
```

---

## 🧪 Testing

### Manual Testing
```bash
# Test user registration
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test User","email":"test@example.com","password":"password123","role":"teacher"}'

# Test login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Automated Testing
```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd client
npm test
```

---

## 🚀 Deployment

### Production Build
```bash
# Build frontend
cd client
npm run build

# Start production server
cd ../backend
npm start
```

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up --build
```

### Environment Setup
1. Set up MongoDB Atlas or local MongoDB
2. Configure AWS S3 bucket with proper permissions
3. Set environment variables for production
4. Configure domain and SSL certificates

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow ESLint configuration
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Abhi Yeduru**
- GitHub: [@abhiyeduru](https://github.com/abhiyeduru)
- Email: abhiyeduru8@gmail.com
- LinkedIn: [Abhi Yeduru](https://linkedin.com/in/abhiyeduru)

---

## 🙏 Acknowledgments

- React team for the amazing framework
- MongoDB team for the robust database
- AWS for reliable cloud services
- All contributors and testers

---

## 📊 Project Stats

- **Lines of Code:** 50,000+
- **Components:** 25+ React components
- **API Endpoints:** 30+ REST endpoints
- **Database Models:** 15+ Mongoose models
- **Features:** 20+ major features

---

## 🔮 Roadmap

### Q2 2026
- [ ] Mobile app development (React Native)
- [ ] Advanced analytics dashboard
- [ ] AI-powered job matching
- [ ] Video interview integration

### Q3 2026
- [ ] Multi-language support
- [ ] Advanced search filters
- [ ] Payment processing
- [ ] Notification system

### Q4 2026
- [ ] Machine learning recommendations
- [ ] Advanced reporting
- [ ] Third-party integrations
- [ ] Performance optimizations

---

**⭐ If you find this project helpful, please give it a star!**

---

*Built with ❤️ by Abhi Yeduru*