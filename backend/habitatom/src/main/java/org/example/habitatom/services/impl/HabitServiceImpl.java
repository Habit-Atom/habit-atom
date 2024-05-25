package org.example.habitatom.services.impl;


import org.example.habitatom.models.AppUser;
import org.example.habitatom.models.DaysOfWeek;
import org.example.habitatom.models.Habit;
import org.example.habitatom.models.enumeration.Day;
import org.example.habitatom.repository.DaysOfWeekRepository;
import org.example.habitatom.repository.HabitRepository;
import org.example.habitatom.repository.UserRepository;
import org.example.habitatom.services.HabitService;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class HabitServiceImpl implements HabitService {

    private final UserRepository userRepository;
    private final DaysOfWeekRepository daysOfWeekRepository;
    private final HabitRepository habitRepository;

    public HabitServiceImpl(UserRepository userRepository, DaysOfWeekRepository daysOfWeekRepository, HabitRepository habitRepository) {
        this.userRepository = userRepository;
        this.daysOfWeekRepository = daysOfWeekRepository;
        this.habitRepository = habitRepository;
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
    }
}
