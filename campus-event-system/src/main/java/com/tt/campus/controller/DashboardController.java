package com.tt.campus.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.tt.campus.service.DashboardService;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/top-events")
    public List<Object[]> getTopEvents() {
        return dashboardService.getTopEvents();
    }
    
    
    @GetMapping("/trending")
    public List<Object[]> getTrendingEvents() {
        return dashboardService.getTrendingEvents();
    }

}