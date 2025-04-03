import mongoose from "mongoose";

const ClaimSchema = new mongoose.Schema({
  patientName: String,
  diagnosis: String,
  totalAmount: Number,
  invoiceDate: Date,
});

export default mongoose.models.Claim || mongoose.model("Claim", ClaimSchema);
