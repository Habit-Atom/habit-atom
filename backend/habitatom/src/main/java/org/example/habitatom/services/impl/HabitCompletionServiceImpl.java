package org.example.habitatom.services.impl;

import org.example.habitatom.models.DaysOfWeek;
import org.example.habitatom.models.Habit;
import org.example.habitatom.models.HabitCompletion;
import org.example.habitatom.models.enumeration.Day;
import org.example.habitatom.repository.DaysOfWeekRepository;
import org.example.habitatom.repository.HabitCompletionRepository;
import org.example.habitatom.services.HabitCompletionService;
import org.example.habitatom.utils.DayUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;

@Service
public class HabitCompletionServiceImpl implements HabitCompletionService {
    private final DaysOfWeekRepository daysOfWeekRepository;
    private final HabitCompletionRepository habitCompletionRepository;

    public HabitCompletionServiceImpl(DaysOfWeekRepository daysOfWeekRepository, HabitCompletionRepository habitCompletionRepository) {
        this.daysOfWeekRepository = daysOfWeekRepository;
        this.habitCompletionRepository = habitCompletionRepository;
    }

    @Override
    public List<HabitCompletion> getAllHabits(String email, LocalDate date) {
        return habitCompletionRepository.findAllByUserEmailAndDate(email, date);
    }

    @Transactional
    public void createFutureHabitCompletions(LocalDate date) {
        DayOfWeek futureDayOfWeek = date.plusDays(5).getDayOfWeek();
        Day futureDay = DayUtils.transformToDay(futureDayOfWeek);

        List<DaysOfWeek> habitsForToday = daysOfWeekRepository.findByDay(futureDay);

        for (DaysOfWeek daysOfWeek : habitsForToday) {
            Habit habit = daysOfWeek.getHabit();
            if (!habitCompletionRepository.existsByHabitAndDate(habit, date)) {
                HabitCompletion habitCompletion = new HabitCompletion();
                habitCompletion.setHabit(habit);
                habitCompletion.setDate(date);
                habitCompletion.setCompleted(false);
                habitCompletionRepository.save(habitCompletion);
            }
        }
    }

    @Override
    public void updateHabitStatus(Long id) {
        HabitCompletion habitCompletion = habitCompletionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Habit not found"));
        habitCompletion.setCompleted(!habitCompletion.isCompleted());
        habitCompletionRepository.save(habitCompletion);

    }
}
