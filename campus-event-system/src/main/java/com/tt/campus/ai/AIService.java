package com.tt.campus.ai;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@Service
public class AIService {

    private final RestTemplate restTemplate;

    @Value("${ai.api.key:placeholder_key}")
    private String apiKey;

    @Value("${ai.api.url:https://api.openai.com/v1/chat/completions}")
    private String apiUrl;

    public AIService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public List<String> generateIdeas(String category) {
        String prompt = "Generate 5 creative campus event ideas for the category: " + category;
        System.out.println("Generating ideas for: " + prompt);
        
        try {
            // Placeholder for real AI API call
            // This is a generic OpenAI-style request structure:
            /*
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Authorization", "Bearer " + apiKey);

            Map<String, Object> body = Map.of(
                "model", "gpt-3.5-turbo",
                "messages", List.of(Map.of("role", "user", "content", prompt))
            );

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);
            ResponseEntity<Map> response = restTemplate.postForEntity(apiUrl, entity, Map.class);
            // Parse response...
            */

            // For now, let's provide simulated AI responses based on category
            if (category.equalsIgnoreCase("Tech")) {
                return Arrays.asList("AI Hackathon 2024", "Cybersecurity Capture the Flag", "Cloud Computing Workshop", "Robotics Showcase", "Blockchain for Beginners");
            } else if (category.equalsIgnoreCase("Cultural")) {
                return Arrays.asList("International Food Fest", "Open Mic Poetry Night", "Heritage Art Exhibition", "Fusion Music Concert", "Traditional Dance Workshop");
            } else if (category.equalsIgnoreCase("Sports")) {
                return Arrays.asList("Midnight Basketball Tournament", "Campus Marathon", "E-Sports Championship", "Yoga & Wellness Retreat", "3v3 Inter-Collegiate Soccer");
            }
        } catch (Exception e) {
            System.err.println("AI Generation failed: " + e.getMessage());
        }

        return Arrays.asList("Creative Idea 1", "Creative Idea 2", "Creative Idea 3", "Creative Idea 4", "Creative Idea 5");
    }

    public String generateDescription(String title) {
        String prompt = "Generate a short (under 200 characters) event description for: " + title;
        System.out.println("Generating description for: " + prompt);
        
        try {
            // Shortened simulated AI description (safe for VARCHAR(255))
            return "Join us for an exciting " + title + "! An engaging campus event to learn, network, and build skills. Don't miss this chance to grow and connect with your peers!";
        } catch (Exception e) {
            return "A fantastic campus event focusing on " + title + ". Come join us for a day of learning and fun!";
        }
    }
}
