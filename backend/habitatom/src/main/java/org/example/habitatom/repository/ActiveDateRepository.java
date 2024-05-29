package org.example.habitatom.repository;

import org.example.habitatom.models.ActiveDate;
import org.example.habitatom.models.DaysOfWeek;
import org.example.habitatom.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ActiveDateRepository extends JpaRepository<ActiveDate, Long> {
    List<ActiveDate> findByDate(LocalDate futureDate);

    List<ActiveDate> findByTask(Task task);
}
