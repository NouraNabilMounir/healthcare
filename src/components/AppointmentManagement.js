import React, { useState, useEffect } from 'react';

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState({ patientName: '', date: '', time: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Simulating data fetching
    setAppointments([
      { id: 1, patientName: 'John Doe', date: '2024-09-05', time: '10:00 AM' },
      { id: 2, patientName: 'Jane Smith', date: '2024-09-06', time: '2:00 PM' },
    ]);
  }, []);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.patientName) newErrors.patientName = 'Patient name is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newAppointment = {
        id: appointments.length + 1,
        ...formData
      };
      setAppointments([...appointments, newAppointment]);
      setFormData({ patientName: '', date: '', time: '' });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Appointment Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Schedule Appointment</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="patientName" className="block text-sm font-medium text-gray-700">Patient Name</label>
              <input
                type="text"
                id="patientName"
                name="patientName"
                value={formData.patientName}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.patientName && <p className="mt-1 text-sm text-red-600">{errors.patientName}</p>}
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time}</p>}
            </div>
            <button type="submit" className="px-4 py-2 bg-customColor2 text-white rounded-md hover:bg-customColor3">Schedule</button>
          </form>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Appointments List</h2>
          <ul className="space-y-2">
            {appointments.map((appointment) => (
              <li key={appointment.id} className="p-4 bg-white rounded-md shadow-md">
                <p className="text-lg font-medium">{appointment.patientName}</p>
                <p className="text-sm text-gray-500">Date: {appointment.date}</p>
                <p className="text-sm text-gray-500">Time: {appointment.time}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AppointmentManagement;
