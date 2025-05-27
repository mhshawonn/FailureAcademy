import React from 'react';
import StatsCard from '../components/StatsCard';

const Dashboard = () => (
  <div>
    <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <StatsCard title="Students" value="2K+" />
      <StatsCard title="Mentors" value="10+" />
      <StatsCard title="Courses" value="30+" />
      <StatsCard title="YouTube Subs" value="2K+" />
    </div>
  </div>
);

export default Dashboard;
