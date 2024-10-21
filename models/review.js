import { model, Schema, Types } from "mongoose";

const reviewSchema = new Schema({
    business: {
        type: Types.ObjectId,
        ref: 'Business'
    },
    user: {
        type: Types.ObjectId,
        ref: 'User'
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    } // pending, approved, rejected
}, { timestamps: true });

export const Review = model('Review', reviewSchema);
