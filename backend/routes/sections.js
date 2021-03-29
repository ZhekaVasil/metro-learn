const express = require("express");
const SectionsController = require("../controllers/SectionsController");

const router = express.Router();

router.get("/", SectionsController.sectionsList);
router.get("/search/:term", SectionsController.sectionsSearch);

module.exports = router;
