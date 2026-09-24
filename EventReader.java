import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

// Reads data/events.txt and checks every line. Bad lines are skipped with a message.
public class EventReader {
    private static final List<String> CATEGORIES = Arrays.asList("Academic", "Social", "Sports");

    public static List<Event> readEvents(String path) throws IOException {
        List<Event> events = new ArrayList<>();
        Set<String> seenIds = new HashSet<>();
        List<String> lines = Files.readAllLines(Paths.get(path));

        for (int i = 0; i < lines.size(); i++) {
            String line = lines.get(i).trim();
            int lineNumber = i + 1;

            // Skip blank lines and comment lines
            if (line.isEmpty() || line.startsWith("#")) {
                continue;
            }

            String[] parts = line.split("\\|", -1);
            if (parts.length != 8) {
                System.out.println("Line " + lineNumber + " skipped: expected 8 fields, found " + parts.length);
                continue;
            }
            for (int j = 0; j < parts.length; j++) {
                parts[j] = parts[j].trim();
            }

            String id = parts[0];
            String title = parts[1];
            String category = parts[3];
            String date = parts[4];
            String time = parts[5];

            if (id.isEmpty() || title.isEmpty()) {
                System.out.println("Line " + lineNumber + " skipped: id and title cannot be empty");
                continue;
            }
            if (!seenIds.add(id)) {
                System.out.println("Line " + lineNumber + " skipped: id '" + id + "' is used twice");
                continue;
            }
            if (!CATEGORIES.contains(category)) {
                System.out.println("Line " + lineNumber + " skipped: category must be Academic, Social, or Sports");
                continue;
            }
            try {
                LocalDate.parse(date);
                LocalTime.parse(time);
            } catch (DateTimeParseException e) {
                System.out.println("Line " + lineNumber + " skipped: date must be YYYY-MM-DD and time HH:MM");
                continue;
            }

            events.add(new Event(id, title, parts[2], category, date, time, parts[6], parts[7]));
        }
        return events;
    }
}
