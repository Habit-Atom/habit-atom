package org.example.habitatom.repository;

import org.example.habitatom.models.Icon;
import org.example.habitatom.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IconRepository extends JpaRepository<Icon, Long> {
}
