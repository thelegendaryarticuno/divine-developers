import mongoose, { Schema, Document } from 'mongoose';

interface IFileDetails extends Document {
  name: string;
  url: string;
  date: string;
  time: string;
}

const fileDetailsSchema: Schema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
});

export default mongoose.models.FileDetails || mongoose.model<IFileDetails>('FileDetails', fileDetailsSchema);
