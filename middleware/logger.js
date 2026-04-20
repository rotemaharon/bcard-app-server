const fs = require("fs");
const path = require("path");

const logsDir = path.join(__dirname, "../logs");
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });

const pad = (n) => String(n).padStart(2, "0");

const fileLogger = (req, res, next) => {
  const originalSend = res.send;

  res.send = function (body) {
    if (res.statusCode >= 400) {
      const now = new Date();
      const fileName = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}.log`;
      const logFilePath = path.join(logsDir, fileName);

      const time = now.toTimeString().split(" ")[0];
      const errorText = typeof body === "string" ? body : JSON.stringify(body);
      const logMessage = `[${now.toISOString().split("T")[0]} ${time}] Method: ${req.method} | URL: ${req.originalUrl} | Status: ${res.statusCode} | Error: ${errorText}\n`;

      fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) console.error("Failed to write to log file:", err);
      });
    }

    return originalSend.call(this, body);
  };

  next();
};

module.exports = fileLogger;
