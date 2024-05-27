package org.example.habitatom.web;


import org.example.habitatom.dto.PieChartData;
import org.example.habitatom.models.CalendarDates;
import org.example.habitatom.models.HabitCompletion;

import org.example.habitatom.services.CalendarDatesService;
import org.example.habitatom.services.JwtService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api/statistics")
public class StatisticsController {
    private final CalendarDatesService calendarDatesService;
    private final JwtService jwtService;

    public StatisticsController(CalendarDatesService calendarDatesService, JwtService jwtService) {
        this.calendarDatesService = calendarDatesService;
        this.jwtService = jwtService;
    }


    @GetMapping("/dates")
    public List<CalendarDates> getAllHabits(@RequestHeader(value = "Authorization") String authorizationHeader) {
        String token = authorizationHeader.replace("Bearer ", "");
        String userEmail = jwtService.extractUserName(token);
        return this.calendarDatesService.getDates(userEmail);
    }

    @GetMapping("/lineChart")
    public List<Double> getDataForLineChart(@RequestHeader(value = "Authorization") String authorizationHeader) {
        String token = authorizationHeader.replace("Bearer ", "");
        String userEmail = jwtService.extractUserName(token);
        return this.calendarDatesService.getDataForLineChart(userEmail);
    }

    @GetMapping("/pieChart")
    public HashMap<String, PieChartData> getDataForPieChart(@RequestHeader(value = "Authorization") String authorizationHeader) {
        String token = authorizationHeader.replace("Bearer ", "");
        String userEmail = jwtService.extractUserName(token);
        return this.calendarDatesService.getDataForPieChart(userEmail);
    }

}
