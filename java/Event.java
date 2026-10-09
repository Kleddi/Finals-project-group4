// This class stores the details of one event.
public class Event {
    private String id;
    private String title;
    private String club;
    private String category;
    private String date;        // example: 2026-09-29
    private String time;        // example: 17:00
    private String location;
    private String description;

    public Event(String id, String title, String club, String category,
                 String date, String time, String location, String description) {
        this.id = id;
        this.title = title;
        this.club = club;
        this.category = category;
        this.date = date;
        this.time = time;
        this.location = location;
        this.description = description;
    }

    public String getId() { return id; }
    public String getTitle() { return title; }
    public String getClub() { return club; }
    public String getCategory() { return category; }
    public String getDate() { return date; }
    public String getTime() { return time; }
    public String getLocation() { return location; }
    public String getDescription() { return description; }

    @Override
    public String toString() {
        return date + " " + time + " - " + title + " (" + category + ", " + club + ")";
    }
}
