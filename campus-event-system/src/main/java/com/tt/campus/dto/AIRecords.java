package com.tt.campus.dto;

import java.util.List;

public class AIRecords {
    public record IdeaRequest(String category) {}
    public record IdeaResponse(List<String> ideas) {}
    public record DescriptionRequest(String title) {}
    public record DescriptionResponse(String description) {}
}
