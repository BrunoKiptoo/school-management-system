// import React, { useState, useEffect } from 'react';

// function TeacherManagement() {
//   const [teacherList, setTeacherList] = useState([]);
//   const [selectedTeacher, setSelectedTeacher] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     fetchTeacherList();
//   }, []);

//   const fetchTeacherList = async () => {
//     try {
//       const response = await fetch('http://localhost:3000/teachers');
//       const data = await response.json();
//       setTeacherList(data);
//     } catch (error) {
//       console.error('Error fetching teacher list:', error);
//     }
//   };

//   const handleTeacherClick = (teacher) => {
//     setSelectedTeacher(teacher);
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const filteredTeacherList = teacherList.filter((teacher) =>
//     teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-900">
//       {/* Teacher List Container */}
//       <div className="w-1/3 pr-4">
//         <h1 className="text-3xl font-semibold text-white mb-4">Teacher List</h1>
//         <div className="flex items-center mb-4">
//           <input
//             type="text"
//             placeholder="Search by name"
//             className="p-2 rounded-l-lg w-full bg-gray-800 text-white focus:outline-none"
//             value={searchTerm}
//             onChange={handleSearchChange}
//           />
//           <button className="bg-purple-900 rounded-r-lg px-4 py-2 text-white font-semibold hover:bg-purple-800 focus:outline-none">
//             Search
//           </button>
//         </div>
//         <div className="max-h-96 overflow-y-auto">
//           {filteredTeacherList.length > 0 ? (
//             filteredTeacherList.map((teacher) => (
//               <div
//                 key={teacher.id}
//                 className="bg-gray-800 rounded-lg p-4 cursor-pointer hover:bg-purple-800 mb-4"
//                 onClick={() => handleTeacherClick(teacher)}
//               >
//                 <h2 className="text-lg font-semibold text-white">{teacher.name}</h2>
//                 <p className="text-sm text-gray-300">Email: {teacher.email}</p>
//               </div>
//             ))
//           ) : (
//             <p className="text-white">No teachers found.</p>
//           )}
//         </div>
//       </div>

//       {/* Modal Container */}
//       <div className="pl-4">
//         {selectedTeacher ? (
//           <div className="bg-gray-800 rounded-lg p-4 flex">
//             <div className="flex items-center">
//               <img
//                 src={selectedTeacher.image}
//                 alt={selectedTeacher.name}
//                 className="w-1/2 h-auto object-cover rounded-l-lg mr-4"
//               />
//               <div>
//                 <h2 className="text-3xl font-semibold text-purple-400 mb-2">{selectedTeacher.name}</h2>
//                 <p className="text-lg text-gray-300">Email: {selectedTeacher.email}</p>
//                 <div className="mt-6">
//                   <h3 className="text-lg font-semibold text-white">Teacher Details:</h3>
//                   <p className="text-base text-gray-300">Phone: {selectedTeacher.phone}</p>
//                   <p className="text-base text-gray-300">Address: {selectedTeacher.address}</p>
//                   <p className="text-base text-gray-300">Teaches: {selectedTeacher.teaches}</p>
//                   <p className="text-base text-gray-300">Class Schedule: {selectedTeacher.schedule}</p>
//                   <p className="text-base text-gray-300">Age: {selectedTeacher.age}</p>
//                   <p className="text-base text-gray-300">Quote: {selectedTeacher.quote}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <p className="text-white">Select a teacher to view details.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default TeacherManagement;



import React, { useState, useEffect } from 'react';

function TeacherManagement() {
  const [teacherList, setTeacherList] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newTeacher, setNewTeacher] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    teaches: '',
    schedule: '',
    age: '',
    quote: ''
  });

  useEffect(() => {
    fetchTeacherList();
  }, []);

  const fetchTeacherList = async () => {
    try {
      const response = await fetch('http://localhost:3000/teachers');
      const data = await response.json();
      setTeacherList(data);
    } catch (error) {
      console.error('Error fetching teacher list:', error);
    }
  };

  const handleTeacherClick = (teacher) => {
    setSelectedTeacher(teacher);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTeacher((prevTeacher) => ({
      ...prevTeacher,
      [name]: value
    }));
  };

  const handleAddTeacher = async () => {
    try {
      const response = await fetch('http://localhost:3000/teachers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTeacher)
      });

      if (response.ok) {
        // Teacher added successfully
        console.log('Teacher added:', newTeacher);

        // Reset the form
        setNewTeacher({
          name: '',
          email: '',
          phone: '',
          address: '',
          teaches: '',
          schedule: '',
          age: '',
          quote: ''
        });

        // Close the form
        toggleFormVisibility();

        // Refresh the teacher list
        fetchTeacherList();
      } else {
        console.error('Failed to add teacher:', response.status);
      }
    } catch (error) {
      console.error('Error adding teacher:', error);
    }
  };

  const filteredTeacherList = teacherList.filter((teacher) =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      {/* Teacher List Container */}
      <div className="w-1/3 pr-4">
        <h1 className="text-3xl font-semibold text-white mb-4">Teacher List</h1>
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Search by name"
            className="p-2 rounded-l-lg w-full bg-gray-800 text-white focus:outline-none"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="bg-purple-900 rounded-r-lg px-4 py-2 text-white font-semibold hover:bg-purple-800 focus:outline-none">
            Search
          </button>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {filteredTeacherList.length > 0 ? (
            filteredTeacherList.map((teacher) => (
              <div
                key={teacher.id}
                className="bg-gray-800 rounded-lg p-4 cursor-pointer hover:bg-purple-800 mb-4"
                onClick={() => handleTeacherClick(teacher)}
              >
                <h2 className="text-lg font-semibold text-white">{teacher.name}</h2>
                <p className="text-sm text-gray-300">Email: {teacher.email}</p>
              </div>
            ))
          ) : (
            <p className="text-white">No teachers found.</p>
          )}
        </div>

        {/* Add Teacher Button */}
        <button
          className="bg-purple-900 rounded-lg px-4 py-2 text-white font-semibold hover:bg-purple-800 focus:outline-none mt-4"
          onClick={toggleFormVisibility}
        >
          Add Teacher
        </button>
      </div>

      {/* Modal Container */}
      <div className="flex flex-col items-center pl-4">
        {selectedTeacher ? (
          <div className="bg-gray-800 rounded-lg p-4 flex">
            <div className="flex items-center">
              <img
                src={selectedTeacher.image}
                alt={selectedTeacher.name}
                className="w-1/2 h-auto object-cover rounded-l-lg mr-4"
              />
              <div>
                <h2 className="text-3xl font-semibold text-purple-400 mb-2">{selectedTeacher.name}</h2>
                <p className="text-lg text-gray-300">Email: {selectedTeacher.email}</p>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-white">Teacher Details:</h3>
                  <p className="text-base text-gray-300">Phone: {selectedTeacher.phone}</p>
                  <p className="text-base text-gray-300">Address: {selectedTeacher.address}</p>
                  <p className="text-base text-gray-300">Teaches: {selectedTeacher.teaches}</p>
                  <p className="text-base text-gray-300">Class Schedule: {selectedTeacher.schedule}</p>
                  <p className="text-base text-gray-300">Age: {selectedTeacher.age}</p>
                  <p className="text-base text-gray-300">Quote: {selectedTeacher.quote}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-white">Select a teacher to view details.</p>
        )}
      </div>

{/* Add Teacher Form */}
{isFormVisible && (
  <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
    <div className="bg-gray-800 rounded-lg p-4 w-96"> {/* Increased width to 96 */}
      <h2 className="text-xl font-semibold text-white mb-4">Add Teacher</h2>
      <div className="grid grid-cols-2 gap-2"> {/* Using grid layout for horizontal alignment */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-300 mb-2" htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={newTeacher.name}
            onChange={handleInputChange}
            className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-300 mb-2" htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={newTeacher.email}
            onChange={handleInputChange}
            className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-300 mb-2" htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={newTeacher.phone}
            onChange={handleInputChange}
            className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-300 mb-2" htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={newTeacher.address}
            onChange={handleInputChange}
            className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-300 mb-2" htmlFor="teaches">Teaches:</label>
          <input
            type="text"
            id="teaches"
            name="teaches"
            value={newTeacher.teaches}
            onChange={handleInputChange}
            className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-300 mb-2" htmlFor="age">Age:</label>
          <input
            type="text"
            id="age"
            name="age"
            value={newTeacher.age}
            onChange={handleInputChange}
            className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-300 mb-2" htmlFor="quote">Quote:</label>
          <input
            type="text"
            id="quote"
            name="quote"
            value={newTeacher.quote}
            onChange={handleInputChange}
            className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-300 mb-2" htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={newTeacher.image}
            onChange={handleInputChange}
            className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
          />
        </div>
      </div>
      <button
        className="bg-purple-900 rounded-lg px-4 py-2 text-white font-semibold hover:bg-purple-800 focus:outline-none mt-4"
        onClick={handleAddTeacher}
      >
        Save Teacher
      </button>
    </div>
  </div>
)}

    </div>
  );
}

export default TeacherManagement;

