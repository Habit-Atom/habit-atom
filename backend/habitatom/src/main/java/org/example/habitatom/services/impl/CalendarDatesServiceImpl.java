package org.example.habitatom.services.impl;

import org.example.habitatom.dto.PieChartData;
import org.example.habitatom.models.CalendarDates;
import org.example.habitatom.models.HabitCompletion;
import org.example.habitatom.models.TaskCompletion;
import org.example.habitatom.repository.CalendarDatesRepository;
import org.example.habitatom.repository.HabitCompletionRepository;
import org.example.habitatom.services.CalendarDatesService;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
public class CalendarDatesServiceImpl implements CalendarDatesService {
    private final CalendarDatesRepository calendarDatesRepository;
    private final HabitCompletionRepository habitCompletionRepository;

    public CalendarDatesServiceImpl(CalendarDatesRepository calendarDatesRepository, HabitCompletionRepository habitCompletionRepository) {
        this.calendarDatesRepository = calendarDatesRepository;
        this.habitCompletionRepository = habitCompletionRepository;
    }

    @Override
    public List<CalendarDates> getDates(String email) {
        return calendarDatesRepository.findAllByUserEmail(email);
    }

    @Override
    public List<Double> getDataForLineChart(String userEmail) {
        LocalDate today = LocalDate.now();

        LocalDate startOfWeek = today.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        List<LocalDate> currentWeekDates = new ArrayList<>();

        for (LocalDate date = startOfWeek; !date.isAfter(today); date = date.plusDays(1)) {
            currentWeekDates.add(date);
        }
        List<CalendarDates> calendarDatesList = new ArrayList<>();
        for (LocalDate currentWeekDate : currentWeekDates) {
            CalendarDates calendarDates = calendarDatesRepository.findByUserEmailAndDate(userEmail, currentWeekDate);
            if(calendarDates != null){
                calendarDatesList.add(calendarDates);
            }else{
                CalendarDates temp = new CalendarDates();
                temp.setDate(currentWeekDate);
                temp.setPercentOfCompletion(0);
                calendarDatesList.add(temp);
            }

        }
        return calendarDatesList.stream().map(CalendarDates::getPercentOfCompletion).toList();
    }

    @Override
    public HashMap<String, PieChartData> getDataForPieChart(String userEmail) {
        LocalDate today = LocalDate.now();

        LocalDate startOfWeek = today.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        List<LocalDate> currentWeekDates = new ArrayList<>();

        for (LocalDate date = startOfWeek; !date.isAfter(today); date = date.plusDays(1)) {
            currentWeekDates.add(date);
        }

        List<HabitCompletion> habits = new ArrayList<>();

        for (LocalDate currentWeekDate : currentWeekDates) {
            List<HabitCompletion> habitCompletions = habitCompletionRepository.findAllByUserEmailAndDate(userEmail, currentWeekDate);

            if(!habitCompletions.isEmpty()){
                habits.addAll(habitCompletions);
            }
        }

        HashMap<String, PieChartData> habitsMap = new HashMap<>();
        String notCompleted = "Not Completed";
        for (HabitCompletion habit : habits) {
            if(!habit.isCompleted()){
                if(!habitsMap.containsKey(notCompleted)){
                    habitsMap.put(notCompleted, new PieChartData());
                }
                PieChartData pieChartData = habitsMap.get(notCompleted);
                pieChartData.setValue(habitsMap.get(notCompleted).getValue() + 1);
                habitsMap.put(notCompleted, pieChartData);
            }else{
                if(!habitsMap.containsKey(habit.getHabit().getName())){
                    PieChartData pieChartData = new PieChartData();
                    pieChartData.setColor(habit.getHabit().getColor());
                    habitsMap.put(habit.getHabit().getName(), pieChartData);
                }
                PieChartData pieChartData = habitsMap.get(habit.getHabit().getName());
                pieChartData.setValue(habitsMap.get(habit.getHabit().getName()).getValue() + 1);
                habitsMap.put(habit.getHabit().getName(), pieChartData);

            }

        }

        return habitsMap;
    }
}
