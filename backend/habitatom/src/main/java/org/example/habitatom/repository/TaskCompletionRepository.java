package org.example.habitatom.repository;

import org.example.habitatom.models.TaskCompletion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskCompletionRepository extends JpaRepository<TaskCompletion, Long> {

    @Query("SELECT tc FROM TaskCompletion tc WHERE tc.task.user.email = :email")
    List<TaskCompletion> findAllByUserEmail(@Param("email") String email);
}
