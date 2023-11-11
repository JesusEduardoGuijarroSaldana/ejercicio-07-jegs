const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.get("/", userController.getUsers);
router.get("/:email", userController.getUserByEmail);
router.post("/", userController.createUser);
router.put("/:email", userController.updateUserByEmail);
router.delete("/:email", userController.deleteUserByEmail);

module.exports = router;
