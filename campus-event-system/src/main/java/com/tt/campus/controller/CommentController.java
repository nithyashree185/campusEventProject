package com.tt.campus.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.tt.campus.entity.Comment;
import com.tt.campus.service.CommentService;

@RestController
@RequestMapping("/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping("/add")
    public Comment addComment(@RequestBody Comment comment) {
        return commentService.addComment(comment);
    }

    @GetMapping("/event/{eventId}")
    public List<Comment> getComments(@PathVariable int eventId) {
        return commentService.getComments(eventId);
    }

}