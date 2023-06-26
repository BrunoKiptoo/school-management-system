

// import React, { useState, useEffect } from 'react';

// function StudentManagement() {
//   const [studentList, setStudentList] = useState([]);
//   const [selectedStudent, setSelectedStudent] = useState(null);

//   useEffect(() => {
//     fetchStudentList();
//   }, []);

//   const fetchStudentList = async () => {
//     try {
//       const response = await fetch('http://localhost:3000/students');
//       const data = await response.json();
//       setStudentList(data);
//     } catch (error) {
//       console.error('Error fetching student list:', error);
//     }
//   };

//   const handleStudentClick = (student) => {
//     setSelectedStudent(student);
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-900">
//       <div className="flex w-full max-w-4xl p-4 bg-gray-800 rounded-lg">
//         <div className="w-1/3 pr-4">
//           <h1 className="text-2xl font-semibold text-white mb-4">Student List</h1>
//           {studentList && studentList.length > 0 ? (
//             <div className="space-y-4">
//               {studentList.map((student) => (
//                 <div
//                   key={student.id}
//                   className="bg-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-600"
//                   onClick={() => handleStudentClick(student)}
//                 >
//                   <h2 className="text-lg font-semibold text-white">{student.name}</h2>
//                   <p className="text-sm text-gray-300">Grade: {student.grade}</p>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-white">Loading student list...</p>
//           )}
//         </div>
//         <div className="w-2/3 pl-4">
//           {selectedStudent ? (
//             <div className="bg-gray-700 rounded-lg p-4">
//               <div className="flex items-center">
//                 <img
//                   src={selectedStudent.image}
//                   alt={selectedStudent.name}
//                   className="w-1/2 h-auto mr-4"
//                 />
//                 <div className="w-1/2">
//                   <h2 className="text-lg font-semibold text-white">{selectedStudent.name}</h2>
//                   <p className="text-sm text-gray-300">Grade: {selectedStudent.grade}</p>
//                   <div className="mt-2">
//                     <h3 className="text-sm font-semibold text-white">Guardians:</h3>
//                     <ul className="pl-4 mt-1 space-y-1">
//                       {selectedStudent.guardians.map((guardian, index) => (
//                         <li key={index} className="text-xs text-gray-300">
//                           {guardian.name} - {guardian.relationship}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                   <div className="mt-2">
//                     <h3 className="text-sm font-semibold text-white">Profile:</h3>
//                     <p className="text-xs text-gray-300">
//                       Age: {selectedStudent.profile.age} | Gender: {selectedStudent.profile.gender}
//                     </p>
//                     <p className="text-xs text-gray-300">Address: {selectedStudent.profile.address}</p>
//                     <p className="text-xs text-gray-300">Phone: {selectedStudent.profile.phone}</p>
//                   </div>
//                   <div className="mt-2">
//                     <h3 className="text-sm font-semibold text-white">Attendance:</h3>
//                     <p className="text-xs text-gray-300">
//                       Days Present: {selectedStudent.attendance.daysPresent} | Days Absent:{' '}
//                       {selectedStudent.attendance.daysAbsent} | Days Tardy: {selectedStudent.attendance.daysTardy}
//                     </p>
//                   </div>
//                   <div className="mt-2">
//                     <h3 className="text-sm font-semibold text-white">Grades:</h3>
//                     <p className="text-xs text-gray-300">
//                       Math: {selectedStudent.grades.math} | Science: {selectedStudent.grades.science} | English:{' '}
//                       {selectedStudent.grades.english}
//                     </p>
//                   </div>
//                   <div className="mt-2">
//                     <h3 className="text-sm font-semibold text-white">Discipline:</h3>
//                     <p className="text-xs text-gray-300">
//                       Warnings: {selectedStudent.discipline.warnings} | Suspensions:{' '}
//                       {selectedStudent.discipline.suspensions}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <p className="text-white">Select a student to view details.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default StudentManagement;

import React, { useState, useEffect } from 'react';

function StudentManagement() {
  const [studentList, setStudentList] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    fetchStudentList();
  }, []);

  const fetchStudentList = async () => {
    try {
      const response = await fetch('http://localhost:3000/students');
      const data = await response.json();
      setStudentList(data);
    } catch (error) {
      console.error('Error fetching student list:', error);
    }
  };

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      {/* Student List Container */}
      <div className="w-1/3 pr-4">
        <h1 className="text-2xl font-semibold text-white mb-4">Student List</h1>
        <div className="space-y-4">
          {studentList && studentList.length > 0 ? (
            studentList.map((student) => (
              <div
                key={student.id}
                className="bg-purple-900 rounded-lg p-4 cursor-pointer hover:bg-purple-800"
                onClick={() => handleStudentClick(student)}
              >
                <h2 className="text-lg font-semibold text-white">{student.name}</h2>
                <p className="text-sm text-gray-300">Grade: {student.grade}</p>
              </div>
            ))
          ) : (
            <p className="text-white">Loading student list...</p>
          )}
        </div>
      </div>

      {/* Modal Container */}
      <div className=" pl-4">
        {selectedStudent ? (
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center">
              <img
                src={selectedStudent.image}
                alt={selectedStudent.name}
                className="w-1/2 h-auto mr-4"
              />
              <div className="w-1/2">
                <h2 className="text-3xl font-semibold text-purple-400 mb-2">{selectedStudent.name}</h2>
                <p className="text-lg text-gray-300">Grade: {selectedStudent.grade}</p>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-white">Guardians:</h3>
                  <ul className="pl-4 mt-1 space-y-2">
                    {selectedStudent.guardians.map((guardian, index) => (
                      <li key={index} className="text-base text-gray-300">
                        {guardian.name} - {guardian.relationship}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-white">Profile:</h3>
                  <p className="text-base text-gray-300">
                    Age: {selectedStudent.profile.age} | Gender: {selectedStudent.profile.gender}
                  </p>
                  <p className="text-base text-gray-300">Address: {selectedStudent.profile.address}</p>
                  <p className="text-base text-gray-300">Phone: {selectedStudent.profile.phone}</p>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-white">Attendance:</h3>
                  <p className="text-base text-gray-300">
                    Days Present: {selectedStudent.attendance.daysPresent} | Days Absent:{' '}
                    {selectedStudent.attendance.daysAbsent} | Days Tardy: {selectedStudent.attendance.daysTardy}
                  </p>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-white">Grades:</h3>
                  <p className="text-base text-gray-300">
                    Math: {selectedStudent.grades.math} | Science: {selectedStudent.grades.science} | English:{' '}
                    {selectedStudent.grades.english}
                  </p>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-white">Discipline:</h3>
                  <p className="text-base text-gray-300">
                    Warnings: {selectedStudent.discipline.warnings} | Suspensions:{' '}
                    {selectedStudent.discipline.suspensions}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-white">Select a student to view details.</p>
        )}
      </div>
    </div>
  );
}

export default StudentManagement;
