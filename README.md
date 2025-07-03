# Shosti - Compassion in Every Connection

Shosti is our SPL-2 project that provides a web platform for mental health and well-being. It includes a resource library, session booking, and mindfulness exercises, offering a secure, user-friendly space for individuals, mental health professionals, and administrators to access support and resources.

## Features

- **User Authentication**
  - Separate authentication flows for attendees and mental health professionals
  - Secure password reset functionality
  - Admin dashboard for platform management

- **Real-time Communication**
  - Video calling capabilities for virtual sessions
  - Secure room creation for private consultations
  - Interactive session management

- **Resource Management**
  - Mental health professionals can share educational resources
  - Attendees can access various mental health resources
  - Resource library with categorized content

- **Dashboard Systems**
  - Attendee Dashboard: View professionals, manage sessions, access resources
  - MHP Dashboard: Manage sessions, share resources, handle appointments
  - Admin Dashboard: Overall platform management and monitoring

## Tech Stack

### Frontend
- Next.js 13+ (App Router)
- React
- Tailwind CSS
- Shadcn UI Components
- WebRTC for video calls

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

## Project Structure

```
shosti/
├── client/           # Next.js frontend application
│   ├── app/         # App router pages and layouts
│   ├── components/  # Reusable React components
│   └── lib/        # Utility functions and API handlers
│
└── server/          # Express.js backend application
    ├── controllers/ # Request handlers
    ├── models/      # Database models
    ├── routes/      # API routes
    └── services/    # Business logic and external services
```

## Getting Started

### Prerequisites
- Node.js 16.x or later
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Install frontend dependencies:
```bash
cd client
npm install
```

3. Install backend dependencies:
```bash
cd server
npm install
```

4. Set up environment variables:
   - Copy `example.env` to `.env` in the server directory
   - Configure your environment variables

5. Start the development servers:

Frontend:
```bash
cd client
npm run dev
```

Backend:
```bash
cd server
npm run dev
```

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Backend (.env)
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_SERVICE=your_email_service
EMAIL_USER=your_email_user
EMAIL_PASS=your_email_password
```

## Features in Detail

### For Attendees
- Browse and connect with mental health professionals
- Book and manage virtual sessions
- Access educational resources
- Track progress and session history

### For Mental Health Professionals
- Manage availability and session schedules
- Share educational resources
- Conduct virtual sessions
- Track client interactions

### For Administrators
- Monitor platform activity
- Manage user accounts
- Review and approve MHP applications
- Access analytics and reports

## Security Features
- End-to-end encrypted video calls
- Secure user authentication
- Protected personal information
- Regular security audits

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with Next.js and Express.js
- UI components from Shadcn UI
- Video calling implemented with WebRTC
- Styled with Tailwind CSS
