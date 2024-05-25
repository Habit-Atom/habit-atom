package org.example.habitatom.repository;

import org.example.habitatom.models.LastUpdateDate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LastUpdateDateRepository extends JpaRepository<LastUpdateDate, Long> {
}
