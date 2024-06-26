package org.example.habitatom.web;


import org.example.habitatom.dto.AddTaskRequest;
import org.example.habitatom.dto.IdRequest;
import org.example.habitatom.models.TaskCompletion;
import org.example.habitatom.services.JwtService;
import org.example.habitatom.services.TaskCompletionService;
import org.example.habitatom.services.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskCompletionController {

    private final TaskCompletionService taskCompletionService;
    private final TaskService taskService;
    private final JwtService jwtService;

    public TaskCompletionController(TaskCompletionService taskCompletionService, TaskService taskService, JwtService jwtService) {
        this.taskCompletionService = taskCompletionService;
        this.taskService = taskService;
        this.jwtService = jwtService;
    }

    @GetMapping("")
    public List<TaskCompletion> getAllTasks(@RequestHeader(value = "Authorization") String authorizationHeader,@RequestParam LocalDate date) {
        String token = authorizationHeader.replace("Bearer ", "");
        String userEmail = jwtService.extractUserName(token);
        return this.taskCompletionService.getAllTasks(userEmail, date);
    }
    @PostMapping("/updateStatus")
    public ResponseEntity<Void> updateHabitStatus(@RequestHeader(value = "Authorization") String authorizationHeader, @RequestBody IdRequest idRequest) {
        try {
            taskCompletionService.updateTaskStatus(idRequest.getId());
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/delete")
    public ResponseEntity<Void> deleteTask(@RequestHeader(value = "Authorization") String authorizationHeader, @RequestBody IdRequest idRequest) {
        try {
            taskService.deleteTask(idRequest.getId());
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/add")
    public void addTask(@RequestHeader(value = "Authorization") String authorizationHeader, @RequestBody AddTaskRequest addTaskRequest){
        String token = authorizationHeader.replace("Bearer ", "");
        String userEmail = jwtService.extractUserName(token);
        taskService.addTask(addTaskRequest.getName(), addTaskRequest.getDuration(), addTaskRequest.getColor(), addTaskRequest.getIcon(),addTaskRequest.getActiveDates(), userEmail);
    }
}
