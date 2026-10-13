import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please provide a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const contactEnquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  projectType: z.string().min(2, 'Project type is required').max(100),
  budget: z.string().optional().default('Flexible / Not Specified'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
});

export const projectSchema = z.object({
  title: z.string().min(2, 'Title is required').max(150),
  slug: z.string().min(2).max(150).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  category: z.string().min(2, 'Category is required').max(100),
  shortDescription: z.string().min(10).max(300),
  fullDescription: z.string().optional().default(''),
  objectives: z.array(z.string()).optional().default([]),
  process: z.array(z.string()).optional().default([]),
  solution: z.string().optional().default(''),
  coverImage: z.string().optional().default('/images/project-placeholder.svg'),
  gallery: z.array(z.string()).optional().default([]),
  tools: z.array(z.string()).optional().default(['Figma']),
  externalUrl: z.string().url().or(z.literal('')).optional().default(''),
  featured: z.boolean().optional().default(false),
  status: z.enum(['draft', 'published']).default('published'),
  isSamplePlaceholder: z.boolean().optional().default(false),
  displayOrder: z.number().optional().default(0),
  seoTitle: z.string().optional().default(''),
  seoDescription: z.string().optional().default(''),
});

export const serviceSchema = z.object({
  title: z.string().min(2).max(100),
  slug: z.string().min(2).max(100),
  description: z.string().min(10),
  icon: z.string().default('Layout'),
  features: z.array(z.string()).optional().default([]),
  displayOrder: z.number().optional().default(0),
  isPublished: z.boolean().optional().default(true),
});

export const skillSchema = z.object({
  name: z.string().min(2).max(100),
  category: z.enum(['Design', 'Tools', 'Marketing & SEO', 'Media']),
  icon: z.string().default('Sparkles'),
  description: z.string().optional().default(''),
  displayOrder: z.number().optional().default(0),
  isPublished: z.boolean().optional().default(true),
});

export const testimonialSchema = z.object({
  authorName: z.string().min(2),
  authorTitle: z.string().optional().default(''),
  company: z.string().optional().default(''),
  quote: z.string().min(10),
  photo: z.string().optional().default(''),
  isVerified: z.boolean().optional().default(false),
  isPublished: z.boolean().optional().default(false),
});

