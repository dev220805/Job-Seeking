export const sendToken = (user, statusCode, res, message) => {
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error("JWT_SECRET_KEY is not defined.");
  }
  if (!process.env.COOKIE_EXPIRE) {
    throw new Error("COOKIE_EXPIRE is not defined.");
  }
  const cookieExpireDays = Number(process.env.COOKIE_EXPIRE);
  if (!Number.isFinite(cookieExpireDays)) {
    throw new Error("COOKIE_EXPIRE must be a number.");
  }

  const token = user.getJWTToken();
  const options = {
    expires: new Date(
      Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    message,
    token,
  });
};
