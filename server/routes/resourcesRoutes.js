// server/routes/resources.js
import express from "express";
import Resource from "../models/Resource.js";

const router = express.Router();

// GET: Fetch resources (optionally filtered by category)
router.get("/", async (req, res) => {
  const { category } = req.query;
  try {
    let query = {};
    if (category) {
      query.categories = category;
    }
    const resources = await Resource.find(query);
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch resources" });
  }
});

router.post("/", async (req, res) => {
    const { title, headline, type, content, categories, mediaUrl, userName } = req.body;
    try {
      const newResource = new Resource({
        title,
        headline: type === "article" ? headline : "",
        type,
        content: content,
        mediaUrl: type === "video" ? mediaUrl : "",
        categories: categories ? JSON.parse(categories) : [],
        mhpName: userName || "",
      });
      await newResource.save();
      res.status(201).json(newResource);
    } catch (error) {
      res.status(500).json({ error: "Failed to add resource" });
    }
  });

export default router;
