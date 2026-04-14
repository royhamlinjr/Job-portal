import React, { useActionState, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import API_BASE_URL from './api';

async function LoginAction(_, formData) {
    const json = Object.fromEntries(formData);
    const res = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(json),
    });

    const data = await res.json();

    if (res.ok) {
        localStorage.setItem('userId', data.user_id);
        localStorage.setItem('username', data.username);
    }

    return data.message || 'Login Failed'
}
export default function LoginPage() {

  const [message, formAction, isPending] = useActionState(LoginAction, "",
    { withpending: true }); 
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  if (message == 'Login successful') {
    navigate('/jobs');
  }
    
  return (
    <div className="bg-gray-50 text-gray-800">

    <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <div className="text-2xl font-bold text-blue-700">
                JobPortal
            </div>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-700 hover:bg-gray-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
                <a href="#" className="hover:text-blue-700">Jobs</a>
                <a href="#" className="hover:text-blue-700">Companies</a>
                <a href="#" className="hover:text-blue-700">Services</a>
                <a href="#" className="hover:text-blue-700">Register</a>
            </nav>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <nav className="px-4 py-3 space-y-2 text-sm font-medium text-gray-700">
              <a href="#" className="block px-3 py-2 rounded hover:bg-gray-100 hover:text-blue-700">Jobs</a>
              <a href="#" className="block px-3 py-2 rounded hover:bg-gray-100 hover:text-blue-700">Companies</a>
              <a href="#" className="block px-3 py-2 rounded hover:bg-gray-100 hover:text-blue-700">Services</a>
              <NavLink to="/register" className="block px-3 py-2 rounded hover:bg-gray-100 hover:text-blue-700">Register</NavLink>
            </nav>
          </div>
        )}
    </header>

    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
        <section className="block md:block">
            <h1 className="text-2xl sm:text-3xl font-bold leading-snug text-center md:text-left">
                Find your dream job now
            </h1>

            <p className="mt-4 text-gray-600 max-w-md text-center md:text-left mx-auto md:mx-0">
                Register with JobPortal and get matched with the right opportunities.
                Build your profile and apply to jobs in top companies.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-gray-700 text-center md:text-left">
                <li>✔ Trusted by thousands of recruiters</li>
                <li>✔ Personalized job recommendations</li>
                <li>✔ Easy apply & profile visibility</li>
            </ul>
        </section>
        <section>

<h1 className="text-xl sm:text-2xl font-bold text-blue-700 text-center">
    JobPortal
</h1>
<p className="text-xs sm:text-sm text-gray-500 text-center mt-1">
    Login to your account
</p>

<form action={formAction} className="mt-6 space-y-4">

    <div>
        <label className="block text-sm font-medium text-gray-700">
            Username
        </label>
        <input name='username' type="text" placeholder="Enter your username" className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm
                focus:border-blue-600 focus:ring-1 focus:ring-blue-200
                outline-none" />
    </div>

    <div>
        <label className="block text-sm font-medium text-gray-700">
            Password
        </label>
        <input name='password' type="password" placeholder="Enter your password" className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm
                focus:border-blue-600 focus:ring-1 focus:ring-blue-200
                outline-none" />
    </div>

    <div className="text-right">
        <a href="#" className="text-xs sm:text-sm text-blue-700 hover:underline">
            Forgot Password?
        </a>
    </div>

    <button disabled={isPending} type='submit' className="w-full bg-blue-700 hover:bg-blue-800
                text-white font-semibold py-2.5 rounded transition text-sm">
        {isPending ? 'Logging in...' : 'Login'}
    </button>

     <p className="text-center text-xs sm:text-sm text-gray-700">{message}</p>

    <p className="text-xs sm:text-sm text-center text-gray-600">
        New to JobPortal?
        <NavLink to="/register" className="text-blue-700 font-medium hover:underline">
             Register here
        </NavLink>
    </p>
</form>
</section>

    </main>

    <footer className="border-t bg-white mt-8 sm:mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 text-xs sm:text-sm text-gray-500 text-center">
            © 2026 JobPortal.com | All rights reserved
        </div>
    </footer>

    </div>
  )
}

