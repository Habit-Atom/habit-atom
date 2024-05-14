package org.example.habitatom.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.habitatom.models.enumeration.Color;

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
    @Lob
    @Column(name = "icon", columnDefinition = "BLOB")
    private byte[] icon;
    private Color color;
    private String duration;
    @OneToMany(mappedBy = "task")
    private List<ActiveDate> activeDates;
    @ManyToOne()
    private User user;
    @OneToMany(mappedBy = "task")
    private List<TaskCompletion> taskCompletions;
}
