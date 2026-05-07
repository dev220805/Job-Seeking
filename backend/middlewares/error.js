class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  if (err.name === "CastError") {
    const message = `Resource not found. Invalid ${err.path}`,
      err = new ErrorHandler(message, 400);
  }
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`,
      err = new ErrorHandler(message, 400);
  }
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again!`;
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is expired, Try again!`;
    err = new ErrorHandler(message, 400);
  }

  const statusCode = err.statusCode || 500;
  // Avoid leaking sensitive details (e.g. connection strings) to the client.
  const isProduction = process.env.NODE_ENV === "production";
  const safeServerErrorMessages = new Set([
    "MongoDB URI is not defined (missing `MONGO_URI`).",
    "JWT_SECRET_KEY is not defined.",
    "COOKIE_EXPIRE is not defined.",
    "COOKIE_EXPIRE must be a number.",
  ]);
  const isSafeServerErrorMessage = safeServerErrorMessages.has(err.message);

  const messageToSend =
    isProduction && statusCode === 500 && !isSafeServerErrorMessage
      ? "Internal Server Error"
      : err.message;

  if (isProduction && statusCode === 500 && !isSafeServerErrorMessage) {
    // Log the full error server-side for debugging.
    console.error(err);
  }

  return res.status(statusCode).json({
    success: false,
    message: messageToSend,
  });
};

export default ErrorHandler;
