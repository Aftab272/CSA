import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IService extends Document {
  title: string;
  category: string;
  description: string;
  benefits: string[];
  image: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    category: { type: String, required: true, trim: true, maxlength: 80 },
    description: { type: String, required: true, trim: true, maxlength: 1200 },
    benefits: {
      type: [String],
      default: [],
      validate: [(arr: string[]) => arr.length <= 10, 'Too many benefits'],
    },
    image: { type: String, required: true, trim: true, maxlength: 500 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

ServiceSchema.index({ isActive: 1, createdAt: -1 });

const Service: Model<IService> =
  mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);

export default Service;
