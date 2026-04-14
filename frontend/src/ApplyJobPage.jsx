import React, { useActionState, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import API_BASE_URL from './api';

export default function ApplyJobPage() {

    const [result, formAction, isPending] = useActionState(applyJobAction, null,
      { withpending: true }); 
    
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const {jobId} = useParams();
    const userId = localStorage.getItem('userId');

    async function applyJobAction(_, formData) {
    const res = await fetch(`${API_BASE_URL}/apply`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          job: jobId,
          applicant: userId
        })
    });
    
    const data = await res.json();
    if (res.ok) {
      return {message: data.message, success: true}
    } 
    return {message: data.message, success: false}  
}

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">

  <header className="border-b bg-white">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3">
      <h1 className="text-lg sm:text-xl font-bold text-blue-700">JobPortal</h1>

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
        <a href="#" className="hover:text-blue-700">My Applications</a>
      </nav>

      <div className="flex items-center gap-2 sm:gap-4">
        <span className="hidden sm:block text-xs sm:text-sm text-gray-600">Hello, Roy</span>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-700 text-xs sm:text-sm font-semibold text-white">
          L
        </div>
      </div>
    </div>

    {mobileMenuOpen && (
      <div className="md:hidden border-t bg-white">
        <nav className="px-4 py-3 space-y-2 text-sm font-medium text-gray-700">
          <a href="#" className="block px-3 py-2 rounded hover:bg-gray-100 hover:text-blue-700">Jobs</a>
          <a href="#" className="block px-3 py-2 rounded hover:bg-gray-100 hover:text-blue-700">Companies</a>
          <a href="#" className="block px-3 py-2 rounded hover:bg-gray-100 hover:text-blue-700">My Applications</a>
        </nav>
      </div>
    )}
  </header>

  <main className="min-h-[calc(100vh-140px)] px-4 sm:px-6">

    <div className="max-w-7xl mx-auto pt-4 sm:pt-6">
      <NavLink
        to="/jobs"
        className="inline-flex items-center gap-2 mb-4
               text-xs sm:text-sm font-medium text-blue-600
               hover:text-blue-700 hover:underline"
      >
        ← Back to Jobs
      </NavLink>
    </div>

    <div className="flex items-center justify-center py-6 sm:py-10">
      <div className="w-full max-w-md rounded-lg border bg-white p-4 sm:p-6">

        <h2 className="text-base sm:text-lg font-semibold text-gray-900">
          Apply for this job
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-gray-500">
          Your profile will be shared with the recruiter
        </p>

        <form action={formAction} className="mt-5 space-y-4">

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-700 py-2.5
                   font-semibold text-white text-sm
                   hover:bg-blue-800
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
           {isPending ? "Applying..." : "Apply Now"}
          </button>

          { result && <p className={`text-center text-xs sm:text-sm  ${result.success ? 'text-green-600' : 'text-red-600'}`}>
            {result.message}
          </p> }

        </form>
      </div>
    </div>

  </main>

  <footer className="border-t bg-white mt-8 sm:mt-12">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 sm:py-6 text-center text-xs sm:text-sm text-gray-500">
      © 2026 JobPortal.com | All rights reserved
    </div>
  </footer>

    </div>

  )
}
