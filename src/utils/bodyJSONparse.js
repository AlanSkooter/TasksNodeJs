exports.parseJsonBody = (request) =>
  new Promise((resolve, reject) => {
    let rawJson = "";
    request
      .on("data", (chunk) => {
        rawJson += chunk;
      })
      .on("end", () => {
        try {
          if (rawJson) {
            const requestBody = JSON.parse(rawJson);
            resolve(requestBody);
          } else {
            resolve(null);
          }
        } catch (err) {
          reject(err);
        }
      })
      .on("error", reject);
  });

exports.validateBodyCredentials = (body, res, status = 400) => {
  if (!body || !body.login || !body.password) {
    res.writeHead(status)
    return {
      error: {
        status: status,
        message: 'Login and password is required.'
      }
    }
  }
}