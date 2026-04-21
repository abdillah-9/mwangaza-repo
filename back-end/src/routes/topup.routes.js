const express = require("express");
const router = express.Router();

const controller = require("../controllers/topup.controller");

// user
router.post("/", controller.createTopup);

// admin
router.get("/pending", controller.getPending);
router.post("/:id/approve", controller.approveTopup);
router.post("/:id/reject", controller.rejectTopup);

module.exports = router;