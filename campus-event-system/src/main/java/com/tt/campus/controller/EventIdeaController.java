package com.tt.campus.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.tt.campus.entity.EventIdea;
import com.tt.campus.service.EventIdeaService;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@RestController
@RequestMapping("/ideas")
public class EventIdeaController {

    @Autowired
    private EventIdeaService eventIdeaService;

    @PostMapping("/submit")
    public EventIdea submitIdea(@RequestBody EventIdea idea) {
        return eventIdeaService.submitIdea(idea);
    }

    @GetMapping("/all")
    public List<EventIdea> getAllIdeas() {
        return eventIdeaService.getAllIdeas();
    }
    
    @PutMapping("/update/{id}")
    public EventIdea updateIdea(@PathVariable int id, @RequestBody EventIdea idea) {
        return eventIdeaService.updateIdea(id, idea);
    }
    
    @DeleteMapping("/delete/{id}")
    public String deleteIdea(@PathVariable int id) {
        return eventIdeaService.deleteIdea(id);
    }
    
    @GetMapping("/search")
    public List<EventIdea> searchIdeas(@RequestParam String keyword) {
        return eventIdeaService.searchIdeas(keyword);
        
    
    }
    @GetMapping("/votes")
    public List<Object[]> getIdeasWithVotes() {
        return eventIdeaService.getIdeasWithVotes();
    }
    
    @GetMapping("/trending")
    public List<Object[]> getTrendingEvents() {
        return eventIdeaService.getTrendingEvents();
    }
    
    @GetMapping("/status/{id}")
    public String getEventStatus(@PathVariable int id) {
        return eventIdeaService.getEventStatus(id);
    }
    
    @GetMapping("/page")
    public Page<EventIdea> getIdeasWithPagination(Pageable pageable) {
        return eventIdeaService.getIdeasWithPagination(pageable);
    }
    
    @GetMapping("/category/{category}")
    public List<EventIdea> getIdeasByCategory(@PathVariable String category) {
        return eventIdeaService.getIdeasByCategory(category);
    }
    
    @PutMapping("/approve/{id}")
    public EventIdea approveIdea(@PathVariable int id) {
        return eventIdeaService.approveIdea(id);
    }

    @PutMapping("/reject/{id}")
    public EventIdea rejectIdea(@PathVariable int id) {
        return eventIdeaService.rejectIdea(id);
    }
    
    @GetMapping("/approved")
    public List<EventIdea> getApprovedIdeas() {
        return eventIdeaService.getApprovedIdeas();
    }

    @GetMapping("/admin/all")
    public List<EventIdea> getAllIdeasForAdmin() {
        return eventIdeaService.getAllIdeasForAdmin();
    }

    @GetMapping("/user/{username}")
    public List<EventIdea> getIdeasByUser(@PathVariable String username) {
        return eventIdeaService.getIdeasByUser(username);
    }
}