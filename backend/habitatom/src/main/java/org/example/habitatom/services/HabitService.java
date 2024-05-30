package org.example.habitatom.services;

import org.example.habitatom.models.Habit;

import java.util.List;

public interface HabitService {
    public void addHabit(String name, String duration, String color, List<String> days, String userEmail);

    void deleteHabit(Long id);
}
