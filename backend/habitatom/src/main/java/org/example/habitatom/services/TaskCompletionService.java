package org.example.habitatom.services;


import org.example.habitatom.models.TaskCompletion;

import java.time.LocalDate;
import java.util.List;

public interface TaskCompletionService {
    List<TaskCompletion> getAllTasks(String email, LocalDate date);
    void updateTaskStatus(Long id);
    void createFutureTaskCompletions(LocalDate date);
}
