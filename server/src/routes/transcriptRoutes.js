// Name: Ulukbek Aitmatov
// email: ulukbek.aitmatov@stonybrook.edu
// Name: Chanju Lee
// email: chanju.lee@stonybrook.edu

const express = require("express");
const router = express.Router();

const transcriptController = require("../controllers/transcriptController");

router
  .route("/:id")
  .get(transcriptController.getTranscript)
  .post(transcriptController.postTranscript)
  .delete(transcriptController.deleteTranscript);

module.exports = router;
