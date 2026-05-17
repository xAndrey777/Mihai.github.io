import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;

public class ServerStats {

    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
        server.createContext("/api/stats", new StatsHandler());
        server.setExecutor(null); // Crea un executor por defecto
        System.out.println("[Java API] Servidor de estadísticas corriendo en el puerto 8080...");
        server.start();
    }

    static class StatsHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            // Cabeceras CORS para permitir peticiones desde el frontend
            exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().add("Content-Type", "application/json");

            long uptime = java.lang.management.ManagementFactory.getRuntimeMXBean().getUptime() / 1000;
            
            // JSON minimalista con información del entorno
            String jsonResponse = "{"
                    + "\"status\":\"online\","
                    + "\"uptime_seconds\":" + uptime + ","
                    + "\"active_modules\":[\"xA Addon\", \"SuperAura\", \"xMace\"],"
                    + "\"engine\":\"Java Native Architecture\""
                    + "}";

            byte[] responseBytes = jsonResponse.getBytes();
            exchange.sendResponseHeaders(200, responseBytes.length);
            OutputStream os = exchange.getResponseBody();
            os.write(responseBytes);
            os.close();
        }
    }
}
