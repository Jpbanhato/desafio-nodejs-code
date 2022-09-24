import { Router } from "express";
import Role from "../models/Role.js";

const router = Router();

router.post("/", async (req, res) => {
  const { name } = req.body;
  if (!name) {
    throw new Error("Name is required");
  }
  const role = { name };
  try {
    const newRole = await Role.create(role);
    res.status(201).json({ message: "Role created" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/", async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch {
    res.status(500).json({ error: error });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const role = await Role.findOne({ _id: id });
    if (!role) {
      res.status(422).json({ message: "Role not found" });
      return;
    }
    res.status(200).json(role);
  } catch {
    res.status(500).json({ error: error });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const role = { name };
  try {
    const updatedRole = await Role.updateOne({ _id: id }, role);
    if (updatedRole.matchedCount === 0) {
      res.status(422).json({ message: "Role not found" });
      return;
    }
    res.status(200).json(role);
  } catch {
    res.status(500).json({ error: error });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const role = await Role.findOne({ _id: id });
  if (!role) {
    res.status(422).json({ message: "Role not found" });
    return;
  }
  try {
    await Role.deleteOne({ _id: id });
    res.status(200).json({ message: "Role deleted" });
  } catch {
    res.status(500).json({ error: error });
  }
});

export default router;
