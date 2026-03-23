package com.tt.campus.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.tt.campus.entity.EventIdea;

public interface EventIdeaRepository extends JpaRepository<EventIdea, Integer> {

	
	List<EventIdea> findByTitleContainingIgnoreCase(String keyword);
	List<EventIdea> findByCreatedBy(String createdBy);
	
	List<EventIdea> findByCategory(String category);
	
	List<EventIdea> findByStatus(String status);
}