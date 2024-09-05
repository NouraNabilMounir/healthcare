import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Calendar } from 'lucide-react';
import Card from './Card';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [patientCount, setPatientCount] = useState(0);
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [revenueData, setRevenueData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    setPatientCount(150);
    setAppointmentCount(25);
    setRevenueData({
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Monthly Revenue',
          data: [5000, 6000, 7500, 8000, 9000, 10000],
          backgroundColor: 'rgba(136, 132, 216, 0.5)',
          borderColor: 'rgba(136, 132, 216, 1)',
          borderWidth: 1,
        },
      ],
    });
  }, []);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `$${tooltipItem.raw}`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Revenue ($)',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card title="Total Patients" value={patientCount} icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>} />
        <Card title="Today's Appointments" value={appointmentCount} icon={<Calendar className="h-4 w-4 text-muted-foreground" />} />
      </div>
      <Card title="Monthly Revenue">
        <div className="w-full h-80">
          <Bar
            data={revenueData}
            options={chartOptions}
          />
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
