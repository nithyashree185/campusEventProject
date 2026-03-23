import React from 'react';

const StatsCard = ({ title, value, icon: Icon, colorClass }) => {
  return (
    <div className={`stats-card ${colorClass}`}>
      <div className="stats-icon">
        <Icon size={24} />
      </div>
      <div className="stats-info">
        <h3>{title}</h3>
        <p className="stats-value">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;
