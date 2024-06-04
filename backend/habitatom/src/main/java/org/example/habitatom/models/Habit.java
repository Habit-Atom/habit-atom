package org.example.habitatom.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    private String icon;
    private String color;
    private String duration;
    @OneToMany(mappedBy = "habit", cascade = CascadeType.ALL)
    private List<DaysOfWeek> days;
    @ManyToOne()
    private AppUser user;
    @OneToMany(mappedBy = "habit")
    @JsonIgnore
    private List<HabitCompletion> habitCompletions;
}
