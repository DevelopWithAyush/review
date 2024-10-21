import { Business } from "../models/business.js";
import { Review } from "../models/review.js";
import { TryCatch } from "../utility/utility.js";

export const handleAddReview = TryCatch(async (req, res, next) => {
  const { businessId } = req.params;
  console.log(businessId);
  const { rating, comment } = req.body;

  if (!rating || !comment) {
    return next(new ErrorHandler("Rating and comment are required", 400));
  }

  const review = new Review({
    business: businessId,
    user: req.user,
    rating,
    comment,
  });

  await review.save();

  const updatedBusiness = await Business.findByIdAndUpdate(
    businessId,
    {
      $push: { reviews: review._id },
    },
    { new: true }
  );

  if (!updatedBusiness) {
    return next(new ErrorHandler("Business not found", 404));
  }

  res.status(201).json({ message: "Review added successfully" });
});

export const handleUpdateReview = TryCatch(async (req, res, next) => {
    const { status } = req.body;

    if (!status) {
        return next(new ErrorHandler("Status is required", 400));  // 400 Bad Request
    }

    const review = await Review.findByIdAndUpdate(
        req.params.reviewId,
        { status },
        { new: true }
    );

    if (!review) {
        return next(new ErrorHandler("Review not found", 404));  // 404 Not Found
    }

    res.status(200).json({ success: true, message: "Review updated successfully" });
});
