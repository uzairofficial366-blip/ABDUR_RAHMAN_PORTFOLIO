import dotenv from 'dotenv';
dotenv.config();

import { connectDB, disconnectDB } from '../src/config/db.js';
import { SiteSettings } from '../src/models/SiteSettings.js';
import { Service } from '../src/models/Service.js';
import { Skill } from '../src/models/Skill.js';
import { Project } from '../src/models/Project.js';
import { Testimonial } from '../src/models/Testimonial.js';

const seedData = async () => {
  try {
    await connectDB();
    console.log('🌱 Seeding verified defaults and sample concepts...');

    // 1. Site Settings
    await SiteSettings.deleteMany({});
    await SiteSettings.create({
      brandName: 'Abdur Rahman Khan',
      professionalTitle: 'UI/UX Designer & Graphic Designer',
      heroHeadline: 'Designing meaningful digital experiences through creativity and strategy.',
      heroDescription: 'Specializing in intuitive user interfaces, visual design systems, brand identities, digital marketing, and search engine optimization based in Peshawar, Pakistan.',
      biography: 'I am a UI/UX Designer and Graphic Designer based in Peshawar, Pakistan. With hands-on practice in user experience, graphic identity, digital marketing, and SEO, I focus on building functional, visually engaging digital solutions tailored to modern brands.',
      experiencePlaceholder: '1–3 years of hands-on practice in design prototyping, visual identity development, digital marketing, and SEO strategy.',
      educationPlaceholder: 'Education credentials can be updated from the admin dashboard.',
      certificationsPlaceholder: 'Professional design and SEO certifications will be added here.',
      careerGoalsPlaceholder: 'Committed to designing seamless user-centric digital experiences and driving meaningful organic growth for forward-thinking brands.',
      location: 'Peshawar, Pakistan',
      contactEmail: 'abdurrahman94700@gmail.com',
      contactPhone: '+923139470097',
      whatsappNumber: '+923139470097',
      profileImage: '/images/profile.jpeg',
      cvUrl: '',
      isCvAvailable: false,
      socialLinks: {
        linkedin: '',
        behance: '',
        dribbble: '',
        github: '',
        instagram: '',
        twitter: '',
      },
      seoDefaults: {
        metaTitle: 'Abdur Rahman Khan | UI/UX Designer & Graphic Designer',
        metaDescription: 'Portfolio of Abdur Rahman Khan, UI/UX Designer & Graphic Designer offering digital marketing and SEO services in Peshawar, Pakistan.',
        keywords: [
          'Abdur Rahman Khan',
          'UI/UX Designer',
          'Graphic Designer',
          'Digital Marketing',
          'SEO Peshawar',
          'Figma',
          'Pakistan Designer'
        ],
        siteUrl: 'http://localhost:5173',
      },
    });

    // 2. Services
    await Service.deleteMany({});
    const services = [
      {
        title: 'Logo Designing',
        slug: 'logo-designing',
        description: 'Crafting unique, memorable brand logos, geometric vector marks, and visual identity standards that establish a distinctive brand presence.',
        icon: 'Sparkles',
        features: ['Custom Vector Logo Marks', 'Color Palette & Typography', 'Brand Identity Guidelines', 'Scalable Multi-Format Delivery'],
        displayOrder: 1,
        isPublished: true,
      },
      {
        title: 'Poster Designing',
        slug: 'poster-designing',
        description: 'Designing high-impact promotional posters, creative event flyers, typography prints, and exhibition banners tailored to captivate your audience.',
        icon: 'Palette',
        features: ['Event & Concert Posters', 'Promotional Advertising Banners', 'Typography & Creative Layouts', 'Print-Ready High-Res Outputs'],
        displayOrder: 2,
        isPublished: true,
      },
      {
        title: 'Website Images',
        slug: 'website-images',
        description: 'Creating custom web banners, responsive hero graphics, UI feature illustrations, and visual assets optimized for modern web experiences.',
        icon: 'Layout',
        features: ['Hero Header Banners', 'Responsive Web Assets', 'High-Speed WebP & SVG Formats', 'E-Commerce & Landing Page Visuals'],
        displayOrder: 3,
        isPublished: true,
      },
      {
        title: 'Image Editing',
        slug: 'image-editing',
        description: 'Professional photo retouching, clean background removal, color grading, lighting adjustment, and visual manipulation using Adobe Photoshop.',
        icon: 'Wand2',
        features: ['High-End Photo Retouching', 'Precise Background Removal', 'Color Grading & Lighting Correction', 'Complex Image Manipulation'],
        displayOrder: 4,
        isPublished: true,
      },
      {
        title: 'Marketing Designing',
        slug: 'marketing-designing',
        description: 'Designing high-converting marketing campaign assets, social media carousels, display advertising banners, and promotional digital graphics.',
        icon: 'TrendingUp',
        features: ['Social Media Ad Creatives', 'Instagram & LinkedIn Carousels', 'Promotional Campaign Assets', 'Conversion-Focused Visual Layouts'],
        displayOrder: 5,
        isPublished: true,
      },
    ];
    await Service.insertMany(services);

    // 3. Skills
    await Skill.deleteMany({});
    const skills = [
      { name: 'UI/UX Design', category: 'Design', icon: 'Layout', displayOrder: 1, isPublished: true },
      { name: 'Graphic Design', category: 'Design', icon: 'Palette', displayOrder: 2, isPublished: true },
      { name: 'Figma', category: 'Tools', icon: 'Figma', displayOrder: 3, isPublished: true },
      { name: 'Adobe Photoshop', category: 'Tools', icon: 'Image', displayOrder: 4, isPublished: true },
      { name: 'Adobe Illustrator', category: 'Tools', icon: 'PenTool', displayOrder: 5, isPublished: true },
      { name: 'Canva', category: 'Tools', icon: 'Layers', displayOrder: 6, isPublished: true },
      { name: 'Digital Marketing', category: 'Marketing & SEO', icon: 'TrendingUp', displayOrder: 7, isPublished: true },
      { name: 'SEO', category: 'Marketing & SEO', icon: 'Search', displayOrder: 8, isPublished: true },
      { name: 'Social Media Marketing', category: 'Marketing & SEO', icon: 'Share2', displayOrder: 9, isPublished: true },
      { name: 'Video Editing', category: 'Media', icon: 'Video', displayOrder: 10, isPublished: true },
    ];
    await Skill.insertMany(skills);

    // 4. Projects (Aligned with website requirements and specialized design services)
    await Project.deleteMany({});
    const sampleProjects = [
      {
        title: 'Apex Geometric Brand Identity — Concept',
        slug: 'apex-geometric-brand-identity-concept',
        category: 'Logo Designing',
        shortDescription: 'Minimalist geometric logo mark, Golden Ratio vector emblems, and visual brand identity system for a modern tech brand.',
        fullDescription: 'A demonstration design case study exploring geometric emblem construction, Golden Ratio grid alignment, monochrome contrast testing, and scalable brand guidelines.',
        objectives: [
          'Develop an iconic geometric logo mark with high memorability and recognition',
          'Validate scalability across mobile app icons, favicons, and large billboards',
          'Deliver comprehensive color palette, typography pairing, and usage rulebooks'
        ],
        process: [
          'Conceptual sketching and Golden Ratio geometric grid construction',
          'Precision vectorization in Adobe Illustrator with clean bezier curves',
          'High-contrast testing across dark and light surfaces and multi-size exports'
        ],
        solution: 'A timeless, scalable vector logo system with cohesive typography and high visual recognition across all mediums.',
        coverImage: '/images/project-3.svg',
        gallery: ['/images/project-3.svg'],
        tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Figma'],
        featured: true,
        status: 'published',
        isSamplePlaceholder: true,
        displayOrder: 1,
        seoTitle: 'Apex Geometric Brand Identity Concept | Abdur Rahman Khan',
        seoDescription: 'Minimalist geometric logo mark and brand identity concept sample.',
      },
      {
        title: 'SoundWave Neon Music Festival Poster — Concept',
        slug: 'soundwave-neon-music-festival-poster-concept',
        category: 'Poster Designing',
        shortDescription: 'High-contrast typography and digital arts promotional poster designed for an electronic music festival.',
        fullDescription: 'Demonstration poster design exploring dynamic kinetic typography layering, neon lighting contrast against deep black backgrounds, and print-ready CMYK preparation.',
        objectives: [
          'Establish visual hierarchy capturing viewer attention within seconds',
          'Harmonize bold kinetic typography with abstract vector artwork and glows',
          'Format for large-format street posters as well as vertical digital stories'
        ],
        process: [
          'Layout grid drafting and visual focal point alignment',
          'Typography warping, layered displacement, and custom texture blending',
          'Color separation, bleeds, and 300 DPI pre-press print optimization'
        ],
        solution: 'An eye-catching, modern poster that maximizes visual contrast and promotional clarity across print and digital displays.',
        coverImage: '/images/project-2.svg',
        gallery: ['/images/project-2.svg'],
        tools: ['Adobe Photoshop', 'Adobe Illustrator'],
        featured: true,
        status: 'published',
        isSamplePlaceholder: true,
        displayOrder: 2,
        seoTitle: 'SoundWave Music Festival Poster Concept | Abdur Rahman Khan',
        seoDescription: 'High-contrast creative event poster design concept sample.',
      },
      {
        title: 'Fintech SaaS Web Hero Graphics — Concept',
        slug: 'fintech-saas-web-hero-graphics-concept',
        category: 'Website Images',
        shortDescription: 'Custom web banners, 3D-styled UI device mockups, and feature graphics for a modern financial SaaS landing page.',
        fullDescription: 'Showcase of responsive web image design focusing on crisp SVG vectors, lightweight WebP compression, and high-impact visual conversion layout.',
        objectives: [
          'Design modern UI hero graphics that communicate product value instantaneously',
          'Ensure lightning-fast web performance with optimized WebP and SVG exports',
          'Maintain responsive visual balance across mobile, tablet, and desktop viewports'
        ],
        process: [
          'Wireframing visual asset placement within standard landing page grids',
          'Designing layered UI mockup cards with orange brand glow accents in Figma',
          'Compressing and testing image load performance across responsive breakpoints'
        ],
        solution: 'A responsive suite of web hero assets that elevates landing page aesthetics and visual clarity.',
        coverImage: '/images/project-1.svg',
        gallery: ['/images/project-1.svg'],
        tools: ['Figma', 'Adobe Photoshop'],
        featured: true,
        status: 'published',
        isSamplePlaceholder: true,
        displayOrder: 3,
        seoTitle: 'Fintech SaaS Web Hero Graphics Concept | Abdur Rahman Khan',
        seoDescription: 'Custom responsive web banners and UI hero graphics concept sample.',
      },
      {
        title: 'Luxury Timepiece Commercial Retouching — Concept',
        slug: 'luxury-timepiece-commercial-retouching-concept',
        category: 'Image Editing',
        shortDescription: 'Advanced commercial photo retouching, dust removal, metallic reflection balancing, and precision edge isolation.',
        fullDescription: 'Detailed demonstration of high-end image manipulation techniques: frequency separation, dodge and burn shading, chromatic aberration correction, and studio reflection rendering.',
        objectives: [
          'Isolate complex watch geometry with pixel-perfect pen tool masking',
          'Enhance metallic bevels, crystal reflections, and textural details',
          'Color-grade the background for dark-mode e-commerce presentation'
        ],
        process: [
          'Multi-path clipping and clean studio background isolation',
          'Frequency separation for surface smoothing without texture degradation',
          'Dodge & Burn lighting sculpting and color grading in Photoshop'
        ],
        solution: 'Flawless, commercial-grade product imagery with realistic reflections and pristine edges.',
        coverImage: '/images/project-5.svg',
        gallery: ['/images/project-5.svg'],
        tools: ['Adobe Photoshop', 'Lightroom'],
        featured: true,
        status: 'published',
        isSamplePlaceholder: true,
        displayOrder: 4,
        seoTitle: 'Luxury Product Retouching Concept | Abdur Rahman Khan',
        seoDescription: 'High-end commercial photo editing and retouching concept sample.',
      },
      {
        title: 'Social Media Growth Carousel & Ad Creatives — Concept',
        slug: 'social-media-growth-carousel-ad-creatives-concept',
        category: 'Marketing Designing',
        shortDescription: 'High-converting 10-slide Instagram & LinkedIn carousel campaign with consistent typography and call-to-action badges.',
        fullDescription: 'Demonstration template exploring educational visual carousels, attention-grabbing cover hooks, readable bite-sized data slides, and strong conversion arrows.',
        objectives: [
          'Achieve high dwell time and swipe-through completion rates on social feeds',
          'Standardize repeatable brand guidelines for fast-paced social publishing',
          'Optimize visual badges for mobile feed readability'
        ],
        process: [
          'Content outline and copywriting hierarchy structure',
          'Modular template construction with reusable visual components in Canva and Photoshop',
          'A/B testing cover graphic contrast variations'
        ],
        solution: 'A cohesive, high-retention social media carousel package that amplifies marketing reach.',
        coverImage: '/images/project-4.svg',
        gallery: ['/images/project-4.svg'],
        tools: ['Canva', 'Adobe Photoshop', 'Adobe Illustrator'],
        featured: false,
        status: 'published',
        isSamplePlaceholder: true,
        displayOrder: 5,
        seoTitle: 'Social Media Growth Carousel Concept | Abdur Rahman Khan',
        seoDescription: 'Social media marketing design and carousel campaign concept sample.',
      },
      {
        title: 'Modern E-Commerce Analytics Dashboard — Concept',
        slug: 'modern-ecommerce-analytics-dashboard-concept',
        category: 'UI/UX Website Design',
        shortDescription: 'A dark-mode analytics dashboard interface with clear visual hierarchy, accessible data charts, and intuitive navigation.',
        fullDescription: 'Demonstration UI/UX web layout highlighting information architecture, widget modularity, high contrast data tables, and cohesive orange highlight tokens.',
        objectives: [
          'Structure complex data metrics into digestible cards and visual charts',
          'Ensure WCAG AA contrast compliance across dark-mode widgets',
          'Create an interactive component library for rapid scaling'
        ],
        process: [
          'Information architecture sorting and user workflow mapping',
          'Interactive component design and tokenization in Figma',
          'High-fidelity prototype testing for user efficiency'
        ],
        solution: 'An intuitive, data-dense interface balancing elegant dark aesthetics with rapid operational efficiency.',
        coverImage: '/images/project-6.svg',
        gallery: ['/images/project-6.svg'],
        tools: ['Figma', 'Adobe Photoshop'],
        featured: false,
        status: 'published',
        isSamplePlaceholder: true,
        displayOrder: 6,
        seoTitle: 'E-Commerce Analytics Dashboard Concept | Abdur Rahman Khan',
        seoDescription: 'E-Commerce dashboard UI/UX design concept sample.',
      },
    ];
    await Project.insertMany(sampleProjects);

    // 5. Testimonials (Kept clean - none published per prompt rules)
    await Testimonial.deleteMany({});
    // We do NOT publish fabricated reviews. Admin can add genuine reviews when available.

    console.log('✅ Database seeded successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    await disconnectDB();
    process.exit(0);
  }
};

seedData();

