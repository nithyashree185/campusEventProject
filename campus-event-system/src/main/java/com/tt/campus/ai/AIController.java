package com.tt.campus.ai;

import com.tt.campus.dto.AIRecords;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ai")
@CrossOrigin(origins = "http://localhost:5173") // Allow frontend to call
public class AIController {

    private final AIService aiService;

    public AIController(AIService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/generate-ideas")
    public AIRecords.IdeaResponse generateIdeas(@RequestBody AIRecords.IdeaRequest request) {
        List<String> ideas = aiService.generateIdeas(request.category());
        return new AIRecords.IdeaResponse(ideas);
    }

    @PostMapping("/generate-description")
    public AIRecords.DescriptionResponse generateDescription(@RequestBody AIRecords.DescriptionRequest request) {
        String description = aiService.generateDescription(request.title());
        return new AIRecords.DescriptionResponse(description);
    }
}
