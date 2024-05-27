package org.example.habitatom.config;


import org.example.habitatom.models.*;
import org.example.habitatom.repository.*;
import org.example.habitatom.services.HabitCompletionService;
import org.example.habitatom.services.TaskCompletionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Component
public class CompletionScheduler {
    @Autowired
    private HabitCompletionService habitCompletionService;
    @Autowired
    private TaskCompletionService taskCompletionService;
    @Autowired
    private LastUpdateDateRepository lastUpdateDateRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private HabitCompletionRepository habitCompletionRepository;
    @Autowired
    private TaskCompletionRepository taskCompletionRepository;
    @Autowired
    private CalendarDatesRepository datesRepository;
    @Autowired
    private CalendarDatesRepository calendarDatesRepository;

    @Scheduled(cron = "0 * * * * ?") // Runs at the start of every minute
    public void scheduleHourlyCompletionTask() {
        LocalDate today = LocalDate.now();
        LocalDate prevSavedDate = lastUpdateDateRepository.findAll().get(0).getDate();
        long daysBetween = ChronoUnit.DAYS.between(prevSavedDate, today);
        if (daysBetween >= 1) {
            for(int i=0; i<daysBetween; i++) {
                LocalDate temp = today.plusDays(i);
                habitCompletionService.createFutureHabitCompletions(temp);
                taskCompletionService.createFutureTaskCompletions(temp);

                temp = prevSavedDate.plusDays(i);
                addCalendarDates(temp);
            }

            lastUpdateDateRepository.deleteAll();
            LastUpdateDate lastUpdateDate = new LastUpdateDate();
            lastUpdateDate.setDate(today);
            lastUpdateDateRepository.save(lastUpdateDate);
        }
        addCalendarDates(today);
    }

    private void addCalendarDates(LocalDate date) {
        List<AppUser> users = userRepository.findAll();
        final double TOLERANCE = 0.0001;

        for (AppUser user : users) {
            List<HabitCompletion> habits = habitCompletionRepository.findAllByUserEmailAndDate(user.getEmail(), date);
            List<TaskCompletion> tasks = taskCompletionRepository.findAllByUserEmailAndDate(user.getEmail(), date);

            long completedHabits = habits.stream().filter(HabitCompletion::isCompleted).count();
            long completedTasks = tasks.stream().filter(TaskCompletion::isCompleted).count();

            int totalItems = habits.size() + tasks.size();
            double percent = 0.0;

            if (totalItems > 0) {
                percent = (double) (completedHabits + completedTasks) / totalItems * 100;
            }

            CalendarDates existingCalendarDate = calendarDatesRepository.findByUserAndDate(user, date);
            if (existingCalendarDate != null) {
                if (Math.abs(existingCalendarDate.getPercentOfCompletion() - percent) > TOLERANCE) {
                    existingCalendarDate.setPercentOfCompletion(percent);
                    datesRepository.save(existingCalendarDate);
                }
            } else {
                CalendarDates calendarDate = new CalendarDates();
                calendarDate.setDate(date);
                calendarDate.setUser(user);
                calendarDate.setPercentOfCompletion(percent);
                datesRepository.save(calendarDate);
            }
        }
    }



}
