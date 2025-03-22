package dabs.DABS.Enum;

public enum TimeSlot {
    SLOT_07_09("07:00 - 09:00"),
    SLOT_09_11("09:00 - 11:00"),
    SLOT_11_13("11:00 - 13:00"),
    SLOT_13_15("13:00 - 15:00"),
    SLOT_15_17("15:00 - 17:00"),
    SLOT_17_19("17:00 - 19:00"),
    SLOT_19_22("19:00 - 22:00");

    private final String timeRange;

    TimeSlot(String timeRange) {
        this.timeRange = timeRange;
    }

    public String getTimeRange() {
        return timeRange;
    }
}
