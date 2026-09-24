import java.io.IOException;
import java.util.List;

// Run this from the java/ folder:  javac *.java   then   java Main
public class Main {
    public static void main(String[] args) {
        String input = "../data/events.txt";
        String output = "../events.js";

        try {
            List<Event> events = EventReader.readEvents(input);
            System.out.println("Read " + events.size() + " valid events:");
            for (Event e : events) {
                System.out.println("  " + e);
            }
            EventWriter.writeEventsJs(events, output);
            System.out.println("Wrote " + output);
        } catch (IOException e) {
            System.out.println("Could not read or write a file: " + e.getMessage());
            System.out.println("Make sure you run this from the java/ folder.");
        }
    }
}
