package org.example.habitatom.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AddTaskRequest {
    String color;
    String duration;
    String name;
    String icon;
    List<String> activeDates;
}
