import { Project } from '../models/Project.js';
import { projectSchema } from '../validators/schemas.js';
import { autoSeedIfEmpty } from '../utils/autoSeed.js';

// Public: Get all published projects
export const getPublicProjects = async (req, res, next) => {
  try {
    const totalCount = await Project.countDocuments();
    if (totalCount === 0) {
      await autoSeedIfEmpty();
    }

    const { category, featured } = req.query;
    const filter = { status: 'published' };

    if (category && category !== 'All') {
      filter.category = category;
    }
    if (featured === 'true') {
      filter.featured = true;
    }

    const projects = await Project.find(filter)
      .sort({ featured: -1, displayOrder: 1, createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    next(error);
  }
};

// Public: Get published project by slug
export const getPublicProjectBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    let project = await Project.findOne({ slug: slug.toLowerCase(), status: 'published' }).lean();

    if (!project) {
      const count = await Project.countDocuments();
      if (count === 0) {
        await autoSeedIfEmpty();
        project = await Project.findOne({ slug: slug.toLowerCase(), status: 'published' }).lean();
      }
    }

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found or not currently published.',
      });
    }

    return res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Get all projects (including drafts)
export const getAdminProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ displayOrder: 1, createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Create project
export const createProject = async (req, res, next) => {
  try {
    const parseResult = projectSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: parseResult.error.flatten().fieldErrors,
      });
    }

    const existing = await Project.findOne({ slug: parseResult.data.slug.toLowerCase() });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'A project with this URL slug already exists. Please pick a unique slug.',
      });
    }

    const project = await Project.create({
      ...parseResult.data,
      slug: parseResult.data.slug.toLowerCase(),
    });

    return res.status(201).json({
      success: true,
      message: 'Project created successfully',
      project,
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Update project
export const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const parseResult = projectSchema.partial().safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: parseResult.error.flatten().fieldErrors,
      });
    }

    if (parseResult.data.slug) {
      const existing = await Project.findOne({
        slug: parseResult.data.slug.toLowerCase(),
        _id: { $ne: id },
      });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: 'Another project with this slug already exists.',
        });
      }
    }

    const updated = await Project.findByIdAndUpdate(id, parseResult.data, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      project: updated,
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Delete project
export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Project.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

