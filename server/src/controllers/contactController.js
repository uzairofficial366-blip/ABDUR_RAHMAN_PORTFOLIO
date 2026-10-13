import { ContactEnquiry } from '../models/ContactEnquiry.js';
import { contactEnquirySchema } from '../validators/schemas.js';
import { sendContactNotification } from '../services/emailService.js';

export const submitContactForm = async (req, res, next) => {
  try {
    const parse = contactEnquirySchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({
        success: false,
        message: 'Please review and correct the form fields.',
        errors: parse.error.flatten().fieldErrors,
      });
    }

    const ipAddress = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '';

    // 1. Save enquiry in database
    const enquiry = await ContactEnquiry.create({
      ...parse.data,
      ipAddress,
      emailStatus: 'pending',
    });

    // 2. Attempt email dispatch asynchronously
    const emailResult = await sendContactNotification(enquiry);

    enquiry.emailStatus = emailResult.status;
    if (emailResult.error) {
      enquiry.emailError = emailResult.error;
    }
    await enquiry.save();

    return res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! Your message has been received, and Abdur Rahman will reply shortly.',
      enquiryId: enquiry._id,
      emailDelivered: emailResult.success,
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Get all enquiries
export const getAdminEnquiries = async (req, res, next) => {
  try {
    const { status, search, isRead } = req.query;
    const filter = {};

    if (status && status !== 'all') {
      filter.status = status;
    }
    if (isRead !== undefined && isRead !== '') {
      filter.isRead = isRead === 'true';
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } },
      ];
    }

    const enquiries = await ContactEnquiry.find(filter).sort({ createdAt: -1 });
    const unreadCount = await ContactEnquiry.countDocuments({ isRead: false });

    return res.status(200).json({
      success: true,
      count: enquiries.length,
      unreadCount,
      enquiries,
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Get single enquiry & mark as read
export const getAdminEnquiryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const enquiry = await ContactEnquiry.findById(id);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }

    if (!enquiry.isRead) {
      enquiry.isRead = true;
      await enquiry.save();
    }

    return res.status(200).json({ success: true, enquiry });
  } catch (error) {
    next(error);
  }
};

// Admin: Update enquiry status or notes
export const updateAdminEnquiry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, notes, isRead } = req.body;

    const updateFields = {};
    if (status) updateFields.status = status;
    if (notes !== undefined) updateFields.notes = notes;
    if (isRead !== undefined) updateFields.isRead = isRead;

    const enquiry = await ContactEnquiry.findByIdAndUpdate(id, updateFields, { new: true });
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }

    return res.status(200).json({ success: true, enquiry });
  } catch (error) {
    next(error);
  }
};

// Admin: Delete enquiry
export const deleteAdminEnquiry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await ContactEnquiry.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }
    return res.status(200).json({ success: true, message: 'Enquiry deleted successfully' });
  } catch (error) {
    next(error);
  }
};

