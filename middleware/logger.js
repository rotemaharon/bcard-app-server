const fs = require("fs");
const path = require("path");

const logger = (req, res, next) => {
  const originalSend = res.send;

  res.send = function (body) {
    if (res.statusCode >= 400) {
      const today = new Date();
      const fileName = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}.log`;
      const logFilePath = path.join(__dirname, "../logs", fileName);

      const logMessage = `[${today.toTimeString().split(" ")[0]}] | Method: ${req.method} | URL: ${req.originalUrl} | Status: ${res.statusCode} | Error: ${body}\n`;

      fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) console.error("Failed to write to log file:", err);
      });
    }

    originalSend.call(this, body);
  };

  next();
};

module.exports = logger;
