package org.example.habitatom.services.impl;


import org.example.habitatom.models.AppUser;
import org.example.habitatom.models.DaysOfWeek;
import org.example.habitatom.models.Habit;
import org.example.habitatom.models.HabitCompletion;
import org.example.habitatom.models.enumeration.Day;
import org.example.habitatom.repository.DaysOfWeekRepository;
import org.example.habitatom.repository.HabitCompletionRepository;
import org.example.habitatom.repository.HabitRepository;
import org.example.habitatom.repository.UserRepository;
import org.example.habitatom.services.HabitCompletionService;
import org.example.habitatom.services.HabitService;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class HabitServiceImpl implements HabitService {

    private final UserRepository userRepository;
    private final DaysOfWeekRepository daysOfWeekRepository;
    private final HabitRepository habitRepository;
    private final HabitCompletionService habitCompletionService;
    private final HabitCompletionRepository habitCompletionRepository;

    public HabitServiceImpl(UserRepository userRepository, DaysOfWeekRepository daysOfWeekRepository, HabitRepository habitRepository, HabitCompletionService habitCompletionService, HabitCompletionRepository habitCompletionRepository) {
        this.userRepository = userRepository;
        this.daysOfWeekRepository = daysOfWeekRepository;
        this.habitRepository = habitRepository;
        this.habitCompletionService = habitCompletionService;
        this.habitCompletionRepository = habitCompletionRepository;
    }

    @Override
    public void addHabit(String name, String duration, String color, List<String> days, String userEmail) {
        AppUser user = userRepository.findByEmail(userEmail).get();
        Habit habit = new Habit();
        habit.setColor(color);
        habit.setDays(days.stream()
                .map(day -> {
                    DaysOfWeek daysOfWeek = new DaysOfWeek();
                    daysOfWeek.setDay(Day.fromString(day));
                    daysOfWeek.setHabit(habit);
                    return daysOfWeek;
                })
                .collect(Collectors.toList()));
        habit.setDuration(duration);
        habit.setName(name);
        habit.setUser(user);
        habitRepository.save(habit);

        LocalDate today = LocalDate.now();
        for(int i = 0; i < 6; i++){
            habitCompletionService.createFutureHabitCompletions(today.minusDays(5).plusDays(i));
        }
    }

    @Override
    public void deleteHabit(Long id) {
        Habit habit = habitRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Habit not found"));
        List<DaysOfWeek> daysOfWeeks = daysOfWeekRepository.findByHabit(habit);
        daysOfWeekRepository.deleteAll(daysOfWeeks);
        List<HabitCompletion> habitCompletions = habitCompletionRepository.findAllByHabit(habit);
        LocalDate today = LocalDate.now();
        habitCompletionRepository.deleteAll(habitCompletions.stream()
                .filter(hc -> hc.getDate().equals(today) || hc.getDate().isAfter(today))
                .toList());

    }
}
