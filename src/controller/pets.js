const modelPets = require("../model/pets");

exports.getAllPets = async (req) => {
  return await modelPets.getAllPetsModel();
};
