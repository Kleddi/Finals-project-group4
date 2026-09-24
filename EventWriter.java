import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

// Writes events.js, which the website loads with a <script> tag.
public class EventWriter {

    public static void writeEventsJs(List<Event> events, String path) throws IOException {
        StringBuilder sb = new StringBuilder();
        sb.append("// Made by the Java program (Main.java). Do not edit by hand.\n");
        sb.append("const EVENTS = [\n");
        for (int i = 0; i < events.size(); i++) {
            Event e = events.get(i);
            sb.append("  { ");
            sb.append("id: ").append(quote(e.getId())).append(", ");
            sb.append("title: ").append(quote(e.getTitle())).append(", ");
            sb.append("club: ").append(quote(e.getClub())).append(", ");
            sb.append("category: ").append(quote(e.getCategory())).append(", ");
            sb.append("date: ").append(quote(e.getDate())).append(", ");
            sb.append("time: ").append(quote(e.getTime())).append(", ");
            sb.append("location: ").append(quote(e.getLocation())).append(", ");
            sb.append("description: ").append(quote(e.getDescription()));
            sb.append(i < events.size() - 1 ? " },\n" : " }\n");
        }
        sb.append("];\n");
        Files.write(Paths.get(path), sb.toString().getBytes(StandardCharsets.UTF_8));
    }

    // Puts text in quotes and escapes characters that would break JavaScript.
    private static String quote(String text) {
        return "\"" + text.replace("\\", "\\\\").replace("\"", "\\\"") + "\"";
    }
}
