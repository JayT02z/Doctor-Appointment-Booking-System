package dabs.DABS.Enum;

public enum Frequency {
    ONCE("1 lần/ngày"),
    TWICE("2 lần/ngày"),
    THREE_TIMES("3 lần/ngày"),
    FOUR_TIME("4 lần/ngày");

    private final String description;

    Frequency(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
