import React from 'react';
import {
  Layout,
  Palette,
  Sparkles,
  TrendingUp,
  Search,
  Share2,
  ArrowRight,
  Check,
  Wand2,
  Image,
} from 'lucide-react';

const iconMap = {
  Layout: Layout,
  Palette: Palette,
  Sparkles: Sparkles,
  TrendingUp: TrendingUp,
  Wand2: Wand2,
  Image: Image,
  Search: Search,
  Share2: Share2,
};

const defaultServices = [
  {
    title: 'Logo Designing',
    slug: 'logo-designing',
    description: 'Crafting unique, memorable brand logos, scalable geometric vector marks, and visual identity standards that establish a distinctive brand presence.',
    icon: 'Sparkles',
    features: ['Custom Vector Logo Marks', 'Color Palette & Typography', 'Brand Identity Guidelines', 'Scalable Multi-Format Delivery'],
  },
  {
    title: 'Poster Designing',
    slug: 'poster-designing',
    description: 'Designing high-impact promotional posters, creative event flyers, typography prints, and exhibition banners tailored to captivate your audience.',
    icon: 'Palette',
    features: ['Event & Concert Posters', 'Promotional Advertising Banners', 'Typography & Creative Layouts', 'Print-Ready High-Res Outputs'],
  },
  {
    title: 'Website Images',
    slug: 'website-images',
    description: 'Creating custom web banners, responsive hero graphics, UI feature illustrations, and visual assets optimized for modern web experiences.',
    icon: 'Layout',
    features: ['Hero Header Banners', 'Responsive Web Assets', 'High-Speed WebP & SVG Formats', 'E-Commerce & Landing Page Visuals'],
  },
  {
    title: 'Image Editing',
    slug: 'image-editing',
    description: 'Professional photo retouching, clean background removal, color grading, lighting adjustment, and visual manipulation using Adobe Photoshop.',
    icon: 'Wand2',
    features: ['High-End Photo Retouching', 'Precise Background Removal', 'Color Grading & Lighting Correction', 'Complex Image Manipulation'],
  },
  {
    title: 'Marketing Designing',
    slug: 'marketing-designing',
    description: 'Designing high-converting marketing campaign assets, social media carousels, display advertising banners, and promotional digital graphics.',
    icon: 'TrendingUp',
    features: ['Social Media Ad Creatives', 'Instagram & LinkedIn Carousels', 'Promotional Campaign Assets', 'Conversion-Focused Visual Layouts'],
  },
];

export const Services = ({ services = [] }) => {
  const displayServices = services && services.length > 0 ? services : defaultServices;

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SERVICES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-light-text dark:text-dark-text tracking-tight">
            Specialized Design &amp; Creative Solutions
          </h2>
          <p className="text-light-muted dark:text-dark-muted text-base sm:text-lg leading-relaxed">
            Delivering high-end creative visual work spanning custom brand logos, promotional posters, responsive website graphics, photo editing, and marketing campaign assets.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayServices.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Sparkles;

            return (
              <div
                key={service._id || service.slug || index}
                className="group p-8 rounded-3xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border hover:border-accent dark:hover:border-accent transition-all duration-300 flex flex-col justify-between hover:shadow-card-dark"
              >
                <div>
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-6 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                    <IconComponent className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-3 group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-light-muted dark:text-dark-muted leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Feature Highlights */}
                  {service.features && service.features.length > 0 && (
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-light-muted dark:text-dark-muted">
                          <Check className="w-3.5 h-3.5 text-accent shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Card CTA */}
                <div className="pt-4 border-t border-light-border dark:border-dark-border">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-accent hover:text-accent-hover tracking-wide group-hover:translate-x-1 transition-transform"
                  >
                    <span>Enquire About This Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
