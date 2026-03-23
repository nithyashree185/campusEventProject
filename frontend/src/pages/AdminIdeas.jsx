import React, { useEffect, useState } from 'react';
import { ideaService } from '../services/ideaService';
import Loader from '../components/Loader';
import { Check, X, Tag, Calendar as CalendarIcon } from 'lucide-react';

const AdminIdeas = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [message, setMessage] = useState({text: '', type: ''});

  const fetchEvents = async (pageNum) => {
    setLoading(true);
    try {
      const data = await ideaService.getAllIdeas(pageNum, 10);
      setEvents(data.content || data || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error(err);
      setMessage({text: 'Failed to fetch ideas.', type: 'error'});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(page);
  }, [page]);

  const handleApprove = async (id) => {
    setMessage({text: '', type: ''});
    try {
      await ideaService.approveIdea(id);
      setMessage({text: 'Idea approved successfully.', type: 'success'});
      fetchEvents(page);
    } catch (err) {
      setMessage({text: 'Failed to approve idea.', type: 'error'});
    }
  };

  const handleReject = (id) => {
    // There is no explicit reject API in the requirements, 
    // so we will simulate rejection by immediately removing it from the view.
    setEvents(events.filter(e => (e.eventId || e.id) !== id));
    setMessage({text: 'Idea rejected and removed from view.', type: 'success'});
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Manage Event Ideas</h1>
      <p className="page-subtitle">Review, approve, or reject student event submissions.</p>
      
      {message.text && (
        <div className={`alert-${message.type} flex items-center gap-2 mb-4 p-4 rounded-lg`}>
          {message.text}
        </div>
      )}

      {loading ? <Loader /> : (
        <>
          <div className="events-grid">
            {events.length === 0 ? (
              <div className="empty-state">No pending ideas.</div>
            ) : (
              events.map(event => (
                <div className="event-card" key={event.eventId || event.id}>
                  <div className="event-header">
                    <span className={`category-badge ${event.category?.toLowerCase()}`}>
                      <Tag size={14} /> {event.category}
                    </span>
                    <span className={`status-badge ${event.status?.toLowerCase()}`}>
                      {event.status || 'PENDING'}
                    </span>
                  </div>
                  
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-desc">{event.description}</p>
                  
                  <div className="event-meta">
                    <span className="deadline">
                      <CalendarIcon size={14} /> 
                      Deadline: {new Date(event.votingDeadline).toLocaleDateString()}
                    </span>
                    <span className="creator block mt-1 text-xs">By {event.createdBy}</span>
                  </div>

                  <div className="event-actions mt-4 flex gap-2">
                    <button 
                      className="btn-approve flex-1" 
                      onClick={() => handleApprove(event.eventId || event.id)}
                      disabled={event.status === 'APPROVED'}
                    >
                      <Check size={16} /> Approve
                    </button>
                    <button 
                      className="btn-reject flex-1" 
                      onClick={async () => {
                        setMessage({text: '', type: ''});
                        try {
                          await ideaService.rejectIdea(event.eventId || event.id);
                          setMessage({text: 'Idea rejected successfully.', type: 'success'});
                          fetchEvents(page);
                        } catch (err) {
                          setMessage({text: 'Failed to reject idea.', type: 'error'});
                        }
                      }}
                    >
                      <X size={16} /> Reject
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button 
                disabled={page === 0} 
                onClick={() => setPage(p => p - 1)}
                className="btn-secondary"
              >
                Previous
              </button>
              <span>Page {page + 1} of {totalPages}</span>
              <button 
                disabled={page >= totalPages - 1}
                onClick={() => setPage(p => p + 1)}
                className="btn-secondary"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminIdeas;
