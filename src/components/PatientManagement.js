import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const PatientManagement = () => {
  const [patients, setPatients] = useState([]);
  const [showMedicalHistory, setShowMedicalHistory] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    setPatients([
      { id: 1, name: 'John Doe', age: 35, contactNumber: '123-456-7890' },
      { id: 2, name: 'Jane Smith', age: 28, contactNumber: '098-765-4321' },
    ]);
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    age: Yup.number().required('Age is required').positive('Age must be a positive number').integer(),
    contactNumber: Yup.string()
      .required('Contact number is required')
      .matches(/^\d{3}-\d{3}-\d{4}$/, 'Contact number is not valid'),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setPatients([...patients, { id: patients.length + 1, ...values }]);
    resetForm();
    setSubmitting(false);
  };

  const toggleMedicalHistory = (patient) => {
    setShowMedicalHistory(!showMedicalHistory);
    setSelectedPatient(patient);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Patient Management</h1>
      <Formik
        initialValues={{ name: '', age: '', contactNumber: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="mb-6">
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                Name
              </label>
              <Field name="name" type="text" className="border border-gray-300 p-2 w-full" />
              <ErrorMessage name="name" component="div" className="text-red-500" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="age">
                Age
              </label>
              <Field name="age" type="number" className="border border-gray-300 p-2 w-full" />
              <ErrorMessage name="age" component="div" className="text-red-500" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="contactNumber">
                Contact Number
              </label>
              <Field name="contactNumber" type="text" className="border border-gray-300 p-2 w-full" />
              <ErrorMessage name="contactNumber" component="div" className="text-red-500" />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-customColor3 text-white px-4 py-2 rounded"
            >
              Add Patient
            </button>
          </Form>
        )}
      </Formik>
      <ul className="space-y-6">
  {patients.map((patient) => (
    <li
      key={patient.id}
      className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold text-gray-900">{patient.name}</p>
          <p className="text-sm text-gray-500 mt-1">Age: {patient.age}</p>
          <p className="text-sm text-gray-500 mt-1">Contact Number: {patient.contactNumber}</p>
        </div>
        <button
          onClick={() => toggleMedicalHistory(patient)}
          className="flex items-center bg-customColor2 text-white px-4 py-2 rounded-lg hover:bg-customColor3 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {showMedicalHistory && selectedPatient?.id === patient.id ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
              </svg>
              Hide Medical History
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
              Show Medical History
            </>
          )}
        </button>
      </div>

      {showMedicalHistory && selectedPatient?.id === patient.id && (
        <div className="mt-4 bg-gray-100 p-4 rounded">
          <h3 className="text-lg font-medium">Medical History for {selectedPatient.name}</h3>
          <p className="text-gray-600">[Insert Medical History Here]</p>
        </div>
      )}
    </li>
  ))}
</ul>

    </div>
  );
};

export default PatientManagement;
