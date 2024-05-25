package org.example.habitatom.services.impl;

import org.example.habitatom.models.*;
import org.example.habitatom.repository.ActiveDateRepository;
import org.example.habitatom.repository.TaskCompletionRepository;
import org.example.habitatom.services.TaskCompletionService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class TaskCompletionServiceImpl implements TaskCompletionService {

    private final TaskCompletionRepository taskCompletionRepository;
    private final ActiveDateRepository activeDateRepository;

    public TaskCompletionServiceImpl(TaskCompletionRepository taskCompletionRepository, ActiveDateRepository activeDateRepository) {
        this.taskCompletionRepository = taskCompletionRepository;
        this.activeDateRepository = activeDateRepository;
    }
    @Override
    public List<TaskCompletion> getAllTasks(String email, LocalDate date) {
        return taskCompletionRepository.findAllByUserEmailAndDate(email, date);
    }

    @Transactional
    public void createFutureTaskCompletions(LocalDate date) {
        LocalDate futureDate = date.plusDays(5);

        List<ActiveDate> dates = activeDateRepository.findByDate(futureDate);

        for (ActiveDate d : dates) {
            Task task = d.getTask();
            if (!taskCompletionRepository.existsByTaskAndDate(task, date)) {
                TaskCompletion taskCompletion = new TaskCompletion();
                taskCompletion.setTask(task);
                taskCompletion.setDate(date);
                taskCompletion.setCompleted(false);
            }
        }
    }

    @Override
    public void updateTaskStatus(Long id) {
        TaskCompletion taskCompletion = taskCompletionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Habit not found"));
        taskCompletion.setCompleted(!taskCompletion.isCompleted());
        taskCompletionRepository.save(taskCompletion);

    }
}
