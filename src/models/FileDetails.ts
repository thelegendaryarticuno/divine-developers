import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for FileDetails
export interface IFileDetails extends Document {
  name: string;
  fileName: string;
  url: string;
  date: string;
  time: string;
  status: string;
  reason?: string;
  onboardingDate: string; 
  onboardingTime: string; 
  onboardingStatus: string; 
}

const fileDetailsSchema: Schema = new Schema({
  name: { type: String, required: true },
  fileName: { type: String, default: "N/A" }, // File name
  url: { type: String, default: "N/A" },      // URL
  date: { type: String, default: "N/A" },     // Date
  time: { type: String, default: "N/A" },     // Time
  status: { type: String, default: "N/A" },   // Status
  reason: { type: String, default: "No comments" }, // Reason
  onboardingDate: { type: String, default: "N/A" }, // Onboarding Date
  onboardingTime: { type: String, default: "N/A" }, // Onboarding Time
  onboardingStatus: { type: String, default: "N/A" }, // Onboarding Status
});

// Export the model, ensuring no recompilation
export default mongoose.models.FileDetails || mongoose.model<IFileDetails>('FileDetails', fileDetailsSchema);
