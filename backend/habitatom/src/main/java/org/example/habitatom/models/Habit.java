package org.example.habitatom.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.habitatom.models.enumeration.Color;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class Habit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    private String name;
    @Lob
    @Column(name = "icon", columnDefinition = "BLOB")
    private byte[] icon;
    private Color color;
    private String duration;
    @OneToMany(mappedBy = "habit")
    private List<DaysOfWeek> days;
    @ManyToOne()
    private User user;
    @OneToMany(mappedBy = "habit")
    private List<HabitCompletion> habitCompletions;
}
