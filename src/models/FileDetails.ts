import mongoose, { Schema, Document } from 'mongoose';

export interface IFileDetails extends Document {
  name: string;
  url: string;
  date: string;
  time: string;
  status: string;
  reason?: string;
}

const fileDetailsSchema: Schema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  status: { type: String, required: true, default: "pending" },
  reason: { type: String },
});

export default mongoose.models.FileDetails || mongoose.model<IFileDetails>('FileDetails', fileDetailsSchema);
