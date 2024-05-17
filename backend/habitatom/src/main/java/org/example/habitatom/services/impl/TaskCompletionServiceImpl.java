package org.example.habitatom.services.impl;

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
    public List<TaskCompletion> getAllTasks() {
        return taskCompletionRepository.findAll();
    }
}
