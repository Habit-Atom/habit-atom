package org.example.habitatom.services;


import org.example.habitatom.models.TaskCompletion;

import java.util.List;

public interface TaskCompletionService {
    List<TaskCompletion> getAllTasks(String email);
    void updateTaskStatus(Long id);
}
