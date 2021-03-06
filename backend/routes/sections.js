const express = require("express");
const SectionsController = require("../controllers/SectionsController");

const router = express.Router();

router.get("/", SectionsController.sectionsList);
router.get("/sync", SectionsController.sectionsSync);
router.get("/search/:term", SectionsController.sectionsSearch);
router.get("/view/:folder/:file", SectionsController.sectionsView);

module.exports = router;
