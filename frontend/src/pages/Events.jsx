import React, { useEffect, useState } from 'react';
import { ideaService } from '../services/ideaService';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, Tag, Eye } from 'lucide-react';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  const fetchEvents = async () => {
    try {
      const data = await ideaService.getApprovedIdeas();
      setEvents(Array.isArray(data) ? data : data.content || []);
    } catch (err) {
      console.error(err);
    } finally {
      if(loading) setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Approved Events</h1>
          <p className="page-subtitle">View all the officially approved events on campus.</p>
        </div>
      </div>

      <div className="events-grid">
        {events.length === 0 ? (
          <div className="empty-state">No approved events available.</div>
        ) : (
          events.map(event => (
            <div className="event-card" key={event.eventId || event.id}>
              <div className="event-header">
                <span className={`category-badge ${event.category?.toLowerCase()}`}>
                  <Tag size={14} /> {event.category}
                </span>
                <span className="status-badge approved">Approved</span>
              </div>
              
              <h3 className="event-title">{event.title}</h3>
              <p className="event-desc">{event.description}</p>
              
              <div className="event-meta">
                <span className="deadline">
                  <CalendarIcon size={14} /> 
                  Deadline: {new Date(event.votingDeadline).toLocaleDateString()}
                </span>
              </div>

              <div className="event-actions mt-4">
                 <button className="btn-secondary w-full flex items-center justify-center gap-2" onClick={() => navigate('/votes')}>
                   <Eye size={16} /> Open Voting Page
                 </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Events;
