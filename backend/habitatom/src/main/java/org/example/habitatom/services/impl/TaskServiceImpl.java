package org.example.habitatom.services.impl;


import org.example.habitatom.models.*;
import org.example.habitatom.models.enumeration.Day;
import org.example.habitatom.repository.ActiveDateRepository;
import org.example.habitatom.repository.TaskCompletionRepository;
import org.example.habitatom.repository.TaskRepository;
import org.example.habitatom.repository.UserRepository;
import org.example.habitatom.services.TaskCompletionService;
import org.example.habitatom.services.TaskService;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class TaskServiceImpl implements TaskService {
    private final UserRepository userRepository;
    private final TaskRepository taskRepository;
    private final TaskCompletionService taskCompletionService;
    private final ActiveDateRepository activeDateRepository;
    private final TaskCompletionRepository taskCompletionRepository;


    public TaskServiceImpl(UserRepository userRepository, TaskRepository taskRepository, TaskCompletionService taskCompletionService, ActiveDateRepository activeDateRepository, TaskCompletionRepository taskCompletionRepository) {
        this.userRepository = userRepository;
        this.taskRepository = taskRepository;
        this.taskCompletionService = taskCompletionService;
        this.activeDateRepository = activeDateRepository;
        this.taskCompletionRepository = taskCompletionRepository;
    }

    @Override
    public void addTask(String name, String duration, String color, List<String> dates, String userEmail) {
        AppUser user = userRepository.findByEmail(userEmail).get();
        Task task = new Task();
        task.setColor(color);
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

        List<LocalDate> datesPom = dates.stream()
                .map(dateString -> {
                    try {
                        return dateFormat.parse(dateString).toInstant()
                                .atZone(ZoneId.systemDefault())
                                .toLocalDate();
                    } catch (ParseException e) {
                        e.printStackTrace();
                        return null;
                    }
                })
                .toList();

        task.setActiveDates(datesPom.stream().map(d -> {
            ActiveDate activeDates = new ActiveDate();
            activeDates.setDate(d);
            activeDates.setTask(task);
            return activeDates;
        }).toList());
        task.setDuration(duration);
        task.setName(name);
        task.setUser(user);
        taskRepository.save(task);

        LocalDate today = LocalDate.now();
        for(int i = 0; i < 6; i++){
            taskCompletionService.createFutureTaskCompletions(today.minusDays(5).plusDays(i));
        }


    }

    @Override
    public void deleteTask(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Habit not found"));
        List<ActiveDate> activeDates = activeDateRepository.findByTask(task);
        activeDateRepository.deleteAll(activeDates);
        List<TaskCompletion> taskCompletions = taskCompletionRepository.findAllByTask(task);
        LocalDate today = LocalDate.now();
        taskCompletionRepository.deleteAll(taskCompletions.stream()
                .filter(tc -> tc.getDate().equals(today) || tc.getDate().isAfter(today))
                .toList());
    }
}
