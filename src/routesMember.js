import { Router } from "express";
import Member from "../models/Member.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, password, birthday, depto, role } = req.body;
    if (!name || !email || !password || !birthday || !role) {
      throw new Error("Fields are required");
    }
    const member = await Member.create({ name, email, password, birthday, role });
    await Promise.all(
      depto.map(async (deptoMap) => {
        console.log(deptoMap);
        const memberDepto = new Depto({ ...deptoMap, member: member._id });
        await memberDepto.save();
        member.depto.push(memberDepto);
      })
    );
    await member.save();
    const newMember = await Member.create(member);
    res.status(201).json({ message: "Member created" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/", async (req, res) => {
  try {
    const members = await Member.find().populate(["depto", "role"]);
    res.status(200).json(members);
  } catch {
    res.status(500).json({ error: error });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const member = await Member.findOne({ _id: id }).populate([
      "depto",
      "role",
    ]);
    if (!member) {
      res.status(422).json({ message: "Member not found" });
      return;
    }
    res.status(200).json(member);
  } catch {
    res.status(500).json({ error: error });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, password, birthday, depto, role } = req.body;
  const member = { name, email, password, birthday, depto, role };
  try {
    const updatedMember = await Member.updateOne({ _id: id }, member);
    if (updatedMember.matchedCount === 0) {
      res.status(422).json({ message: "Member not found" });
      return;
    }
    res.status(200).json(member);
  } catch {
    res.status(500).json({ error: error });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const member = await Member.findOne({ _id: id });
  if (!member) {
    res.status(422).json({ message: "Member not found" });
    return;
  }
  try {
    await Member.deleteOne({ _id: id });
    res.status(200).json({ message: "Member deleted" });
  } catch {
    res.status(500).json({ error: error });
  }
});

export default router;
