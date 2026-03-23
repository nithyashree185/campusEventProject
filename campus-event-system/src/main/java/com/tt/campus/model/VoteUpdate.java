package com.tt.campus.model;

public class VoteUpdate {

    private int eventId;
    private int voteCount;

    public VoteUpdate() {}

    public VoteUpdate(int eventId, int voteCount) {
        this.eventId = eventId;
        this.voteCount = voteCount;
    }

    public int getEventId() {
        return eventId;
    }

    public void setEventId(int eventId) {
        this.eventId = eventId;
    }

    public int getVoteCount() {
        return voteCount;
    }

    public void setVoteCount(int voteCount) {
        this.voteCount = voteCount;
    }
}