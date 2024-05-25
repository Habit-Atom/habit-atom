package org.example.habitatom.services.impl;


import org.example.habitatom.models.ActiveDate;
import org.example.habitatom.models.AppUser;
import org.example.habitatom.models.DaysOfWeek;
import org.example.habitatom.models.Task;
import org.example.habitatom.models.enumeration.Day;
import org.example.habitatom.repository.TaskRepository;
import org.example.habitatom.repository.UserRepository;
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


    public TaskServiceImpl(UserRepository userRepository, TaskRepository taskRepository) {
        this.userRepository = userRepository;
        this.taskRepository = taskRepository;
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
    }
}
