import winston from "winston";

// Create new winston logger
const logger = winston.createLogger();

// Create logger transports
const file = new winston.transports.File({ filename: "combined.log" });
const console = new winston.transports.Console();

// Add transports to logger
logger.add(console).add(file);

export default logger;
