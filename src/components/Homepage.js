import React from 'react';
import { Link } from 'react-router-dom';

function Homepage() {
  return (
    <div className="bg-gray-900 text-white">
      <header className="bg-black py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">University Management System</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Welcome to the University Management System</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Student Management */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Student Management</h3>
            <p className="text-gray-300">Manage student profiles, attendance, grades, discipline, and communication.</p>
            <Link to="/student-management" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
              Go to Student Management
            </Link>
          </div>

          {/* Teacher Management */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Teacher Management</h3>
            <p className="text-gray-300">Manage teacher profiles, class schedules, grades, and communication.</p>
            <Link to="/teacher-management" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
              Go to Teacher Management
            </Link>
          </div>

          {/* Guardian Management */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Guardian Management</h3>
            <p className="text-gray-300">Manage guardian profiles, payment history, and communication.</p>
            <Link to="/guardian-management" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
              Go to Guardian Management
            </Link>
          </div>

          {/* Attendance Tracking */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Attendance Tracking</h3>
            <p className="text-gray-300">Track student attendance, generate reports, and manage notifications.</p>
            <Link to="/attendance-tracking" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
              Go to Attendance Tracking
            </Link>
          </div>

          {/* Grade Management */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Grade Management</h3>
            <p className="text-gray-300">Manage student grades, progress reports, and perform grade analysis.</p>
            <Link to="/grade-management" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
              Go to Grade Management
            </Link>
          </div>

          {/* Class Scheduling */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Class Scheduling</h3>
            <p className="text-gray-300">Create and manage class schedules, room assignments, and schedule adjustments.</p>
            <Link to="/class-scheduling" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
              Go to Class Scheduling
            </Link>
          </div>

          {/* Course Management */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Course Management</h3>
            <p className="text-gray-300">Manage courses, course materials, assignments, and details.</p>
            <Link to="/course-management" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
              Go to Course Management
            </Link>
          </div>

          {/* Examination and Assessment */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Examination and Assessment</h3>
            <p className="text-gray-300">Manage exams, schedules, grading, and analyze examination results.</p>
            <Link to="/examination-assessment" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
              Go to Examination and Assessment
            </Link>
          </div>

          {/* Communication and Collaboration */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Communication and Collaboration</h3>
            <p className="text-gray-300">Enable internal messaging, announcements, parent-teacher communication, and discussion forums.</p>
            <Link to="/communication-collaboration" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
              Go to Communication and Collaboration
            </Link>
          </div>

          {/* Financial Management */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Financial Management</h3>
            <p className="text-gray-300">Manage fee management, payments, receipts, and financial reports.</p>
            <Link to="/financial-management" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
              Go to Financial Management
            </Link>
          </div>

          {/* Library Management */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Library Management</h3>
            <p className="text-gray-300">Manage library catalog, book borrowing, reservations, and bookkeeping.</p>
            <Link to="/library-management" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
              Go to Library Management
            </Link>
          </div>

          {/* Transportation Management */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Transportation Management</h3>
            <p className="text-gray-300">Manage bus routes, student transportation tracking, and delay notifications.</p>
            <Link to="/transportation-management" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
              Go to Transportation Management
            </Link>
          </div>

          {/* Reporting and Analytics */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Reporting and Analytics</h3>
            <p className="text-gray-300">Generate reports, display dashboard, and visualize data for insights.</p>
            <Link to="/reporting-analytics" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
              Go to Reporting and Analytics
            </Link>
          </div>

          {/* Authentication and User Management */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Authentication and User Management</h3>
            <p className="text-gray-300">Manage user authentication, registration, and user profiles.</p>
            <Link to="/authentication-management" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
              Go to Authentication and User Management
            </Link>
          </div>

          {/* Staff Management */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Staff Management</h3>
            <p className="text-gray-300">Manage staff profiles, attendance, and communication.</p>
            <Link to="/staff-management" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
              Go to Staff Management
            </Link>
          </div>

          {/* Events Management */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Events Management</h3>
            <p className="text-gray-300">Manage event calendars, details, registrations, and attendance.</p>
            <Link to="/events-management" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
              Go to Events Management
            </Link>
          </div>

          {/* Tenders Management */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Tenders Management</h3>
            <p className="text-gray-300">Manage tender listings, details, submissions, evaluations, and awards.</p>
            <Link to="/tenders-management" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
              Go to Tenders Management
            </Link>
          </div>

          {/* Stock Keeping */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Stock Keeping</h3>
            <p className="text-gray-300">Manage stock inventory, items, details, entries, and requests.</p>
            <Link to="/stock-keeping" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
              Go to Stock Keeping
            </Link>
          </div>

          {/* Teacher On-Duty Allocations */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Teacher On-Duty Allocations</h3>
            <p className="text-gray-300">Manage teacher on-duty schedules, allocations, and notifications.</p>
            <Link to="/teacher-on-duty-allocations" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
              Go to Teacher On-Duty Allocations
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Homepage;
