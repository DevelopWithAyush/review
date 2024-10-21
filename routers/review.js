import express from 'express'
import { adminAuthenticated, isAuthenticated } from '../middleware/auth.js'
import { handleAddReview, handleUpdateReview } from '../controller/review.js'

const router = express.Router()

router.use(isAuthenticated)
router.post("/:businessId",handleAddReview)
router.use(adminAuthenticated)
router.put("/:reviewId", handleUpdateReview)


export default router