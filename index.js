import { createServer } from "node:http";
import { createServer as createHttpsServer } from "node:https";
import { appendFile, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function handler(req, res) {
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
}

const credentials = {
  key: readFileSync(join(__dirname, "ssl.key")),
  cert: readFileSync(join(__dirname, "ssl.crt")),
};

const http = createServer(handler);
const https = createHttpsServer(credentials, handler);

// Start server
const PORT = 80;
const PORT_HTTPS = 3443;
http.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
https.listen(PORT_HTTPS, () => {
  console.log(`Server listening on port ${PORT_HTTPS}`);
});
