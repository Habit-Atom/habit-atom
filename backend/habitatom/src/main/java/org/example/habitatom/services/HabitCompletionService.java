package org.example.habitatom.services;

import org.example.habitatom.models.Habit;
import org.example.habitatom.models.HabitCompletion;

import java.util.List;

public interface HabitCompletionService {
    List<HabitCompletion> getAllHabits(String email);
    void createDailyHabitCompletions();
    void updateHabitStatus(Long id);
}
