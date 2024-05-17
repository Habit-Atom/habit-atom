package org.example.habitatom.web;

import org.example.habitatom.models.HabitCompletion;
import org.example.habitatom.services.HabitCompletionService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/habits")
public class HabitCompletionController {

    private final HabitCompletionService habitCompletionService;

    public HabitCompletionController(HabitCompletionService habitCompletionService) {
        this.habitCompletionService = habitCompletionService;
    }

    @GetMapping("")
    public List<HabitCompletion> getAllHabits(@RequestHeader(value = "Authorization") String authorizationHeader) {
        String token = authorizationHeader.replace("Bearer ", "");
        return this.habitCompletionService.getAllHabits();
    }
}
