import React from 'react';
import { Calendar as CalendarIcon, Tag, Check, ThumbsUp } from 'lucide-react';

const EventCard = ({ event, onVote, onApprove, isAdminView, currentUserId }) => {
  
  return (
    <div className="event-card">
      <div className="event-header">
        <span className={`category-badge ${event.category?.toLowerCase()}`}>
          <Tag size={14} /> {event.category}
        </span>
        {isAdminView && (
          <span className={`status-badge ${event.status?.toLowerCase()}`}>
            {event.status || 'PENDING'}
          </span>
        )}
      </div>
      
      <h3 className="event-title">{event.title}</h3>
      <p className="event-desc">{event.description}</p>
      
      <div className="event-meta">
        <span className="deadline">
          <CalendarIcon size={14} /> 
          Deadline: {new Date(event.votingDeadline).toLocaleDateString()}
        </span>
        <span className="creator">By {event.createdBy}</span>
      </div>

      <div className="event-actions">
        {isAdminView ? (
          <button 
            className="btn-approve" 
            onClick={() => onApprove(event.id)}
            disabled={event.status === 'APPROVED'}
          >
            <Check size={16} /> {event.status === 'APPROVED' ? 'Approved' : 'Approve'}
          </button>
        ) : (
          <button className="btn-vote" onClick={() => onVote(event.id)}>
            <ThumbsUp size={16} /> Vote
          </button>
        )}
      </div>
    </div>
  );
};

export default EventCard;
