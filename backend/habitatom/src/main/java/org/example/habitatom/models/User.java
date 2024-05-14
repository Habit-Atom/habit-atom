package org.example.habitatom.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    private String username;
    private String email;
    private String password;
    @OneToMany(mappedBy = "user")
    private List<Habit> habits;
    @OneToMany(mappedBy = "user")
    private List<Task> tasks;
}
