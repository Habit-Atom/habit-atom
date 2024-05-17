package org.example.habitatom.services.impl;

import org.example.habitatom.models.DaysOfWeek;
import org.example.habitatom.models.Habit;
import org.example.habitatom.models.HabitCompletion;
import org.example.habitatom.models.enumeration.Day;
import org.example.habitatom.repository.DaysOfWeekRepository;
import org.example.habitatom.repository.HabitCompletionRepository;
import org.example.habitatom.repository.HabitRepository;
import org.example.habitatom.services.HabitService;
import org.example.habitatom.utils.DayUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;

@Service
public class HabitServiceImpl implements HabitService {
    private final HabitRepository habitRepository;
    private final DaysOfWeekRepository daysOfWeekRepository;
    private final HabitCompletionRepository habitCompletionRepository;

    public HabitServiceImpl(HabitRepository habitRepository, DaysOfWeekRepository daysOfWeekRepository, HabitCompletionRepository habitCompletionRepository) {
        this.habitRepository = habitRepository;
        this.daysOfWeekRepository = daysOfWeekRepository;
        this.habitCompletionRepository = habitCompletionRepository;
    }

    @Override
    public List<Habit> getAllHabits() {
        return habitRepository.findAll();
    }

    @Transactional
    public void createDailyHabitCompletions() {
        DayOfWeek currentDayOfWeek = LocalDate.now().getDayOfWeek();
        Day currentDay = DayUtils.transformToDay(currentDayOfWeek);

        List<DaysOfWeek> habitsForToday = daysOfWeekRepository.findByDay(currentDay);

        for (DaysOfWeek daysOfWeek : habitsForToday) {
            Habit habit = daysOfWeek.getHabit();
            LocalDate today = LocalDate.now();

            if (!habitCompletionRepository.existsByHabitAndDate(habit, today)) {
                HabitCompletion habitCompletion = new HabitCompletion();
                habitCompletion.setHabit(habit);
                habitCompletion.setDate(today);
                habitCompletion.setCompleted(false);
                habitCompletionRepository.save(habitCompletion);
            }
        }
    }
}
