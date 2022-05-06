const parseJSON = require("../utils/parseJSON");
const writeJSON = require("../utils/writeJSON");
const { pathJSONUser } = require("../utils/pathJSON");

exports.allUsersModel = () => {
  return parseJSON.readJSONAsync(pathJSONUser);
};

exports.findUserByLogin = async (login) => {
  const users = await parseJSON.readJSONAsync(pathJSONUser);
  return users.find((user) => user.login === login);
};

exports.createNewUserModel = async (user) => {
  const allUsers = await parseJSON.readJSONAsync(pathJSONUser);

  const foundUser = allUsers.find((existingUser) => user.login === existingUser.login)
  if (foundUser) {
    return false
  }

  allUsers.push(user);
  await writeJSON.writeJSONAsync(pathJSONUser, allUsers);
  return true
};

exports.getUserByIdModel = async (id, pets) => {
  const allUsers = await parseJSON.readJSONAsync(pathJSONUser);
  const arrUserWithPets = allUsers.map((user) => {
    user.pets = pets.filter((pet) => pet.ownerId === id);
    return user;
  });
  return await arrUserWithPets.find((user) => user.id === id);
};

exports.updateUserModel = async (updateUserData) => {
  const allUsers = await parseJSON.readJSONAsync(pathJSONUser);
  const userIndex = allUsers.findIndex((user) => user.id === updateUserData.id);
  allUsers[userIndex] = {
    ...allUsers[userIndex],
    ...updateUserData,
  };
  await writeJSON.writeJSONAsync(pathJSONUser, allUsers);
};

exports.deleteUserModel = async ({ id }) => {
  const allUsers = await parseJSON.readJSONAsync(pathJSONUser);
  const deleteUserById = allUsers.filter((user) => user.id !== id);
  await writeJSON.writeJSONAsync(pathJSONUser, deleteUserById);
};
