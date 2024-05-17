package org.example.habitatom.services;

import org.example.habitatom.models.Habit;
import org.example.habitatom.models.HabitCompletion;

import java.util.List;

public interface HabitCompletionService {
    List<HabitCompletion> getAllHabits();
    void createDailyHabitCompletions();
}
