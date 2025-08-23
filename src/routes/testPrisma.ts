import { Router } from "express";
import prisma  from "../db/client";

const router = Router();

router.get("/", async (req, res) => {
  try {
    // Create a test user if not exists
    const user = await prisma.user.upsert({
      where: { email: "test@example.com" },
      update: {},
      create: {
        email: "test@example.com",
        firstName: "Test User",
        passwordHash: "hashedpassword123",
      },
    });

    // Fetch all users
    const users = await prisma.user.findMany();

    res.json({
      message: "✅ Prisma works fine!",
      createdOrFoundUser: user,
      allUsers: users,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "❌ Prisma error", error: err });
  }
});

export default router;
