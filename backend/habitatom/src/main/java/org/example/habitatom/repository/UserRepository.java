package org.example.habitatom.repository;

import org.example.habitatom.models.AppUser;
import org.example.habitatom.models.Task;
import org.example.habitatom.models.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<AppUser, Long> {
}
