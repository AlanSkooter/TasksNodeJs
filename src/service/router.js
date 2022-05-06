const router = require("find-my-way")();
const controllerUser = require("../controller/user");
const controllerPets = require("../controller/pets");
const { identification, checkAuth, checkRole } = require("../service/auth");
const { routerMiddleware } = require("../utils/middleware");

router.on("GET", "/user", routerMiddleware([
  checkAuth,
  checkRole('SUPERADMIN', 'ADMIN'),
  async (req, res, params) => {
    const result = await controllerUser.getAllUsers(res);
    res.end(JSON.stringify(result));
  },
]));

router.on("POST", "/user", async (req, res) => {
  const result = await controllerUser.addNewUser(req, res);
  res.end(JSON.stringify(result));
});

router.on("POST", "/user/login", async (req, res) => {
  const result = await controllerUser.loginUser(req, res);
  res.end(JSON.stringify(result));
});

router.on("GET", "/user/:id", async (req, res, { id }) => {
  const result = await controllerUser.getUserById(id, res);
  res.end(JSON.stringify(result));
});

router.on("GET", "/pets", identification(async (req, res, params) => {
  const result = await controllerPets.getAllPets(req, res);
  res.end(JSON.stringify(result));
}));

router.on("PUT", "/user", routerMiddleware([
  checkAuth,
  checkRole('ADMIN'),
  async (req, res, params) => {
    const result = await controllerUser.updateUser(req, res);
    res.end(JSON.stringify(result));
}
]));

router.on("DELETE", "/user", identification(async (req, res, params) => {
  const result = await controllerUser.deleteUser(req);
  res.end(JSON.stringify(result));
}));

module.exports = router;
