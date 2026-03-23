package com.tt.campus.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

import com.tt.campus.entity.Vote;

public interface VoteRepository extends JpaRepository<Vote, Integer> {

    boolean existsByUserIdAndEventId(int userId, int eventId);
    
    int countByEventId(int eventId);

    List<Vote> findByUserId(int userId);

    @Query(value = "SELECT e.title, COUNT(v.vote_id) as votes " +
    	       "FROM event_idea e LEFT JOIN vote v ON e.event_id = v.event_id " +
    	       "GROUP BY e.title " +
    	       "ORDER BY votes DESC", nativeQuery = true)
    	List<Object[]> getTopEvents();
    	
    	
    	@Query(value = "SELECT e.title, COUNT(v.vote_id) as votes " +
    		       "FROM event_idea e LEFT JOIN vote v ON e.event_id = v.event_id " +
    		       "GROUP BY e.title " +
    		       "ORDER BY votes DESC LIMIT 3", nativeQuery = true)
    		List<Object[]> getTrendingEvents();

}