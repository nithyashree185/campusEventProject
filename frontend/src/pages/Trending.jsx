import React, { useEffect, useState } from 'react';
import { voteService } from '../services/voteService';
import Loader from '../components/Loader';
import { Tag, Calendar } from 'lucide-react';

const Trending = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTrending = async () => {
    try {
      const data = await voteService.getTrending();
      // Use map to ensure we extract the event object itself if it's nested (e.g., [eventId, voteCount, {eventObj}])
      // Based on typical spring boot JPA projection, it might be an array of objects or an array of primitive arrays.
      // We will safeguard by displaying what we can find.
      setTrending(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      if(loading) setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrending();
    const interval = setInterval(() => {
      fetchTrending();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="page-container">
      <h1 className="page-title">Trending Leaderboard</h1>
      <p className="page-subtitle">The top ranked events as voted by the community!</p>

      <div className="trending-list mt-8">
        {trending.length === 0 ? (
          <div className="empty-state">No trending events currently.</div>
        ) : (
          trending.map((event, index) => (
            <div key={event.id || index} className="trending-card">
              <div className="trending-rank">#{index + 1}</div>
              <div className="trending-info flex-1">
                <div className="flex items-center gap-3 mb-2">
                   {/* Handle Spring Data JPA array projections vs normal objects */}
                   <h3 className="m-0 text-xl font-bold">{event.title || event[0]?.title || `Event #${event[0] || event.id}`}</h3>
                   <span className={`category-badge ${(event.category || event[0]?.category || 'Event').toLowerCase()}`}>
                    <Tag size={12} /> {event.category || event[0]?.category || 'Event'}
                   </span>
                </div>
                <div className="text-muted flex items-center gap-4 text-sm mt-2">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} /> Ends: {new Date(event.votingDeadline || event[0]?.votingDeadline || Date.now()).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="trending-votes ml-4">
                <span className="vote-badge text-lg px-4 py-2">
                  {event.voteCount || event[1] || 0} Votes
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Trending;
