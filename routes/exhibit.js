const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const exhibitsController = require("../controllers/exhibits");
const { ensureAuth } = require("../middleware/auth");

//Exhibit Routes - simplified for now
router.get("/:id", ensureAuth, exhibitsController.getExhibit);

router.post("/createExhibit", upload.single("file"), exhibitsController.createExhibit);

router.put("/likeExhibit/:id", exhibitsController.likeExhibit);

router.delete("/deleteExhibit/:id", exhibitsController.deleteExhibit);

module.exports = router;
