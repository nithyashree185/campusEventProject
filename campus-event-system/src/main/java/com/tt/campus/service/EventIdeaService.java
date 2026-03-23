package com.tt.campus.service;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.tt.campus.entity.EventIdea;
import com.tt.campus.repository.EventIdeaRepository;
import com.tt.campus.repository.VoteRepository;
@Service
public class EventIdeaService {

    @Autowired
    private EventIdeaRepository eventIdeaRepository;

    @Autowired
    private VoteRepository voteRepository;

    public EventIdea submitIdea(EventIdea idea) {

        idea.setStatus("PENDING");

        return eventIdeaRepository.save(idea);
    }

    public List<EventIdea> getAllIdeas() {
        return eventIdeaRepository.findAll();
    }

    public EventIdea updateIdea(int id, EventIdea updatedIdea) {

        EventIdea idea = eventIdeaRepository.findById(id).orElse(null);

        if (idea != null) {
            idea.setTitle(updatedIdea.getTitle());
            idea.setDescription(updatedIdea.getDescription());
            return eventIdeaRepository.save(idea);
        }

        return null;
    }

    public String deleteIdea(int id) {

        if (eventIdeaRepository.existsById(id)) {
            eventIdeaRepository.deleteById(id);
            return "Event deleted successfully";
        }

        return "Event not found";
    }

    public List<EventIdea> searchIdeas(String keyword) {
        return eventIdeaRepository.findByTitleContainingIgnoreCase(keyword);
    }

  
    public List<Object[]> getIdeasWithVotes() {
        return voteRepository.getTopEvents();
    }
    

    public List<Object[]> getTrendingEvents() {
        return voteRepository.getTrendingEvents();
    }
    
    
 // ⭐ FEATURE 3: Event Status
    public String getEventStatus(int id) {

        EventIdea idea = eventIdeaRepository.findById(id).orElse(null);

        if (idea == null) {
            return "Event not found";
        }

        // check if voting deadline passed
        if (LocalDate.now().isAfter(idea.getVotingDeadline())) {
            return "Voting Closed";
        }

        // check if event is trending
        List<Object[]> trending = voteRepository.getTrendingEvents();

        for (Object[] obj : trending) {
            String title = (String) obj[0];

            if (title.equalsIgnoreCase(idea.getTitle())) {
                return "Trending";
            }
        }

        return "Voting Open";
    }

    public Page<EventIdea> getIdeasWithPagination(Pageable pageable) {
        return eventIdeaRepository.findAll(pageable);
    }

    
    public List<EventIdea> getIdeasByCategory(String category) {
        return eventIdeaRepository.findByCategory(category);
    }
    
    public EventIdea approveIdea(int id) {

        EventIdea idea = eventIdeaRepository.findById(id).orElse(null);

        if (idea != null) {
            idea.setStatus("APPROVED");
            return eventIdeaRepository.save(idea);
        }

        return null;
    }
    
    
    public EventIdea rejectIdea(int id) {

        EventIdea idea = eventIdeaRepository.findById(id).orElse(null);

        if (idea != null) {
            idea.setStatus("REJECTED");
            return eventIdeaRepository.save(idea);
        }

        return null;
    }
    
    public List<EventIdea> getApprovedIdeas() {
        return eventIdeaRepository.findByStatus("APPROVED");
    }
    
    public List<EventIdea> getAllIdeasForAdmin() {
        return eventIdeaRepository.findAll();
    }

    public List<EventIdea> getIdeasByUser(String username) {
        return eventIdeaRepository.findByCreatedBy(username);
    }
}