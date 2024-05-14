package org.example.habitatom.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.habitatom.models.enumeration.Day;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class DaysOfWeek {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    private Day day;
    @ManyToOne()
    private Habit habit;
}
