import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const PatientPortal = () => {
  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [billingInfo, setBillingInfo] = useState([]);
  const [activeTab, setActiveTab] = useState('appointments');

  useEffect(() => {
    // Simulating data fetching
    setPatient({
      id: 1,
      name: 'John Doe',
      age: 35,
      email: 'johndoe@example.com'
    });

    setAppointments([
      { id: 1, date: '2024-09-10', time: '10:00', reason: 'Check-up' },
      { id: 2, date: '2024-09-25', time: '14:30', reason: 'Follow-up' },
    ]);

    setMedicalHistory([
      { id: 1, date: '2024-08-15', description: 'Annual physical examination' },
      { id: 2, date: '2024-07-01', description: 'Flu vaccination' },
    ]);

    setBillingInfo([
      { id: 1, date: '2024-08-15', description: 'Annual physical examination', amount: 150 },
      { id: 2, date: '2024-07-01', description: 'Flu vaccination', amount: 50 },
    ]);
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'appointments':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">Upcoming Appointments</h3>
            <ul>
              {appointments.map(app => (
                <li key={app.id} className="mb-2 p-2 bg-gray-100 rounded">
                  <p><strong>Date:</strong> {app.date}</p>
                  <p><strong>Time:</strong> {app.time}</p>
                  <p><strong>Reason:</strong> {app.reason}</p>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'medicalHistory':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">Medical History</h3>
            <ul>
              {medicalHistory.map(record => (
                <li key={record.id} className="mb-2 p-2 bg-gray-100 rounded">
                  <p><strong>Date:</strong> {record.date}</p>
                  <p><strong>Description:</strong> {record.description}</p>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'billing':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">Billing Information</h3>
            <ul>
              {billingInfo.map(bill => (
                <li key={bill.id} className="mb-2 p-2 bg-gray-100 rounded">
                  <p><strong>Date:</strong> {bill.date}</p>
                  <p><strong>Description:</strong> {bill.description}</p>
                  <p><strong>Amount:</strong> ${bill.amount}</p>
                </li>
              ))}
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    age: Yup.number().required('Age is required'),
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Patient Portal</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        {patient ? (
          <>
            <h2 className="text-2xl font-semibold mb-4">Welcome, {patient.name}</h2>
            <p className="mb-4">Email: {patient.email}</p>
            <div className="mb-6">
              <button
                onClick={() => setActiveTab('appointments')}
                className={`mr-4 px-4 py-2 rounded ${activeTab === 'appointments' ? 'bg-customColor3 text-white' : 'bg-gray-200'}`}
              >
                Appointments
              </button>
              <button
                onClick={() => setActiveTab('medicalHistory')}
                className={`mr-4 px-4 py-2 rounded ${activeTab === 'medicalHistory' ? 'bg-customColor3 text-white' : 'bg-gray-200'}`}
              >
                Medical History
              </button>
              <button
                onClick={() => setActiveTab('billing')}
                className={`px-4 py-2 rounded ${activeTab === 'billing' ? 'bg-customColor3 text-white' : 'bg-gray-200'}`}
              >
                Billing
              </button>
            </div>
            {renderTabContent()}
          </>
        ) : (
          <Formik
            initialValues={{ name: '', email: '', age: '' }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              setPatient({
                id: 2,
                name: values.name,
                email: values.email,
                age: values.age,
              });
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="mb-4">
                  <label htmlFor="name" className="block font-medium">Name</label>
                  <Field
                    id="name"
                    name="name"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block font-medium">Email</label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="age" className="block font-medium">Age</label>
                  <Field
                    id="age"
                    name="age"
                    type="number"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  />
                  <ErrorMessage
                    name="age"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default PatientPortal;
