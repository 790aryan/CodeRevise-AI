export function requestLogger(request, response, next) {
  const startedAt = process.hrtime.bigint();

  response.on('finish', () => {
    const durationMs = Number(process.hrtime.bigint() - startedAt) / 1_000_000;
    const route = request.originalUrl;
    const message = [
      request.method,
      route,
      response.statusCode,
      `${durationMs.toFixed(2)}ms`,
    ].join(' ');

    console.log(message);
  });

  next();
}
