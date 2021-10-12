const winston = require("winston");
require('winston-daily-rotate-file');
var transport = new winston.transports.DailyRotateFile({
  filename: 'dialyErrorCheck.log',
  datePattern: 'YYYY-MM-DD-HH',
});
const { combine, json, timestamp, prettyPrint } = winston.format;
const logger = winston.createLogger({
  level: "info",
  format: combine(json(), timestamp(), prettyPrint()),
  transports: [
    // Write all logs with level `error` and below to `error.log`
    //new winston.transports.File({ filename: "error.log", level: "error" }),
    transport,
  ],
});

/*
If we're not in production then log to the `console` with the format:
`${info.level}: ${info.message} JSON.stringify({ ...rest }) `
*/
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

module.exports = logger;
