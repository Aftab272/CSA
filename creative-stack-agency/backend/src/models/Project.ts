import mongoose, { Document, Model, Schema } from 'mongoose';

type TechStack = {
  frontend: string[];
  backend: string[];
  database: string[];
  deployment: string[];
  other: string[];
};

export interface IProject extends Document {
  title: string;
  category: string;
  shortDescription: string;
  description: string;
  techStack: TechStack;
  features: string[];
  gallery: string[];
  githubUrl?: string;
  liveUrl?: string;
  completionDate?: Date;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const techStackSchema = new Schema<TechStack>(
  {
    frontend: { type: [String], default: [] },
    backend: { type: [String], default: [] },
    database: { type: [String], default: [] },
    deployment: { type: [String], default: [] },
    other: { type: [String], default: [] },
  },
  { _id: false }
);

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true, maxlength: 160 },
    category: { type: String, required: true, trim: true, maxlength: 80 },
    shortDescription: { type: String, required: true, trim: true, maxlength: 300 },
    description: { type: String, required: true, trim: true, maxlength: 2500 },
    techStack: { type: techStackSchema, required: true },
    features: { type: [String], default: [] },
    gallery: { type: [String], default: [] },
    githubUrl: { type: String, trim: true, maxlength: 500 },
    liveUrl: { type: String, trim: true, maxlength: 500 },
    completionDate: { type: Date },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

ProjectSchema.index({ isPublished: 1, createdAt: -1 });
ProjectSchema.index({ category: 1, createdAt: -1 });

const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
