package org.example.habitatom.config;

import org.example.habitatom.models.LastUpdateDate;
import org.example.habitatom.repository.LastUpdateDateRepository;
import org.example.habitatom.services.HabitCompletionService;
import org.example.habitatom.services.TaskCompletionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Component
public class CompletionScheduler {
    @Autowired
    private HabitCompletionService habitCompletionService;
    @Autowired
    private TaskCompletionService taskCompletionService;
    @Autowired
    private LastUpdateDateRepository lastUpdateDateRepository;

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
            }
            lastUpdateDateRepository.deleteAll();
            lastUpdateDateRepository.save(new LastUpdateDate((long) 1, today));
        }

    }
}
