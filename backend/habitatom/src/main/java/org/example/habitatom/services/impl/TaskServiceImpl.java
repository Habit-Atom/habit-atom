package org.example.habitatom.services.impl;

import org.example.habitatom.models.Task;
import org.example.habitatom.repository.TaskRepository;
import org.example.habitatom.services.TaskService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {
    private final TaskRepository taskRepository;

    public TaskServiceImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }
    @Override
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }
}
