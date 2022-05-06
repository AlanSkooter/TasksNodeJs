const { writeFile } = require("fs");

exports.writeJSONAsync = (path, data) =>
  new Promise((resolve, reject) => {
    const buff = Buffer.from(JSON.stringify(data, null, 4));
    writeFile(path, buff, (err) => {
      err ? reject(err) : resolve();
    });
  });
