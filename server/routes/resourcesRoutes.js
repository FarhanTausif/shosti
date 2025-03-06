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
// Get resources filtered by mhpemail
router.get("/mr", async (req, res) => {
  try {
    // console.log("req body: ",req.query);
    const { mhpEmail } = req.query;
    // const resources = mhpEmail ? await Resource.find({ mhpEmail }) : await Resource.find();
    // const resources =  await Resource.find({ mhpEmail });
    let query = {};
    if (mhpEmail) {
      query.mhpEmail = mhpEmail;
    }
    // console.log("mail in routes: ",mhpEmail);
    const resources = await Resource.find(query);
    res.json(resources);
  } catch (error) {
    console.error("Error fetching resources:", error);
    res.status(500).json({ message: "Error fetching resources" });
  }
});
// DELETE: Delete a resource by ID (only if mhpEmail matches)
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { mhpEmail } = req.body; // MHP's email from request body (ensure it matches)
console.log("id",id);
  try {
    const resource = await Resource.findById(id);
console.log(resource);
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    // if (resource.mhpEmail !== mhpEmail) {
    //   return res.status(403).json({ message: "Unauthorized to delete this resource" });
    // }

    await Resource.findByIdAndDelete(id);
    res.json({ message: "Resource deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.post("/", async (req, res) => {
    const { title, headline, type, content, categories, mediaUrl, userName, mhpemail } = req.body;
    try {
      const newResource = new Resource({
        title,
        headline: type === "article" ? headline : "",
        type,
        content: content,
        mediaUrl: type === "video" ? mediaUrl : "",
        categories: categories ? JSON.parse(categories) : [],
        mhpName: userName || "",
        mhpEmail: mhpemail || "",
      });
      await newResource.save();
      res.status(201).json(newResource);
    } catch (error) {
      res.status(500).json({ error: "Failed to add resource" });
    }
  });

export default router;
