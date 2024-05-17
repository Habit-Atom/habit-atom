package org.example.habitatom.services;

import org.example.habitatom.models.Habit;

import java.util.List;

public interface HabitService {
    List<Habit> getAllHabits();
    void createDailyHabitCompletions();
}
