import { Business } from "../models/business.js";
import { ErrorHandler, TryCatch } from "../utility/utility.js";


export const handleAllBusiness = TryCatch(async (req, res, next) => {
  const businesses = await Business.find();
  res.status(200).json({
    success: true,
    businesses,
  });
})


export const handleBusiness = TryCatch(async (req, res, next) => {
  const { name, category, location, description } = req.body;

  // Check if the business already exists
  const existingbusiness = await Business.findOne({ name });

  if (existingbusiness) {
    return next(new ErrorHandler("Business already exists", 403)); // 403 Forbidden
  }

  // Create the new business
  const business = await Business.create({
    name,
    category,
    location,
    description,
  });

  // No need to call save again, Business.create() already saves it

  res.status(200).json({
    success: true,
    business,
  });
});
