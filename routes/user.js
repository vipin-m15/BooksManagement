import { Router } from "express";
import { getAllBook } from "../controllers/admin.js";
import { authenticate } from "../middleware/authenticate.js";
import { search } from "../controllers/user.js";

export const router = Router();

router.get("/getAllBooks", authenticate, getAllBook);
router.get("/search", authenticate, search);
