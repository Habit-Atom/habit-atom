package org.example.habitatom.services.impl;

import org.example.habitatom.models.HabitCompletion;
import org.example.habitatom.models.TaskCompletion;
import org.example.habitatom.repository.TaskCompletionRepository;
import org.example.habitatom.services.TaskCompletionService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskCompletionServiceImpl implements TaskCompletionService {

    private final TaskCompletionRepository taskCompletionRepository;

    public TaskCompletionServiceImpl(TaskCompletionRepository taskCompletionRepository) {
        this.taskCompletionRepository = taskCompletionRepository;
    }
    @Override
    public List<TaskCompletion> getAllTasks(String email) {
        return taskCompletionRepository.findAllByUserEmail(email);
    }

    @Override
    public void updateTaskStatus(Long id) {
        TaskCompletion taskCompletion = taskCompletionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Habit not found"));
        taskCompletion.setCompleted(!taskCompletion.isCompleted());
        taskCompletionRepository.save(taskCompletion);

    }
}
