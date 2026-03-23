package com.tt.campus.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.tt.campus.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

    List<Comment> findByEventId(int eventId);

}