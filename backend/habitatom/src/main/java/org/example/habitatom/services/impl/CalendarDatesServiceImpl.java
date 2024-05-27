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

    private List<LocalDate> getCurrentWeekDates(){
        LocalDate today = LocalDate.now();

        LocalDate startOfWeek = today.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        List<LocalDate> currentWeekDates = new ArrayList<>();

        for (LocalDate date = startOfWeek; !date.isAfter(today); date = date.plusDays(1)) {
            currentWeekDates.add(date);
        }

        return currentWeekDates;
    }

    private List<LocalDate> getCurrentMonthDates(){
        LocalDate today = LocalDate.now();

        LocalDate firstDayOfMonth = today.withDayOfMonth(1);
        LocalDate lastDayOfMonth = today.withDayOfMonth(today.lengthOfMonth());

        List<LocalDate> currentMonthDates = new ArrayList<>();
        for (LocalDate date = firstDayOfMonth; !date.isAfter(lastDayOfMonth); date = date.plusDays(1)) {
            currentMonthDates.add(date);
        }

        return currentMonthDates;

    }

    @Override
    public List<Double> getDataForLineChartWeekly(String userEmail) {
        List<LocalDate> currentWeekDates = getCurrentWeekDates();
        return getDataForLineChart(userEmail, currentWeekDates);
    }

    @Override
    public HashMap<String, PieChartData> getDataForPieChartWeekly(String userEmail) {
        List<LocalDate> currentWeekDates = getCurrentWeekDates();
        return getDataForPieChart(userEmail, currentWeekDates);
    }

    @Override
    public List<Double> getDataForLineChartMonthly(String userEmail) {
        List<LocalDate> currentMonthDates = getCurrentMonthDates();
        List<Double> monthlyData = getDataForLineChart(userEmail, currentMonthDates);
        return groupDataIntoWeeks(monthlyData);
    }

    private List<Double> groupDataIntoWeeks(List<Double> monthlyData) {
        List<Double> weeklyData = new ArrayList<>();
        int totalDays = monthlyData.size();
        int fullWeeks = totalDays / 7;
        int remainingDays = totalDays % 7;

        for (int i = 0; i < fullWeeks; i++) {
            int start = i * 7;
            int end = start + 7;
            List<Double> weekData = monthlyData.subList(start, end);
            double weeklyAverage = weekData.stream().mapToDouble(Double::doubleValue).average().orElse(0.0);
            weeklyData.add(weeklyAverage);
        }

        if (remainingDays > 0) {
            List<Double> lastWeekData = monthlyData.subList(fullWeeks * 7, totalDays);
            double lastWeekAverage = lastWeekData.stream().mapToDouble(Double::doubleValue).average().orElse(0.0);
            weeklyData.add(lastWeekAverage);
        }

        return weeklyData;
    }

    @Override
    public HashMap<String, PieChartData> getDataForPieChartMonthly(String userEmail) {
        List<LocalDate> currentMonthDates = getCurrentMonthDates();
        return getDataForPieChart(userEmail, currentMonthDates);
    }


    private List<Double> getDataForLineChart(String email, List<LocalDate> dates){
        List<CalendarDates> calendarDatesList = new ArrayList<>();

        for (LocalDate currentWeekDate : dates) {
            CalendarDates calendarDates = calendarDatesRepository.findByUserEmailAndDate(email, currentWeekDate);
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

    private HashMap<String, PieChartData> getDataForPieChart(String email, List<LocalDate> dates){
        List<HabitCompletion> habits = new ArrayList<>();

        for (LocalDate currentWeekDate : dates) {
            List<HabitCompletion> habitCompletions = habitCompletionRepository.findAllByUserEmailAndDate(email, currentWeekDate);

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
