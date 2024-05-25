package org.example.habitatom.web;


import org.example.habitatom.dto.UpdateRequest;
import org.example.habitatom.models.TaskCompletion;
import org.example.habitatom.services.JwtService;
import org.example.habitatom.services.TaskCompletionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskCompletionController {

    private final TaskCompletionService taskCompletionService;
    private final JwtService jwtService;

    public TaskCompletionController(TaskCompletionService taskCompletionService, JwtService jwtService) {
        this.taskCompletionService = taskCompletionService;
        this.jwtService = jwtService;
    }

    @GetMapping("")
    public List<TaskCompletion> getAllTasks(@RequestHeader(value = "Authorization") String authorizationHeader) {
        String token = authorizationHeader.replace("Bearer ", "");
        String userEmail = jwtService.extractUserName(token);
        return this.taskCompletionService.getAllTasks(userEmail);
    }

    @PostMapping("/updateStatus")
    public ResponseEntity<Void> updateHabitStatus(@RequestBody UpdateRequest updateRequest) {
        try {
            taskCompletionService.updateTaskStatus(updateRequest.getId());
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
