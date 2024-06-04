package org.example.habitatom.services;

import org.example.habitatom.models.Task;

import java.util.List;

public interface TaskService {
    public void addTask(String name, String duration, String color, String icon,List<String> dates, String userEmail);

    void deleteTask(Long id);
}
