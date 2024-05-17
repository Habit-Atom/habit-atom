package org.example.habitatom.utils;

import org.example.habitatom.models.enumeration.Day;

import java.time.DayOfWeek;

public class DayUtils {
    public static Day transformToDay(DayOfWeek dayOfWeek) {
        return switch (dayOfWeek) {
            case MONDAY -> Day.Mon;
            case TUESDAY -> Day.Tue;
            case WEDNESDAY -> Day.Wed;
            case THURSDAY -> Day.Thu;
            case FRIDAY -> Day.Fri;
            case SATURDAY -> Day.Sat;
            case SUNDAY -> Day.Sun;
            default -> throw new IllegalArgumentException("Invalid DayOfWeek: " + dayOfWeek);
        };
    }
}
