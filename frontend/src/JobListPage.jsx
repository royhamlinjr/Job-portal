import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import API_BASE_URL from './api';

export default function JobListPage() {

  const [jobs, setJobs] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const username = localStorage.getItem('username') || 'Guest';

  useEffect(() => {
    fetch(`${API_BASE_URL}/jobs`)
      .then(res => res.json())
      .then(setJobs)
      .catch(err => console.error('Error fetching jobs:', err));
  },[])
    
  return (
    <div className="min-h-screen flex flex-col">
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
        <span className="hidden sm:block text-xs sm:text-sm text-gray-600">Hello, {username}</span>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-700 text-xs sm:text-sm font-semibold text-white">
          {username.charAt(0).toUpperCase()}
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

    <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-6 sm:py-8 flex-1">
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold">Recommended Jobs</h2>
        <p className="mt-1 text-xs sm:text-sm text-gray-500">Jobs based on your profile and preferences</p>
      </div>

      <div className="space-y-4">
        {/* Job Card */}
        {jobs.length == 0 ? (
          <p className="text-center text-sm text-gray-500">No jobs found.</p>
        ) : jobs.map(job => (
        <div key={job.id} className="rounded-lg border bg-white p-4 sm:p-5 transition hover:shadow-md">
          <h3 className="text-base sm:text-lg font-semibold text-blue-700">{job.title}</h3>
          <p className="mt-1 text-xs sm:text-sm text-gray-700">{job.company}</p>
          <p className='text-gray-700 text-xs'>{new Date(job.posted_on).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
          <div className="mt-3 flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
            <span className="rounded bg-gray-100 px-2 py-1">📍 {job.location}</span>
            <span className="rounded bg-gray-100 px-2 py-1">💰 {job.salary_range}</span>
            <span className="rounded bg-gray-100 px-2 py-1">🕒 Full Time</span>
          </div>
          <div className="mt-4 flex justify-end">
            <NavLink to={`/apply/${job.id}`} className="text-xs sm:text-sm font-medium text-blue-700 hover:underline">View Details →</NavLink>
          </div>
        </div>
        ))}
      </div>
    </main>

    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 sm:py-6 text-center text-xs sm:text-sm text-gray-500">
        © 2026 JobPortal.com | All rights reserved
      </div>
    </footer>
    </div>
  )
}
