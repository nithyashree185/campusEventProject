import React, { useState } from 'react';
import { ideaService } from '../services/ideaService';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, Sparkles, Loader2, Plus } from 'lucide-react';

const SuggestIdea = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'TECH',
    votingDeadline: ''
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [myIdeas, setMyIdeas] = useState([]);

  // AI Generator States
  const [aiIdeas, setAiIdeas] = useState([]);
  const [isGeneratingIdeas, setIsGeneratingIdeas] = useState(false);
  const [isGeneratingDesc, setIsGeneratingDesc] = useState(false);

  const fetchMyIdeas = async () => {
    try {
      const userIdeas = await ideaService.getIdeasByUser(user.name);
      setMyIdeas(userIdeas || []);
    } catch (err) {
      console.error('Error fetching user ideas:', err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (user && user.name) {
      fetchMyIdeas();
    }
  }, [user]);

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      const submissionData = {
        ...formData,
        createdBy: user.name
      };
      console.log('Submitting idea:', submissionData);
      await ideaService.submitIdea(submissionData);
      setSuccess(true);
      setFormData({ title: '', description: '', category: 'TECH', votingDeadline: '' });
      setAiIdeas([]);
      fetchMyIdeas(); // refresh list
    } catch (err) {
      console.error('Submission error:', err);
      const errorMsg = err.response?.data?.message || err.message || 'Failed to submit event idea.';
      setError(`Error: ${errorMsg}`);
    }
  };

  const handleGenerateIdeas = async () => {
    setIsGeneratingIdeas(true);
    setError('');
    try {
      const response = await ideaService.generateAIIdeas(formData.category);
      setAiIdeas(response.ideas || []);
    } catch (err) {
      console.error(err);
      setError('Failed to generate AI ideas. Please try again.');
    } finally {
      setIsGeneratingIdeas(false);
    }
  };

  const handleGenerateDescription = async () => {
    if (!formData.title) {
      setError('Please enter an event title first to generate a description.');
      return;
    }
    setIsGeneratingDesc(true);
    setError('');
    try {
      const response = await ideaService.generateAIDescription(formData.title);
      setFormData({ ...formData, description: response.description || '' });
    } catch (err) {
      console.error(err);
      setError('Failed to generate description. Please try again.');
    } finally {
      setIsGeneratingDesc(false);
    }
  };

  const selectSuggestedIdea = (title) => {
    setFormData({ ...formData, title });
    setAiIdeas([]);
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Suggest an Event Idea</h1>
      <p className="page-subtitle">Got an idea for a campus event? Submit it here for approval.</p>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="form-card flex-1">
          {success && (
            <div className="alert-success">
              <CheckCircle size={20} /> Event submitted successfully! Waiting for admin approval.
            </div>
          )}
          {error && <div className="alert-error">{error}</div>}

          <form onSubmit={handleCreateSubmit} className="grid-form">
            <div className="form-group">
              <label>Title</label>
              <input 
                type="text" 
                required 
                value={formData.title} 
                onChange={e => setFormData({...formData, title: e.target.value})} 
                placeholder="E.g., Spring Hackathon"
              />
            </div>
            <div className="form-group flex items-end gap-2">
              <div className="flex-1">
                <label>Category</label>
                <select 
                  value={formData.category} 
                  onChange={e => setFormData({...formData, category: e.target.value})}
                >
                  <option value="TECH">Technology</option>
                  <option value="CULTURAL">Cultural</option>
                  <option value="SPORTS">Sports</option>
                </select>
              </div>
              <button 
                type="button" 
                className="btn-ai-small"
                onClick={handleGenerateIdeas}
                disabled={isGeneratingIdeas}
              >
                {isGeneratingIdeas ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
                AI Ideas
              </button>
            </div>
            <div className="form-group">
              <label>Voting Deadline</label>
              <input 
                type="date" 
                required 
                value={formData.votingDeadline} 
                onChange={e => setFormData({...formData, votingDeadline: e.target.value})} 
              />
            </div>
            <div className="form-group full-width">
              <div className="flex justify-between items-center mb-1">
                <label className="m-0">Description</label>
                <button 
                  type="button" 
                  className="btn-ai-small"
                  onClick={handleGenerateDescription}
                  disabled={isGeneratingDesc || !formData.title}
                >
                  {isGeneratingDesc ? <Loader2 className="animate-spin" size={14} /> : <Sparkles size={14} />}
                  Generate with AI
                </button>
              </div>
              <textarea 
                required 
                value={formData.description} 
                onChange={e => setFormData({...formData, description: e.target.value})} 
                placeholder="Describe what the event is about..."
              />
            </div>
            <button type="submit" className="btn-primary w-full">Submit for Approval</button>
          </form>
        </div>

        {aiIdeas.length > 0 && (
          <div className="lg:w-1/3">
            <div className="ai-suggestions-panel">
              <div className="flex items-center gap-2 mb-4 text-primary">
                <Sparkles size={20} />
                <h3 className="font-bold m-0">AI Suggestions</h3>
              </div>
              <div className="space-y-3">
                {aiIdeas.map((idea, index) => (
                  <div 
                    key={index} 
                    className="ai-suggestion-card"
                    onClick={() => selectSuggestedIdea(idea)}
                  >
                    <div className="flex items-center gap-2">
                       <Plus size={14} className="text-primary" />
                       <span>{idea}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted mt-4">Click a suggestion to use it as your event title.</p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">My Submitted Ideas</h2>
        {loading ? <p>Loading...</p> : (
          <div className="events-grid">
            {myIdeas.length === 0 ? (
              <p className="text-muted">You haven't submitted any ideas yet.</p>
            ) : (
              myIdeas.map(idea => (
                <div key={idea.eventId || idea.id} className="event-card">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-lg">{idea.title}</span>
                    <span className={`status-badge ${idea.status?.toLowerCase()}`}>{idea.status || 'PENDING'}</span>
                  </div>
                  <p className="text-sm text-muted mb-4 line-clamp-3">{idea.description}</p>
                  <button 
                    onClick={async () => {
                      if(window.confirm('Are you sure you want to delete this idea?')) {
                        try {
                           await ideaService.deleteIdea(idea.eventId || idea.id);
                           fetchMyIdeas();
                        } catch(e) {
                           alert('Error deleting idea. Wait for Admin approval/rejection or check backend support.');
                        }
                      }
                    }} 
                    className="btn-reject w-full"
                  >
                    Delete Idea
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SuggestIdea;
