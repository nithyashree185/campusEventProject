package com.tt.campus.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

import com.tt.campus.entity.Vote;
import com.tt.campus.service.VoteService;

@RestController
@RequestMapping("/votes")
public class VoteController {

    @Autowired
    private VoteService voteService;

    @PostMapping("/cast")
    public Vote castVote(@RequestBody Vote vote) {
        return voteService.castVote(vote);
    }

    @GetMapping("/user/{userId}")
    public List<Integer> getVotedEventsByUser(@PathVariable int userId) {
        return voteService.getVotedEventIds(userId);
    }

}