package org.example.habitatom.web;

import org.example.habitatom.dto.AddHabitRequest;
import org.example.habitatom.dto.IdRequest;
import org.example.habitatom.models.HabitCompletion;
import org.example.habitatom.services.HabitCompletionService;
import org.example.habitatom.services.HabitService;
import org.example.habitatom.services.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/habits")
public class HabitCompletionController {

    private final HabitCompletionService habitCompletionService;
    private final HabitService habitService;

    private final JwtService jwtService;

    public HabitCompletionController(HabitCompletionService habitCompletionService, HabitService habitService, JwtService jwtService) {
        this.habitCompletionService = habitCompletionService;
        this.habitService = habitService;
        this.jwtService = jwtService;
    }

    @GetMapping("")
    public List<HabitCompletion> getAllHabits(@RequestHeader(value = "Authorization") String authorizationHeader, @RequestParam LocalDate date) {
        String token = authorizationHeader.replace("Bearer ", "");
        String userEmail = jwtService.extractUserName(token);
        return this.habitCompletionService.getAllHabits(userEmail, date);
    }
    @PostMapping("/updateStatus")
    public ResponseEntity<Void> updateHabitStatus(@RequestHeader(value = "Authorization") String authorizationHeader, @RequestBody IdRequest idRequest) {
        try {
            habitCompletionService.updateHabitStatus(idRequest.getId());
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/delete")
    public ResponseEntity<Void> deleteHabit(@RequestHeader(value = "Authorization") String authorizationHeader, @RequestBody IdRequest idRequest) {
        try {
            habitService.deleteHabit(idRequest.getId());
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/add")
    public void addHabit(@RequestHeader(value = "Authorization") String authorizationHeader, @RequestBody AddHabitRequest addHabitRequest){
        String token = authorizationHeader.replace("Bearer ", "");
        String userEmail = jwtService.extractUserName(token);
        habitService.addHabit(addHabitRequest.getName(), addHabitRequest.getDuration(), addHabitRequest.getColor(), addHabitRequest.getIcon(),addHabitRequest.getSelectedDaysOfWeek(), userEmail);
    }
}
