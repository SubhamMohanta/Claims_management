import mongoose from "mongoose";

const ClaimSchema = new mongoose.Schema({
  claimId: { type: String, required: true, unique: true },
  patientName: { type: String, required: true },
  patientId: { type: String, required: false },
  diagnosis: { type: String, required: false },
  procedures: [{ type: String }],
  totalAmount: { type: Number, required: true },
  invoiceDate: { type: Date, required: true },
  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
  documents: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Claim || mongoose.model("Claim", ClaimSchema);
