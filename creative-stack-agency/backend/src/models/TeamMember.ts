import mongoose, { Document, Model, Schema } from 'mongoose';

type SocialLinks = {
  email?: string;
  linkedin?: string;
  github?: string;
  website?: string;
  whatsapp?: string;
  tiktok?: string;
  facebook?: string;
  instagram?: string;
};

export interface ITeamMember extends Document {
  name: string;
  position: string;
  role: string;
  experience: string;
  rating: number;
  testimonial: string;
  image: string;
  intro: string;
  education: string;
  projects: string;
  achievements: string;
  skills: string[];
  certificates: string[];
  social: SocialLinks;
  resume?: string;
  portfolio?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const socialSchema = new Schema<SocialLinks>(
  {
    email: { type: String, trim: true, maxlength: 120 },
    linkedin: { type: String, trim: true, maxlength: 500 },
    github: { type: String, trim: true, maxlength: 500 },
    website: { type: String, trim: true, maxlength: 500 },
    whatsapp: { type: String, trim: true, maxlength: 500 },
    tiktok: { type: String, trim: true, maxlength: 500 },
    facebook: { type: String, trim: true, maxlength: 500 },
    instagram: { type: String, trim: true, maxlength: 500 },
  },
  { _id: false }
);

const TeamMemberSchema = new Schema<ITeamMember>(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    position: { type: String, required: true, trim: true, maxlength: 120 },
    role: { type: String, required: true, trim: true, maxlength: 200 },
    experience: { type: String, required: true, trim: true, maxlength: 120 },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    testimonial: { type: String, required: true, trim: true, maxlength: 1000 },
    image: { type: String, required: true, trim: true, maxlength: 500 },
    intro: { type: String, required: true, trim: true, maxlength: 3000 },
    education: { type: String, required: true, trim: true, maxlength: 500 },
    projects: { type: String, required: true, trim: true, maxlength: 2000 },
    achievements: { type: String, required: true, trim: true, maxlength: 2000 },
    skills: { type: [String], default: [] },
    certificates: { type: [String], default: [] },
    social: { type: socialSchema, default: {} },
    resume: { type: String, trim: true, maxlength: 500 },
    portfolio: { type: String, trim: true, maxlength: 500 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

TeamMemberSchema.index({ isActive: 1, createdAt: -1 });
TeamMemberSchema.index({ name: 1 }, { unique: true });

const TeamMember: Model<ITeamMember> =
  mongoose.models.TeamMember ||
  mongoose.model<ITeamMember>('TeamMember', TeamMemberSchema);

export default TeamMember;
