package org.example.habitatom.repository;

import org.example.habitatom.models.AppUser;
import org.example.habitatom.models.CalendarDates;
import org.example.habitatom.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface CalendarDatesRepository extends JpaRepository<CalendarDates, Long> {
    List<CalendarDates> findAllByUserEmail(String email);

    @Query("SELECT cd FROM CalendarDates cd WHERE cd.user.email = :email and cd.date = :date")
    CalendarDates findByUserEmailAndDate(@Param("email") String userEmail,@Param("date") LocalDate currentWeekDate);

    CalendarDates findByUserAndDate(AppUser user, LocalDate date);
}
