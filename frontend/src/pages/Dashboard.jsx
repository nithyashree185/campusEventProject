import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Vote, TrendingUp, CheckSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ideaService } from '../services/ideaService';
import { voteService } from '../services/voteService';
import Loader from '../components/Loader';

const CustomStatsCard = ({ title, value, icon: Icon, colorClass, onClick }) => (
  <div className={`stats-card interactive ${colorClass}`} onClick={onClick}>
    <div className="stats-icon">
      <Icon size={24} />
    </div>
    <div className="stats-info">
      <h3>{title}</h3>
      <p className="stats-value">{value}</p>
    </div>
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalIdeas: 0,
    approvedEvents: 0,
    totalVotes: 0,
    trendingCount: 0
  });
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const userIdeas = await ideaService.getIdeasByUser(user.name).catch(() => []);
      const approvedIdeas = await ideaService.getApprovedIdeas().catch(() => []);
      const votes = await voteService.getVotesCount().catch(() => ({}));
      const trending = await voteService.getTrending().catch(() => []);

      setStats({
        totalIdeas: userIdeas?.length || 0,
        approvedEvents: approvedIdeas?.length || 0,
        trendingCount: trending?.length || 0
      });
    } catch (err) {
      console.error("Dashboard data error", err);
    } finally {
      if(loading) setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(() => {
      fetchDashboardData();
    }, 10000); // Poll every 10 seconds

    return () => clearInterval(interval);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="page-container">
      <h1 className="page-title">Dashboard</h1>
      <p className="page-subtitle">Platform overview and real-time statistics</p>
      
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        <CustomStatsCard 
          title="Ideas Submitted by You" 
          value={stats.totalIdeas} 
          icon={Calendar} 
          colorClass="bg-blue" 
          onClick={() => navigate('/admin/ideas')}
        />
        <CustomStatsCard 
          title="Approved Events" 
          value={stats.approvedEvents} 
          icon={CheckSquare} 
          colorClass="bg-green" 
          onClick={() => navigate('/events')}
        />
        <CustomStatsCard 
          title="Trending Events Count" 
          value={stats.trendingCount} 
          icon={TrendingUp} 
          colorClass="bg-orange" 
          onClick={() => navigate('/trending')}
        />
      </div>
      
      <div className="dashboard-content">
        <div className="dashboard-card">
          <h3>Welcome to the Campus Event Platform!</h3>
          <p>We're continually updating vote numbers in real-time. Use the cards above to quickly jump to important sections of the application. Suggest ideas, vote on your favorites, and watch the leaderboard climb!</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
