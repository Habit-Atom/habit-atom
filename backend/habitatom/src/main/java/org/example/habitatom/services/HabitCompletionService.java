package org.example.habitatom.services;

import org.example.habitatom.models.Habit;
import org.example.habitatom.models.HabitCompletion;

import java.time.LocalDate;
import java.util.List;

public interface HabitCompletionService {
    List<HabitCompletion> getAllHabits(String email, LocalDate date);
    void createFutureHabitCompletions(LocalDate date);
    void updateHabitStatus(Long id);
}
