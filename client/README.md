# LinkedIn-like Community Platform

A modern community platform built with Next.js that provides LinkedIn-like functionality for users to connect, share posts, and interact with each other.

## 🚀 Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui components
- **HTTP Client**: Axios
- **State Management**: React Context + LocalStorage
- **Authentication**: JWT tokens stored in localStorage
- **Language**: JavaScript (ES6+)

## ✨ Features

- **User Authentication**: Register and login functionality
- **Public Feed**: View all posts from community members
- **Create Posts**: Share text-based posts with the community
- **User Profiles**: View user details and their posts
- **Responsive Design**: Mobile-friendly interface
- **Real-time Updates**: Posts appear immediately after creation

## 📱 Pages

1. **Register Page** (`/register`) - User registration form
2. **Login Page** (`/login`) - User authentication
3. **Feed Page** (`/feed`) - Main community feed with post creation
4. **Profile Page** (`/profile/[id]`) - User profile and their posts

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ installed
- Backend API running (see API endpoints below)

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd linkedin-community-frontend
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Configure API Base URL**
   Update the API base URL in \`lib/axios.js\`:
   \`\`\`javascript
   const API_BASE_URL = 'https://your-backend-api.com/api/v1';
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open your browser**
   Navigate to \`http://localhost:3000\`

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## 🔌 API Integration

The frontend integrates with the following backend endpoints:

- \`POST /api/v1/auth/register\` - User registration
- \`POST /api/v1/auth/login\` - User authentication
- \`GET /api/v1/posts\` - Fetch all posts
- \`POST /api/v1/posts\` - Create new post
- \`GET /api/v1/user/:id\` - Get user profile
- \`GET /api/v1/user/:id/posts\` - Get user's posts

## 🎨 UI Components

Built with shadcn/ui components for consistent design:
- Cards for posts and forms
- Buttons with loading states
- Input fields with validation
- Avatar components
- Navigation bar
- Responsive layout

## 📱 Mobile Responsiveness

- Responsive navigation that adapts to screen size
- Mobile-optimized forms and layouts
- Touch-friendly interface elements
- Proper spacing and typography scaling

## 🔐 Authentication Flow

1. Users register with username, email, and password
2. Login returns JWT token and user data
3. Token stored in localStorage for persistence
4. Automatic redirect to feed after successful auth
5. Protected routes redirect to login if not authenticated
6. Logout clears stored data and redirects to login

## 🚀 Deployment

### Deploy to Vercel

1. **Connect to Vercel**
   \`\`\`bash
   npm i -g vercel
   vercel
   \`\`\`

2. **Set Environment Variables** (if needed)
   Configure any environment variables in Vercel dashboard

3. **Deploy**
   \`\`\`bash
   vercel --prod
   \`\`\`

## 📁 Project Structure

\`\`\`
├── app/
│   ├── feed/page.js          # Main feed page
│   ├── login/page.js         # Login page
│   ├── register/page.js      # Registration page
│   ├── profile/[id]/page.js  # User profile page
│   ├── layout.js             # Root layout
│   └── page.js               # Home redirect
├── components/
│   ├── Navbar.js             # Navigation component
│   ├── PostCard.js           # Individual post display
│   └── CreatePost.js         # Post creation form
├── contexts/
│   └── AuthContext.js        # Authentication context
├── lib/
│   └── axios.js              # API client configuration
└── README.md
\`\`\`

## 🎯 Demo Credentials

For testing purposes, you can use these demo credentials:
- **Email**: demo@example.com
- **Password**: demo123

## 🔧 Extra Features

- **Auto-redirect**: Automatic navigation based on auth state
- **Error Handling**: Comprehensive error messages and loading states
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Clean UI**: Modern, LinkedIn-inspired interface
- **Real-time Updates**: Posts appear immediately without page refresh

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
