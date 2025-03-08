import Resource from "../models/Resource.js";

// Fetch resources (optionally filtered by category)
export const getResource = async (req, res) => {
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
};

// Fetch resources filtered by MHP email
export const getResourcesByMhpEmail = async (req, res) => {
  try {
    const { mhpEmail } = req.query;
    let query = {};
    if (mhpEmail) {
      query.mhpEmail = mhpEmail;
    }
    const resources = await Resource.find(query);
    res.json(resources);
  } catch (error) {
    console.error("Error fetching resources:", error);
    res.status(500).json({ message: "Error fetching resources" });
  }
};

// Delete a resource by ID (only if mhpEmail matches)
export const deleteResource = async (req, res) => {
  const { id } = req.params;
  const { mhpEmail } = req.body; // MHP's email from request body

  try {
    const resource = await Resource.findById(id);
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    await Resource.findByIdAndDelete(id);
    res.json({ message: "Resource deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


export const addResource = async (req, res) => {
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
    console.log("Error from post route:", error);
    res.status(500).json({ error: "Failed to add resource" });
  }
};
