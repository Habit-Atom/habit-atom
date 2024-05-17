package org.example.habitatom.web;

import org.example.habitatom.models.TaskCompletion;
import org.example.habitatom.services.TaskCompletionService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskCompletionController {

    private final TaskCompletionService taskCompletionService;

    public TaskCompletionController(TaskCompletionService taskCompletionService) {
        this.taskCompletionService = taskCompletionService;
    }

    @GetMapping("")
    public List<TaskCompletion> getAllTasks(@RequestHeader(value = "Authorization") String authorizationHeader) {
        String token = authorizationHeader.replace("Bearer ", "");
        return this.taskCompletionService.getAllTasks();
    }
}
