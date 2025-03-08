import express from "express";
import { addResource, deleteResource, getResource, getResourcesByMhpEmail } from "../controllers/resourceController.js";

const router = express.Router();

router.get("/", getResource);
router.get("/mr", getResourcesByMhpEmail);
router.delete("/:id", deleteResource);
router.post("/", addResource);

export default router;
