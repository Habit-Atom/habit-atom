package org.example.habitatom.repository;

import org.example.habitatom.models.Habit;
import org.example.habitatom.models.Task;
import org.example.habitatom.models.TaskCompletion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TaskCompletionRepository extends JpaRepository<TaskCompletion, Long> {
    boolean existsByTaskAndDate(Task task, LocalDate date);

    @Query("SELECT tc FROM TaskCompletion tc WHERE tc.task.user.email = :email and tc.date = :date ")
    List<TaskCompletion> findAllByUserEmailAndDate(@Param("email") String email, @Param("date") LocalDate date);
}
