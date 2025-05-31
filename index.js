import { createServer } from "node:http";
import { appendFile } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const server = createServer((req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const logEntry = `${req.method} ${req.url} TODO_HTTP_VERSION ${new Date().toISOString()}
${JSON.stringify(req.headers, null, 2)}

${body}

`;

    // Write log entry to file
    const logFile = join(__dirname, "requests.txt");
    appendFile(logFile, logEntry, (err) => {
      if (err) console.error("Error writing to log file:", err);
    });
    console.log(logEntry);

    // Send response
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Done!");
  });
});

// Start server
const PORT = 80;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
