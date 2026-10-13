import React from 'react';
import { Sparkles, Quote, MessageSquare, Star, ShieldCheck } from 'lucide-react';

const defaultTestimonials = [
  {
    _id: 'sample-testimonial-1',
    authorName: 'Creative Partner (Sample Template)',
    authorTitle: 'Brand Director',
    company: 'Tech Studio Concept',
    quote:
      'Abdur Rahman demonstrated exceptional visual precision in developing our brand mark and logo identity. The typography hierarchy, Golden Ratio balance, and vector assets were cleanly delivered.',
    isSamplePlaceholder: true,
    rating: 5,
  },
  {
    _id: 'sample-testimonial-2',
    authorName: 'Marketing Lead (Sample Template)',
    authorTitle: 'Growth Manager',
    company: 'Digital Agency Concept',
    quote:
      'The event poster designs and social media marketing carousels immediately engaged our target audience. High-impact color contrast, crisp typography, and fast turnaround.',
    isSamplePlaceholder: true,
    rating: 5,
  },
  {
    _id: 'sample-testimonial-3',
    authorName: 'Product Designer (Sample Template)',
    authorTitle: 'Design Lead',
    company: 'SaaS Platform Concept',
    quote:
      'Thoughtful UI layout structuring and web graphics with high aesthetic clarity. The responsive image assets and banner mockups elevated the overall presentation of our web platform.',
    isSamplePlaceholder: true,
    rating: 5,
  },
];

export const Testimonials = ({ testimonials = [] }) => {
  const displayTestimonials =
    testimonials && testimonials.length > 0 ? testimonials : defaultTestimonials;

  return (
    <section id="testimonials" className="py-24 bg-light-secondary dark:bg-dark-secondary transition-colors relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TESTIMONIALS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-light-text dark:text-dark-text tracking-tight">
            What People Say
          </h2>
          <p className="text-light-muted dark:text-dark-muted text-base leading-relaxed">
            Client feedback and collaborative reviews across branding, poster design, website graphics, and marketing.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayTestimonials.map((t) => (
            <div
              key={t._id || t.authorName}
              className="p-8 rounded-3xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border hover:border-accent dark:hover:border-accent transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-glow-orange/20"
            >
              <div>
                {/* Rating & Placeholder Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-1 text-accent">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">
                    <ShieldCheck className="w-3 h-3" />
                    <span>{t.isSamplePlaceholder ? 'Sample Template' : 'Verified Client'}</span>
                  </span>
                </div>

                {/* Quote */}
                <Quote className="w-8 h-8 text-accent mb-3 opacity-40 group-hover:opacity-80 transition-opacity" />
                <p className="text-sm text-light-text dark:text-dark-text leading-relaxed italic mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-5 border-t border-light-border dark:border-dark-border">
                {t.photo ? (
                  <img
                    src={t.photo}
                    alt={t.authorName}
                    className="w-11 h-11 rounded-full object-cover border border-accent"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-accent/15 border border-accent/30 text-accent font-bold flex items-center justify-center text-sm">
                    {t.authorName ? t.authorName[0] : 'C'}
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-bold text-light-text dark:text-dark-text group-hover:text-accent transition-colors">
                    {t.authorName}
                  </h4>
                  <p className="text-xs text-light-muted dark:text-dark-muted">
                    {t.authorTitle} {t.company && `• ${t.company}`}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA / Notice */}
        <div className="mt-14 text-center">
          <p className="text-xs text-light-muted dark:text-dark-muted mb-3">
            Demonstration feedback templates shown above. Genuine client reviews can be managed and published via the secure Admin Dashboard.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-accent hover:bg-accent-hover text-white text-xs font-semibold shadow-glow-orange transition-all duration-200"
          >
            <span>Work with Abdur Rahman &rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
};

