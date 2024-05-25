package org.example.habitatom.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class LastUpdateDate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    LocalDate date;
}
