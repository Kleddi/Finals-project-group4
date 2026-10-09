import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

// This class reads events.txt and makes one Event for each line.
public class EventReader {

    public static List<Event> readEvents(String path) throws IOException {
        List<Event> events = new ArrayList<>();
        List<String> lines = Files.readAllLines(Paths.get(path));

        for (String line : lines) {
            line = line.trim();

            // Ignore empty lines and lines that start with #
            if (line.isEmpty() || line.startsWith("#")) {
                continue;
            }

            String[] parts = line.split("\\|", -1);
            if (parts.length != 8) {
                System.out.println("Skipped a line with " + parts.length + " fields (expected 8): " + line);
                continue;
            }

            events.add(new Event(parts[0].trim(), parts[1].trim(), parts[2].trim(), parts[3].trim(),
                                 parts[4].trim(), parts[5].trim(), parts[6].trim(), parts[7].trim()));
        }
        return events;
    }
}
