import mongoose from 'mongoose';

const SiteSettingsSchema = new mongoose.Schema(
  {
    brandName: {
      type: String,
      default: 'Abdur Rahman Khan',
      trim: true,
    },
    professionalTitle: {
      type: String,
      default: 'UI/UX Designer & Graphic Designer',
      trim: true,
    },
    heroHeadline: {
      type: String,
      default: 'Designing meaningful digital experiences through creativity and strategy.',
      trim: true,
    },
    heroDescription: {
      type: String,
      default: 'Creating intuitive user interfaces, cohesive brand visual systems, and impactful digital marketing and SEO strategies tailored for ambitious brands and digital products.',
      trim: true,
    },
    biography: {
      type: String,
      default: 'I am a passionate UI/UX Designer and Graphic Designer based in Peshawar, Pakistan, with hands-on expertise spanning user-centered web and mobile interfaces, brand identities, digital marketing, and search engine optimization. My approach combines thoughtful aesthetics with functional usability to create memorable digital experiences.',
      trim: true,
    },
    experiencePlaceholder: {
      type: String,
      default: '1–3 years of specialized practice in digital product design, interface prototyping, and visual brand identity.',
      trim: true,
    },
    educationPlaceholder: {
      type: String,
      default: 'Formal education details will be updated here.',
      trim: true,
    },
    certificationsPlaceholder: {
      type: String,
      default: 'Professional certifications will be listed here.',
      trim: true,
    },
    careerGoalsPlaceholder: {
      type: String,
      default: 'Focused on collaborating with innovative tech startups, design agencies, and global businesses to craft high-impact digital experiences.',
      trim: true,
    },
    location: {
      type: String,
      default: 'Peshawar, Pakistan',
      trim: true,
    },
    contactEmail: {
      type: String,
      default: 'abdurrahman94700@gmail.com',
      trim: true,
    },
    contactPhone: {
      type: String,
      default: '+923139470097',
      trim: true,
    },
    whatsappNumber: {
      type: String,
      default: '+923139470097',
      trim: true,
    },
    profileImage: {
      type: String,
      default: '/images/profile.jpg',
    },
    cvUrl: {
      type: String,
      default: '',
    },
    isCvAvailable: {
      type: Boolean,
      default: false,
    },
    socialLinks: {
      behance: { type: String, default: '' },
      dribbble: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      github: { type: String, default: '' },
      instagram: { type: String, default: '' },
      twitter: { type: String, default: '' },
    },
    seoDefaults: {
      metaTitle: {
        type: String,
        default: 'Abdur Rahman Khan | UI/UX Designer & Graphic Designer in Peshawar, Pakistan',
      },
      metaDescription: {
        type: String,
        default: 'Official portfolio of Abdur Rahman Khan, a professional UI/UX Designer and Graphic Designer offering user-centered web & mobile design, branding, SEO, and digital marketing.',
      },
      keywords: {
        type: [String],
        default: [
          'Abdur Rahman Khan',
          'UI/UX Designer',
          'Graphic Designer',
          'Peshawar Pakistan Designer',
          'Figma Designer',
          'Digital Marketing',
          'SEO Specialist',
          'Web Design'
        ],
      },
      siteUrl: {
        type: String,
        default: 'http://localhost:5173',
      },
    },
  },
  {
    timestamps: true,
  }
);

export const SiteSettings = mongoose.model('SiteSettings', SiteSettingsSchema);

