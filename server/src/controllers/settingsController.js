import { SiteSettings } from '../models/SiteSettings.js';
import { Project } from '../models/Project.js';
import { ContactEnquiry } from '../models/ContactEnquiry.js';
import { Testimonial } from '../models/Testimonial.js';
import { Service } from '../models/Service.js';
import { Skill } from '../models/Skill.js';

// Get or initialize site settings
const getOrCreateSettings = async () => {
  let settings = await SiteSettings.findOne();
  if (!settings) {
    settings = await SiteSettings.create({});
  }
  return settings;
};

// Public: Get site settings
export const getPublicSettings = async (req, res, next) => {
  try {
    const settings = await getOrCreateSettings();
    return res.status(200).json({
      success: true,
      settings: {
        brandName: settings.brandName,
        professionalTitle: settings.professionalTitle,
        heroHeadline: settings.heroHeadline,
        heroDescription: settings.heroDescription,
        biography: settings.biography,
        experiencePlaceholder: settings.experiencePlaceholder,
        educationPlaceholder: settings.educationPlaceholder,
        certificationsPlaceholder: settings.certificationsPlaceholder,
        careerGoalsPlaceholder: settings.careerGoalsPlaceholder,
        location: settings.location,
        contactEmail: settings.contactEmail,
        contactPhone: settings.contactPhone,
        whatsappNumber: settings.whatsappNumber,
        profileImage: settings.profileImage,
        cvUrl: settings.cvUrl,
        isCvAvailable: settings.isCvAvailable,
        socialLinks: settings.socialLinks,
        seoDefaults: settings.seoDefaults,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Get all settings
export const getAdminSettings = async (req, res, next) => {
  try {
    const settings = await getOrCreateSettings();
    return res.status(200).json({
      success: true,
      settings,
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Update settings
export const updateAdminSettings = async (req, res, next) => {
  try {
    let settings = await getOrCreateSettings();
    Object.assign(settings, req.body);
    await settings.save();

    return res.status(200).json({
      success: true,
      message: 'Settings updated successfully',
      settings,
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Dashboard metrics calculated from actual database records
export const getAdminDashboardMetrics = async (req, res, next) => {
  try {
    const [
      publishedProjectsCount,
      draftProjectsCount,
      totalEnquiriesCount,
      unreadEnquiriesCount,
      publishedTestimonialsCount,
      totalServicesCount,
      totalSkillsCount,
      recentEnquiries
    ] = await Promise.all([
      Project.countDocuments({ status: 'published' }),
      Project.countDocuments({ status: 'draft' }),
      ContactEnquiry.countDocuments(),
      ContactEnquiry.countDocuments({ isRead: false }),
      Testimonial.countDocuments({ isPublished: true }),
      Service.countDocuments({ isPublished: true }),
      Skill.countDocuments({ isPublished: true }),
      ContactEnquiry.find().sort({ createdAt: -1 }).limit(5).lean(),
    ]);

    return res.status(200).json({
      success: true,
      metrics: {
        publishedProjectsCount,
        draftProjectsCount,
        totalEnquiriesCount,
        unreadEnquiriesCount,
        publishedTestimonialsCount,
        totalServicesCount,
        totalSkillsCount,
        recentEnquiries,
      },
    });
  } catch (error) {
    next(error);
  }
};

