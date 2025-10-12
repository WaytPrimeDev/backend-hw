export const errorHandler = (err, _req, res, _next) => {
  const { status = 500, message = 'unknown problem' } = err;
  res.status(status).json({
    status,
    message,
  });
};
