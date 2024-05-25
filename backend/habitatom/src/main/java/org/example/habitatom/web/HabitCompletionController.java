package org.example.habitatom.web;

import org.example.habitatom.dto.UpdateRequest;
import org.example.habitatom.models.HabitCompletion;
import org.example.habitatom.services.HabitCompletionService;
import org.example.habitatom.services.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/habits")
public class HabitCompletionController {

    private final HabitCompletionService habitCompletionService;
    private final JwtService jwtService;

    public HabitCompletionController(HabitCompletionService habitCompletionService, JwtService jwtService) {
        this.habitCompletionService = habitCompletionService;
        this.jwtService = jwtService;
    }

    @GetMapping("")
    public List<HabitCompletion> getAllHabits(@RequestHeader(value = "Authorization") String authorizationHeader) {
        String token = authorizationHeader.replace("Bearer ", "");
        String userEmail = jwtService.extractUserName(token);
        return this.habitCompletionService.getAllHabits(userEmail);
    }
    @PostMapping("/updateStatus")
    public ResponseEntity<Void> updateHabitStatus(@RequestBody UpdateRequest updateRequest) {
        try {
            habitCompletionService.updateHabitStatus(updateRequest.getId());
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
