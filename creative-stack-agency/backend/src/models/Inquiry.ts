import mongoose, { Document, Model, Schema } from 'mongoose';

export type InquiryStatus = 'new' | 'in_progress' | 'resolved' | 'spam';

export interface IInquiry extends Document {
  name: string;
  email: string;
  service: string;
  message: string;
  source: 'website' | 'admin';
  status: InquiryStatus;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
  updatedAt: Date;
}

const InquirySchema = new Schema<IInquiry>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 120,
    },
    service: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    source: {
      type: String,
      enum: ['website', 'admin'],
      default: 'website',
    },
    status: {
      type: String,
      enum: ['new', 'in_progress', 'resolved', 'spam'],
      default: 'new',
    },
    ipAddress: {
      type: String,
      trim: true,
      maxlength: 64,
    },
    userAgent: {
      type: String,
      trim: true,
      maxlength: 300,
    },
  },
  {
    timestamps: true,
  }
);

InquirySchema.index({ email: 1, createdAt: -1 });
InquirySchema.index({ status: 1, createdAt: -1 });

const Inquiry: Model<IInquiry> =
  mongoose.models.Inquiry || mongoose.model<IInquiry>('Inquiry', InquirySchema);

export default Inquiry;
