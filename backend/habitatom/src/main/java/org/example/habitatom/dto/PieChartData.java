package org.example.habitatom.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class PieChartData {
    Integer value;
    String color;

    public PieChartData() {
        this.value = 0;
        this.color = "#FF4040";
    }

    public void IncrementValue(){
        value++;
    }
}