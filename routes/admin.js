import { Router } from "express";
import {
  createBook,
  deleteBook,
  getAllBook,
  getOneBook,
  updateBook,
} from "../controllers/admin.js";
import { authenticate } from "../middleware/authenticate.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

export const router = Router();

router.post("/createBook", authenticate, adminMiddleware, createBook);
router.patch("/update/:id", authenticate, adminMiddleware, updateBook);
router.get("/getOne/:id", authenticate, adminMiddleware, getOneBook);
router.get("/getAllBooks", authenticate, adminMiddleware, getAllBook);
router.delete("/delete/:id", authenticate, adminMiddleware, deleteBook);
