import { Service } from '../models/Service.js';
import { serviceSchema } from '../validators/schemas.js';
import { autoSeedIfEmpty } from '../utils/autoSeed.js';

export const getPublicServices = async (req, res, next) => {
  try {
    const count = await Service.countDocuments();
    if (count === 0) {
      await autoSeedIfEmpty();
    }
    const services = await Service.find({ isPublished: true }).sort({ displayOrder: 1 });
    return res.status(200).json({ success: true, services });
  } catch (error) {
    next(error);
  }
};

export const getAdminServices = async (req, res, next) => {
  try {
    const services = await Service.find().sort({ displayOrder: 1 });
    return res.status(200).json({ success: true, services });
  } catch (error) {
    next(error);
  }
};

export const createService = async (req, res, next) => {
  try {
    const parse = serviceSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ success: false, errors: parse.error.flatten().fieldErrors });
    }
    const service = await Service.create(parse.data);
    return res.status(201).json({ success: true, service });
  } catch (error) {
    next(error);
  }
};

export const updateService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndUpdate(id, req.body, { new: true });
    if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
    return res.status(200).json({ success: true, service });
  } catch (error) {
    next(error);
  }
};

export const deleteService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndDelete(id);
    if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
    return res.status(200).json({ success: true, message: 'Service deleted' });
  } catch (error) {
    next(error);
  }
};

