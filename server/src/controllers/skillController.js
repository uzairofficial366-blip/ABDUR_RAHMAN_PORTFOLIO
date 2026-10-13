import { Skill } from '../models/Skill.js';
import { skillSchema } from '../validators/schemas.js';
import { autoSeedIfEmpty } from '../utils/autoSeed.js';

export const getPublicSkills = async (req, res, next) => {
  try {
    const count = await Skill.countDocuments();
    if (count === 0) {
      await autoSeedIfEmpty();
    }
    const skills = await Skill.find({ isPublished: true }).sort({ displayOrder: 1 });
    return res.status(200).json({ success: true, skills });
  } catch (error) {
    next(error);
  }
};

export const getAdminSkills = async (req, res, next) => {
  try {
    const skills = await Skill.find().sort({ displayOrder: 1 });
    return res.status(200).json({ success: true, skills });
  } catch (error) {
    next(error);
  }
};

export const createSkill = async (req, res, next) => {
  try {
    const parse = skillSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ success: false, errors: parse.error.flatten().fieldErrors });
    }
    const skill = await Skill.create(parse.data);
    return res.status(201).json({ success: true, skill });
  } catch (error) {
    next(error);
  }
};

export const updateSkill = async (req, res, next) => {
  try {
    const { id } = req.params;
    const skill = await Skill.findByIdAndUpdate(id, req.body, { new: true });
    if (!skill) return res.status(404).json({ success: false, message: 'Skill not found' });
    return res.status(200).json({ success: true, skill });
  } catch (error) {
    next(error);
  }
};

export const deleteSkill = async (req, res, next) => {
  try {
    const { id } = req.params;
    const skill = await Skill.findByIdAndDelete(id);
    if (!skill) return res.status(404).json({ success: false, message: 'Skill not found' });
    return res.status(200).json({ success: true, message: 'Skill deleted' });
  } catch (error) {
    next(error);
  }
};

