const path = require("path");

const pathJSONUser = path.resolve(process.cwd(), "src/service/db.users.json");
const pathJSONPets = path.resolve(process.cwd(), "src/service/db.pets.json");

module.exports = {
  pathJSONUser,
  pathJSONPets,
};
