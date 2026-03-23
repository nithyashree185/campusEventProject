package com.tt.campus.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tt.campus.repository.VoteRepository;

@Service
public class DashboardService {

    @Autowired
    private VoteRepository voteRepository;

    public List<Object[]> getTopEvents() {
        return voteRepository.getTopEvents();
    }
    
    public List<Object[]> getTrendingEvents() {
        return voteRepository.getTrendingEvents();
    }

}