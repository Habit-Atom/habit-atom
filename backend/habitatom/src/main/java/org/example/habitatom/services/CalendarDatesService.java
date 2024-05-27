package org.example.habitatom.services;

import org.example.habitatom.dto.PieChartData;
import org.example.habitatom.models.CalendarDates;

import java.util.HashMap;
import java.util.List;

public interface CalendarDatesService {
    List<CalendarDates> getDates(String email);

    List<Double> getDataForLineChart(String userEmail);

    HashMap<String, PieChartData> getDataForPieChart(String userEmail);
}
