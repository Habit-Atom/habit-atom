package org.example.habitatom.models.enumeration;

public enum Day {
    Mon,
    Tue,
    Wed,
    Thu,
    Fri,
    Sat,
    Sun;

    public static Day fromString(String day) {
        switch(day.toLowerCase()) {
            case "monday":
                return Mon;
            case "tuesday":
                return Tue;
            case "wednesday":
                return Wed;
            case "thursday":
                return Thu;
            case "friday":
                return Fri;
            case "saturday":
                return Sat;
            case "sunday":
                return Sun;
            default:
                throw new IllegalArgumentException("Unknown day: " + day);
        }
    }
}
