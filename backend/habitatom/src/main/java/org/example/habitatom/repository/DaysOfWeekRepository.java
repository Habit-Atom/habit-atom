package org.example.habitatom.repository;

import org.example.habitatom.models.ActiveDate;
import org.example.habitatom.models.DaysOfWeek;
import org.example.habitatom.models.Habit;
import org.example.habitatom.models.enumeration.Day;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface DaysOfWeekRepository extends JpaRepository<DaysOfWeek, Long> {
    List<DaysOfWeek> findByDay(Day day);

    List<DaysOfWeek> findByHabit(Habit habit);
}
