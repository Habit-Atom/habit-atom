package org.example.habitatom.repository;

import org.example.habitatom.models.ActiveDate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActiveDateRepository extends JpaRepository<ActiveDate, Long> {

}
