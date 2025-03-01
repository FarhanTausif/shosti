// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { AdminLoginForm } from './components/AdminLoginForm';

// const AdminLoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
    
//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Store token and redirect based on role
//         localStorage.setItem('accessToken', data.accessToken);
        
//         if (data.role === 'general-admin') {
//           router.push('/admin/general-dashboard');
//         } else if (data.role === 'mh-admin') {
//           router.push('/admin/mh-dashboard');
//         }
//       } else {
//         setError(data.message || 'Authentication failed');
//       }
//     } catch (err) {
//       setError('Failed to connect to server');
//     }
//   };

//   return (
//     <AdminLoginForm
//       email={email}
//       password={password}
//       error={error}
//       handleEmailChange={(e) => setEmail(e.target.value)}
//       handlePasswordChange={(e) => setPassword(e.target.value)}
//       handleSubmit={handleSubmit}
//     />
//   );
// };

// export default AdminLoginPage;
// admin/page.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminLoginForm } from './components/AdminLoginForm';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
         console.log(data);
      if (response.ok) {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('userName', data.userName);
        if (data.role === 'general-admin') {
          router.push(`/admin/dashboard/general-admin/${data.userName}`);
          // router.push(`admin/general-dashboard`)
        } else if (data.role === 'mh-admin') {
          router.push(`/admin/dashboard/mh-admin/${data.userName}`);
        }
      } else {
        setError(data.message || 'Authentication failed');
      }
    } catch (err) {
      setError('Failed to connect to server');
    }
  };

  return (
    <AdminLoginForm
      email={email}
      password={password}
      error={error}
      handleEmailChange={(e) => setEmail(e.target.value)}
      handlePasswordChange={(e) => setPassword(e.target.value)}
      handleSubmit={handleSubmit}
    />
  );
};

export default AdminLoginPage;
