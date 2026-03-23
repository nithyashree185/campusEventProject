package com.tt.campus.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;
import java.time.LocalDate;

import com.tt.campus.entity.Vote;
import com.tt.campus.entity.EventIdea;
import com.tt.campus.model.VoteUpdate;
import com.tt.campus.repository.EventIdeaRepository;
import com.tt.campus.repository.VoteRepository;

@Service
public class VoteService {

    @Autowired
    private VoteRepository voteRepository;
    
    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    
    @Autowired
    private EventIdeaRepository eventIdeaRepository;

    public Vote castVote(Vote vote) {
        // Find the event to check deadline
        EventIdea event = eventIdeaRepository.findById(vote.getEventId())
                .orElseThrow(() -> new RuntimeException("Event not found"));

        if (event.getVotingDeadline() != null && event.getVotingDeadline().isBefore(LocalDate.now())) {
            throw new RuntimeException("Voting deadline has passed for this event");
        }

        if (voteRepository.existsByUserIdAndEventId(vote.getUserId(), vote.getEventId())) {
            throw new RuntimeException("User already voted");
        }

        Vote savedVote = voteRepository.save(vote);

        int voteCount = voteRepository.countByEventId(vote.getEventId());

        messagingTemplate.convertAndSend(
                "/topic/votes",
                new VoteUpdate(vote.getEventId(), voteCount)
        );

        return savedVote;
    }

    public List<Integer> getVotedEventIds(int userId) {
        return voteRepository.findByUserId(userId).stream()
                .map(Vote::getEventId)
                .collect(Collectors.toList());
    }
}