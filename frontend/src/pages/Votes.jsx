import React, { useEffect, useState } from 'react';
import { ideaService } from '../services/ideaService';
import { voteService } from '../services/voteService';
import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';
import { Calendar, Tag, ThumbsUp, CheckCircle, AlertCircle } from 'lucide-react';

const Votes = () => {
  const [events, setEvents] = useState([]);
  const [votesCount, setVotesCount] = useState({});
  const [loading, setLoading] = useState(true);
  const [votedEvents, setVotedEvents] = useState(new Set()); 
  const [message, setMessage] = useState({ text: '', type: '' });
  const { user } = useAuth();
  
  const fetchEventsAndVotes = async () => {
    try {
      const data = await ideaService.getApprovedIdeas();
      const votes = await voteService.getVotesCount();
      
      if (user && user.userId) {
        const userVotes = await voteService.getVotedEvents(user.userId);
        setVotedEvents(new Set(userVotes || []));
      }

      setEvents(Array.isArray(data) ? data : data.content || []);
      setVotesCount(votes || {});
    } catch (err) {
      console.error('Error fetching events/votes:', err);
    } finally {
      if(loading) setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.userId) {
        fetchEventsAndVotes();
    }
    const interval = setInterval(() => {
      fetchEventsAndVotes();
    }, 10000); 
    return () => clearInterval(interval);
  }, [user]);

  const handleVote = async (event) => {
    setMessage({ text: '', type: '' });
    const eventId = event.eventId || event.id;

    if(votedEvents.has(eventId)) return;

    // Check deadline in frontend as well
    const deadlineStr = event.votingDeadline || event.deadline;
    if (deadlineStr && new Date(deadlineStr) < new Date().setHours(0,0,0,0)) {
      setMessage({ text: 'Voting has closed for this event.', type: 'error' });
      return;
    }

    try {
      await voteService.castVote(user.userId, eventId);
      setMessage({ text: 'Vote cast successfully!', type: 'success' });
      
      setVotedEvents(prev => new Set(prev).add(eventId));
      
      setVotesCount(prev => ({...prev, [eventId]: (prev[eventId] || 0) + 1}));
    } catch (err) {
      console.error('Vote cast failed:', err);
      const errorMsg = err.response?.data?.message || 'Failed to cast vote or you have already voted.';
      setMessage({ text: errorMsg, type: 'error' });
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Vote for Events</h1>
          <p className="page-subtitle">Support the ideas you want to see happen on campus</p>
        </div>
      </div>

      {message.text && (
        <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-error'} mb-6 flex items-center gap-2`}>
          <AlertCircle size={20} />
          {message.text}
        </div>
      )}

      <div className="events-grid">
        {events.length > 0 ? (
          events.map(event => {
            const eventId = event.eventId || event.id;
            const isVoted = votedEvents.has(eventId);
            const deadlineStr = event.votingDeadline || event.deadline;
            const isExpired = deadlineStr && new Date(deadlineStr) < new Date().setHours(0,0,0,0);

            return (
              <div className={`event-card ${isVoted ? 'voted' : ''} ${isExpired ? 'expired' : ''}`} key={eventId}>
                <div className="event-header">
                  <span className={`category-badge ${event.category?.toLowerCase() || 'general'}`}>
                    <Tag size={14} /> {event.category || 'General'}
                  </span>
                  {isExpired && <span className="status-label expired">Voting Closed</span>}
                </div>
                
                <h3 className="event-title">{event.title}</h3>
                <p className="event-description line-clamp-3">{event.description}</p>
                
                <div className="timeline-container">
                  <div className="timeline-header">
                    <span>Voting Timeline</span>
                    <span>{isExpired ? 'Ended' : 'Active'}</span>
                  </div>
                  <div className="timeline-bar-bg">
                    <div 
                      className="timeline-bar-fill" 
                      style={{ 
                        width: isExpired ? '100%' : '65%', // Simulated progress for now
                        opacity: isExpired ? 0.3 : 1 
                      }}
                    ></div>
                  </div>
                </div>
                
                <div className="event-footer">
                  <div className="deadline-info">
                    <Calendar size={14} />
                    <span>Ends: {deadlineStr ? new Date(deadlineStr).toLocaleDateString() : 'TBD'}</span>
                  </div>
                  
                  <button 
                    className={`btn-vote ${isVoted ? 'voted' : ''} ${isExpired ? 'disabled' : ''}`}
                    onClick={() => handleVote(event)}
                    disabled={isVoted || isExpired}
                  >
                    {isVoted ? (
                      <><CheckCircle size={18} /> Voted</>
                    ) : isExpired ? (
                      'Closed'
                    ) : (
                      <><ThumbsUp size={18} /> Vote</>
                    )}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="empty-state">No events available for voting at this time.</div>
        )}
      </div>
    </div>
  );
};

export default Votes;
