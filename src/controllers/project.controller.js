const Project = require("../models/project.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getAllProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find().sort({ order: 1, createdAt: -1 });
  res.status(200).json(new ApiResponse(200, projects, "Projects fetched successfully"));
});

const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) throw new ApiError(404, "Project not found");
  res.status(200).json(new ApiResponse(200, project, "Project fetched successfully"));
});

const createProject = asyncHandler(async (req, res) => {
  let { title, description, technologies, links, order, status, lines, iconEmoji, liveDemo, github, thumbnail } = req.body;
  
  if (typeof technologies === 'string') {
    try { technologies = JSON.parse(technologies); } catch { technologies = technologies.split(',').map(s => s.trim()).filter(Boolean); }
  }
  if (typeof links === 'string') {
    try { links = JSON.parse(links); } catch { links = {}; }
  } else if (!links) {
    links = {};
  }
  if (liveDemo) links.liveDemo = liveDemo;
  if (github) links.github = github;

  const newProject = new Project({
    title,
    description,
    technologies: Array.isArray(technologies) ? technologies : [],
    links,
    order: order ? Number(order) : 0,
    status: status || "Production",
    lines: lines || "",
    iconEmoji: iconEmoji || "",
  });

  if (thumbnail && typeof thumbnail === 'string') {
    newProject.images.thumbnail = thumbnail;
  }

  if (req.files) {
    if (req.files.thumbnail && req.files.thumbnail.length > 0) {
      newProject.images.thumbnail = req.files.thumbnail[0].path;
    }
    if (req.files.gallery) {
      newProject.images.gallery = req.files.gallery.map(file => file.path);
    }
  }

  await newProject.save();
  res.status(201).json(new ApiResponse(201, newProject, "Project created successfully"));
});

const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) throw new ApiError(404, "Project not found");

  let { title, description, technologies, links, order, status, lines, iconEmoji, liveDemo, github, thumbnail } = req.body;

  if (title) project.title = title;
  if (description) project.description = description;
  if (technologies !== undefined) {
    if (typeof technologies === 'string') {
      try { technologies = JSON.parse(technologies); } catch { technologies = technologies.split(',').map(s => s.trim()).filter(Boolean); }
    }
    project.technologies = Array.isArray(technologies) ? technologies : [];
  }
  
  if (!project.links) project.links = {};
  if (typeof links === 'string') {
    try { project.links = { ...project.links, ...JSON.parse(links) }; } catch {}
  } else if (typeof links === 'object' && links !== null) {
    project.links = { ...project.links, ...links };
  }
  if (liveDemo !== undefined) project.links.liveDemo = liveDemo;
  if (github !== undefined) project.links.github = github;

  if (order !== undefined) project.order = Number(order);
  if (status !== undefined) project.status = status;
  if (lines !== undefined) project.lines = lines;
  if (iconEmoji !== undefined) project.iconEmoji = iconEmoji;

  if (thumbnail && typeof thumbnail === 'string') {
    if (!project.images) project.images = { gallery: [] };
    project.images.thumbnail = thumbnail;
  }

  if (req.files) {
    if (req.files.thumbnail && req.files.thumbnail.length > 0) {
      if (!project.images) project.images = { gallery: [] };
      project.images.thumbnail = req.files.thumbnail[0].path;
    }
    if (req.files.gallery) {
      if (!project.images) project.images = { gallery: [] };
      project.images.gallery = [...(project.images.gallery || []), ...req.files.gallery.map(file => file.path)];
    }
  }

  await project.save();
  res.status(200).json(new ApiResponse(200, project, "Project updated successfully"));
});

const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) throw new ApiError(404, "Project not found");
  res.status(200).json(new ApiResponse(200, null, "Project deleted successfully"));
});

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
