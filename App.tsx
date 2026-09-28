import React, { lazy, Suspense } from 'react';
    import '@radix-ui/themes/styles.css';
    import { Theme } from '@radix-ui/themes';
    import { ToastContainer } from 'react-toastify';
    import 'react-toastify/dist/ReactToastify.css';
    import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

    const Home = lazy(() => import('./src/pages/Home.tsx'));
    const Login = lazy(() => import('./src/pages/Login.tsx'));
    const Register = lazy(() => import('./src/pages/Register.tsx'));
    const Dashboard = lazy(() => import('./src/pages/Dashboard.tsx'));
    const Chat = lazy(() => import('./src/pages/Chat.tsx'));
    const Wheel = lazy(() => import('./src/pages/Wheel.tsx'));
    const Admin = lazy(() => import('./src/pages/Admin.tsx'));
    const Features = lazy(() => import('./src/pages/Features.tsx'));
    const Status = lazy(() => import('./src/pages/Status.tsx'));
    const NotFound = lazy(() => import('./src/pages/NotFound.tsx'));

    const App: React.FC = () => {
      return (
        <Theme appearance="dark" radius="large" scaling="100%">
          <Router>
            <main className="min-h-screen bg-black text-white font-sans">
              <Suspense fallback={<div className="h-screen bg-black flex items-center justify-center font-mono text-green-500 animate-pulse">// LOADING FRAGMENT CS2...</div>}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/wheel" element={<Wheel />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/features" element={<Features />} />
                  <Route path="/status" element={<Status />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
              <ToastContainer
                position="top-right"
                autoClose={3000}
                newestOnTop
                closeOnClick
                pauseOnHover
                theme="dark"
              />
            </main>
          </Router>
        </Theme>
      );
    }

    export default App;