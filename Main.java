import java.io.IOException;
import java.util.List;

// To run: open the java folder, type javac *.java, then type java Main
public class Main {
    public static void main(String[] args) {
        System.out.println("Campus Event & Club Hub");

        try {
            List<Event> events = EventReader.readEvents("../data/events.txt");
            System.out.println("Read " + events.size() + " events:");
            for (Event e : events) {
                System.out.println("  " + e);
            }
        } catch (IOException e) {
            System.out.println("Could not read the file: " + e.getMessage());
            System.out.println("Make sure you run this from the java/ folder.");
        }
    }
}
