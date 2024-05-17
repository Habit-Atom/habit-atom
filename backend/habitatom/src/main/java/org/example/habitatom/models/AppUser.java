package org.example.habitatom.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    private String username;
    private String email;
    private String password;
    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Habit> habits;
    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Task> tasks;
}
