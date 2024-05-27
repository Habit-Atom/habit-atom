package org.example.habitatom.repository;

import org.example.habitatom.models.Habit;
import org.example.habitatom.models.HabitCompletion;
import org.example.habitatom.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface HabitCompletionRepository extends JpaRepository<HabitCompletion, Long> {
    boolean existsByHabitAndDate(Habit habit, LocalDate date);

    @Query("SELECT hc FROM HabitCompletion hc WHERE hc.habit.user.email = :email and hc.date = :date")
    List<HabitCompletion> findAllByUserEmailAndDate(@Param("email") String email, @Param("date") LocalDate date);

}
