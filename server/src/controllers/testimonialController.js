import { Testimonial } from '../models/Testimonial.js';
import { testimonialSchema } from '../validators/schemas.js';
import { autoSeedIfEmpty } from '../utils/autoSeed.js';

export const getPublicTestimonials = async (req, res, next) => {
  try {
    const count = await Testimonial.countDocuments();
    if (count === 0) {
      await autoSeedIfEmpty();
    }

    const testimonials = await Testimonial.find({
      isPublished: true,
      isVerified: true,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      testimonials,
    });
  } catch (error) {
    next(error);
  }
};

export const getAdminTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      testimonials,
    });
  } catch (error) {
    next(error);
  }
};

export const createTestimonial = async (req, res, next) => {
  try {
    const parse = testimonialSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({
        success: false,
        errors: parse.error.flatten().fieldErrors,
      });
    }

    const testimonial = await Testimonial.create(parse.data);
    return res.status(201).json({
      success: true,
      testimonial,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findByIdAndUpdate(id, req.body, { new: true });
    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    return res.status(200).json({ success: true, testimonial });
  } catch (error) {
    next(error);
  }
};

export const deleteTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findByIdAndDelete(id);
    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    return res.status(200).json({ success: true, message: 'Testimonial deleted successfully' });
  } catch (error) {
    next(error);
  }
};

