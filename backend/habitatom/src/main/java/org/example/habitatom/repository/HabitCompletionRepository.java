package org.example.habitatom.repository;

import org.example.habitatom.models.HabitCompletion;
import org.example.habitatom.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.ResponseBody;

@Repository
public interface HabitCompletionRepository extends JpaRepository<HabitCompletion, Long> {
}
