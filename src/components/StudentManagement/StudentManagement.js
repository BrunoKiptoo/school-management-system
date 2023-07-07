
import React, { useState, useEffect } from 'react';

function StudentManagement() {
  const [studentList, setStudentList] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const deleteStudent = (student) => {
    setStudentToDelete(student);
    setIsDeleteModalVisible(true);
  };

  const [newStudent, setNewStudent] = useState({
    name: '', 
    grade: '', 
    image: '',
    guardians: '',
    profile: '',
    attendance: '',
    grades: '', 
    discipline: ''
   
  });

  const [editedStudent, setEditedStudent] = useState({
    name: '', 
    grade: '', 
    image: '',
    guardians: '',
    profile: '',
    attendance: '',
    grades: '', 
    discipline: ''
  });

  const confirmDeleteStudent = async () => {
    try {
      const response = await fetch(`http://localhost:3000/students/${studentToDelete.id}`, {
        method: 'DELETE'
      });
  
      if (response.ok) {
        console.log('Student deleted'); // Log success message
        fetchStudentList(); // Refresh the student list
      } else {
        throw new Error('Failed to delete student');
      }
    } catch (error) {
      console.error(error);
    }
  
    setIsDeleteModalVisible(false); // Close the confirmation modal
    setStudentToDelete(null); // Clear the student to be deleted
  };

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

  const handleEditstudent = async () => {
    try {
      const response = await fetch(`http://localhost:3000/students/${selectedStudent.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedStudent),
      });
  
      if (response.ok) {
        const updatedStudent = await response.json();
        console.log(updatedStudent); // Log the updated student data
        setSelectedStudent(updatedStudent); // Update the selected student with the updated data
        toggleEditFormVisibility(); // Close the edit form
        fetchStudentList(); // Refresh the student list
      } else {
        throw new Error('Failed to edit student');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  
  const toggleAddFormVisibility = () => {
    setIsAddFormVisible(!isAddFormVisible);
    // setnewStudent(prevstudent);
  };

  const toggleEditFormVisibility = () => {
    setIsEditFormVisible(!isEditFormVisible);
    setEditedStudent(selectedStudent); // Initialize the editedStudent state with the selected student's data
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value
    }));
  };

  const handleAddInputChange = (event) => {
    const { name, value } = event.target;
    setNewStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value
    }));
  };

  const handleAddStudent = async () => {
    try {
      const response = await fetch('http://localhost:3000/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newStudent)
      });

      if (response.ok) {
        // student added successfully
        console.log('Student added:', newStudent);

        // Reset the form
        setNewStudent({
          name: '', 
          grade: '', 
          image: '',
          guardians: '',
          profile: '',
          attendance: '',
          grades: '', 
          discipline: ''
        });

        // Close the form
        toggleAddFormVisibility();

        // Refresh the student list
        fetchStudentList();
      } else {
        console.error('Failed to add student:', response.status);
      }
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const filteredStudentList = studentList.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      {/* Student List Container */}
      <div className="w-1/3 pr-4">
        <h1 className="text-3xl font-semibold text-white mb-4">Student List</h1>
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
          {filteredStudentList.length > 0 ? (
            filteredStudentList.map((student) => (
              <div
                key={student.id}
                className="bg-gray-800 rounded-lg p-4 cursor-pointer hover:bg-purple-800 mb-4"
                onClick={() => handleStudentClick(student)}
              >
                <h2 className="text-lg font-semibold text-white">{student.name}</h2>
                {/* <p className="text-sm text-gray-300"> {student.guardians}</p> */}
              </div>
            ))
          ) : (
            <p className="text-white">No students found.</p>
          )}
        </div>

        {/* Add Student Button */}
        <button
          className="bg-purple-900 rounded-lg px-4 py-2 text-white font-semibold hover:bg-purple-800 focus:outline-none mt-4"
          onClick={toggleAddFormVisibility}
        >
          Add Student
        </button>
      </div>

      {/* Modal Container */}
      <div className="pl-4">
  {selectedStudent ? (
  <div className="bg-gray-800 rounded-lg p-4">
  <div className="flex items-center">
    <img src={selectedStudent.image} alt={selectedStudent.name} className="w-1/2 h-auto mr-4" />
    <div className="w-1/2">
      <h2 className="text-3xl font-semibold text-purple-400 mb-2">{selectedStudent.name}</h2>
      <p className="text-lg text-gray-300">Grade: {selectedStudent.grade}</p>
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-white">Profile:</h3>
        <p className="text-base text-gray-300">
          <span className="font-bold">Date of Birth:</span> {selectedStudent.dateOfBirth}
        </p>
        <p className="text-base text-gray-300">
          <span className="font-bold">Age:</span> {selectedStudent.age}
        </p>
        <p className="text-base text-gray-300">
          <span className="font-bold">Gender:</span> {selectedStudent.gender}
        </p>
        <p className="text-base text-gray-300">
          <span className="font-bold">Year Joined:</span> {selectedStudent.yearJoined}
        </p>
        <p className="text-base text-gray-300">
          <span className="font-bold">Address:</span> {selectedStudent.address}
        </p>
        <p className="text-base text-gray-300">
          <span className="font-bold">Nationality:</span> {selectedStudent.nationality}
        </p>
        <p className="text-base text-gray-300">
          <span className="font-bold">Medical Information:</span> {selectedStudent.medicalInformation}
        </p>
        <p className="text-base text-gray-300">
          <span className="font-bold">Extracurricular Activities:</span> {selectedStudent.extracurricularActivities.join(', ')}
        </p>
        <p className="text-base text-gray-300">
          <span className="font-bold">Awards:</span> {selectedStudent.awards.join(', ')}
        </p>
        <p className="text-base text-gray-300">
          <span className="font-bold">Interests:</span> {selectedStudent.interests.join(', ')}
        </p>
        <p className="text-base text-gray-300">
          <span className="font-bold">Parent Contact Email:</span> {selectedStudent.parentContactEmail}
        </p>
        <p className="text-base text-gray-300">
          <span className="font-bold">Parent Contact Phone:</span> {selectedStudent.parentContactPhone}
        </p>
          </div>
          {/* <div className="mt-6">
            <h3 className="text-lg font-semibold text-white">Attendance:</h3>
            <p className="text-base text-gray-300">
              Days Present: {selectedStudent.attendanceDaysPresent} | Days Absent:{' '}
              {selectedStudent.attendanceDaysAbsent} | Days Tardy: {selectedStudent.attendanceDaysTardy}
            </p>
          </div> */}
          {/* <div className="mt-6">
            <h3 className="text-lg font-semibold text-white">Grades:</h3>
            <p className="text-base text-gray-300">
              Math: {selectedStudent.gradesMath} | Science: {selectedStudent.gradesScience} | English:{' '}
              {selectedStudent.gradesEnglish}
            </p>
          </div> */}
          {/* <div className="mt-6">
            <h3 className="text-lg font-semibold text-white">Discipline:</h3>
            <p className="text-base text-gray-300">
              Warnings: {selectedStudent.disciplineWarnings} | Suspensions:{' '}
              {selectedStudent.disciplineSuspensions}
            </p>
          </div> */}
          <button
            className="bg-purple-900 rounded-lg px-4 py-2 text-white font-semibold hover:bg-purple-800 focus:outline-none mt-4"
            onClick={toggleEditFormVisibility}
          >
            Edit
          </button>
          <button
            className="bg-red-900 rounded-lg px-4 py-2 text-white font-semibold hover:bg-red-800 focus:outline-none mt-4 ml-4"
            onClick={() => deleteStudent(selectedStudent)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  ) : (
    <p className="text-white">Select a student to view details.</p>
  )}
  {isDeleteModalVisible && (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
      <div className="bg-gray-800 rounded-lg p-4 w-96">
        <p className="text-white">
          Are you sure you want to delete {studentToDelete?.name} from the school database? This action is irreversible and will permanently delete the student.
        </p>
        <div className="flex justify-end mt-4">
          <button
            className="bg-red-900 rounded-lg px-4 py-2 text-white font-semibold hover:bg-red-800 focus:outline-none"
            onClick={confirmDeleteStudent}
          >
            Delete
          </button>
          <button
            className="bg-gray-700 rounded-lg px-4 py-2 text-white font-semibold hover:bg-gray-600 focus:outline-none ml-4"
            onClick={() => setIsDeleteModalVisible(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )}
</div>

      
      {/* Add student Form  */}
      {isAddFormVisible && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-gray-800 rounded-lg p-4 w-96">
            <h2 className="text-xl font-semibold text-white mb-4">Add student</h2>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col">
                <label className="text-sm text-gray-300 mb-2" htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newStudent.name}
                  onChange={handleAddInputChange}
                  className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-300 mb-2" htmlFor="email">Grade:</label>
                <input
                  type="text"
                  id="grade"
                  name="grade"
                  value={newStudent.grade}
                  onChange={handleAddInputChange}
                  className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-300 mb-2" htmlFor="image">image:</label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={newStudent.image}
                  onChange={ handleAddInputChange}
                  className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-gray-300 mb-2" htmlFor="guardians">Guardians:</label>
                <input
                  type="text"
                  id="guardians"
                  name="guardians"
                  value={newStudent.guardians}
                  onChange={ handleAddInputChange}
                  className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-300 mb-2" htmlFor="profile">Profile:</label>
                <input
                  type="text"
                  id="profile"
                  name="profile"
                  value={newStudent.profile}
                  onChange={ handleAddInputChange}
                  className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-300 mb-2" htmlFor="age">Attendance:</label>
                <input
                  type="text"
                  id="attendance"
                  name="attendance"
                  value={newStudent.attendance}
                  onChange={ handleAddInputChange}
                  className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-300 mb-2" htmlFor="grades">Grades:</label>
                <input
                  type="text"
                  id="grades"
                  name="grades"
                  value={newStudent.grades}
                  onChange={ handleAddInputChange}
                  className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-300 mb-2" htmlFor="discipline">Discipline:</label>
                <input
                  type="text"
                  id="discipline"
                  name="discipline"
                  value={newStudent.discipline}
                  onChange={ handleAddInputChange}
                  className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="bg-purple-900 rounded-lg px-4 py-2 text-white font-semibold hover:bg-purple-800 focus:outline-none mr-2"
                onClick={handleAddStudent}
              >
                Add
              </button>
              <button
                className="bg-gray-700 rounded-lg px-4 py-2 text-white font-semibold hover:bg-gray-600 focus:outline-none"
                onClick={toggleAddFormVisibility}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

        {/* Edit student Form */}
        {isEditFormVisible && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-gray-800 rounded-lg p-4 w-96">
            <h2 className="text-xl font-semibold text-white mb-4">Edit student</h2>
          
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col">
                <label className="text-sm text-gray-300 mb-2" htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newStudent.name}
                  onChange={handleAddInputChange}
                  className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-300 mb-2" htmlFor="email">Grade:</label>
                <input
                  type="text"
                  id="grade"
                  name="grade"
                  value={newStudent.grade}
                  onChange={handleAddInputChange}
                  className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-300 mb-2" htmlFor="image">image:</label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={newStudent.image}
                  onChange={ handleAddInputChange}
                  className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-gray-300 mb-2" htmlFor="guardians">Guardians:</label>
                <input
                  type="text"
                  id="guardians"
                  name="guardians"
                  value={newStudent.guardians}
                  onChange={ handleAddInputChange}
                  className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-300 mb-2" htmlFor="profile">Profile:</label>
                <input
                  type="text"
                  id="profile"
                  name="profile"
                  value={newStudent.profile}
                  onChange={ handleAddInputChange}
                  className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-300 mb-2" htmlFor="age">Attendance:</label>
                <input
                  type="text"
                  id="attendance"
                  name="attendance"
                  value={newStudent.attendance}
                  onChange={ handleAddInputChange}
                  className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-300 mb-2" htmlFor="grades">Grades:</label>
                <input
                  type="text"
                  id="grades"
                  name="grades"
                  value={newStudent.grades}
                  onChange={ handleAddInputChange}
                  className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-300 mb-2" htmlFor="discipline">Discipline:</label>
                <input
                  type="text"
                  id="discipline"
                  name="discipline"
                  value={newStudent.discipline}
                  onChange={ handleAddInputChange}
                  className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                className="bg-purple-900 rounded-lg px-4 py-2 text-white font-semibold hover:bg-purple-800 focus:outline-none mr-2"
                onClick={handleEditstudent}
              >
                Save
              </button>
              <button
                className="bg-gray-700 rounded-lg px-4 py-2 text-white font-semibold hover:bg-gray-600 focus:outline-none"
                onClick={toggleEditFormVisibility}
              >
                Cancel
              </button>
            </div>
          </div>
   
            </div>
  
     
      )}
    </div>

    
  );
}

export default StudentManagement;
