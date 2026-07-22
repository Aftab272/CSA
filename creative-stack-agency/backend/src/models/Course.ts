import mongoose, { Document, Model, Schema } from 'mongoose';

type Instructor = {
  name: string;
  designation: string;
  image: string;
};

export interface ICourse extends Document {
  title: string;
  image: string;
  duration: string;
  instructor: Instructor;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Professional';
  syllabus: string[];
  seats: number;
  hasCertificate: boolean;
  features: string[];
  price: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const instructorSchema = new Schema<Instructor>(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    designation: { type: String, required: true, trim: true, maxlength: 120 },
    image: { type: String, required: true, trim: true, maxlength: 500 },
  },
  { _id: false }
);

const CourseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true, trim: true, maxlength: 180 },
    image: { type: String, required: true, trim: true, maxlength: 500 },
    duration: { type: String, required: true, trim: true, maxlength: 80 },
    instructor: { type: instructorSchema, required: true },
    level: {
      type: String,
      required: true,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Professional'],
    },
    syllabus: { type: [String], default: [] },
    seats: { type: Number, default: 10, min: 1, max: 500 },
    hasCertificate: { type: Boolean, default: true },
    features: { type: [String], default: [] },
    price: { type: String, required: true, trim: true, maxlength: 80 },
    description: { type: String, required: true, trim: true, maxlength: 1200 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

CourseSchema.index({ isActive: 1, createdAt: -1 });
CourseSchema.index({ title: 1 }, { unique: true });

const Course: Model<ICourse> =
  mongoose.models.Course || mongoose.model<ICourse>('Course', CourseSchema);

export default Course;
