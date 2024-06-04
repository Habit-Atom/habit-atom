package org.example.habitatom.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    private String name;
    private String icon;
    private String color;
    private String duration;
    @OneToMany(mappedBy = "task", cascade = CascadeType.ALL)
    private List<ActiveDate> activeDates;
    @ManyToOne()
    private AppUser user;
    @OneToMany(mappedBy = "task")
    @JsonIgnore
    private List<TaskCompletion> taskCompletions;
}
