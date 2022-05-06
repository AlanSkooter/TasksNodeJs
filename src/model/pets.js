const { pathJSONPets } = require("../utils/pathJSON");
const parseJSON = require("../utils/parseJSON");
const writeJSON = require("../utils/writeJSON");

exports.getAllPetsModel = async () => {
  return await parseJSON.readJSONAsync(pathJSONPets);
};

exports.deleteOwnerPet = async (id) => {
  const allPets = await parseJSON.readJSONAsync(pathJSONPets);

  const deleteOwner = allPets.map((pet) => {
    if (pet.ownerId === id) {
      pet.ownerId = null;
    }
    return pet;
  });

  await writeJSON.writeJSONAsync(pathJSONPets, deleteOwner);
};
