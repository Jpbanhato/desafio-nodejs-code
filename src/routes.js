const Router = require("express").Router();
// import { Router } from "express";
import Depto from "../../models/Depto";

router.post("/", async (req, res) => {
  const { name } = req.body;
  if (!name) {
    throw new Error("Name is required");
  }
  const depto = { name };
  try {
    await Depto.create(depto);
    res.status(201).json({ message: "Depto created" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
  deptos.push(name);
  return res.json(deptos);
});

router.get("/", async (req, res) => {
  try {
    const deptos = await Depto.find();
    res.status(200).json(deptos);
  } catch {
    res.status(500).json({ error: error });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params.id;
  try {
    const depto = await Depto.findOne({ _id: id });
    if (!depto) {
      res.status(422).json({ message: "Depto not found" });
      return;
    }
    res.status(200).json(depto);
  } catch {
    res.status(500).json({ error: error });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params.id;
  const { name } = req.body;
  const depto = { name };
    try {
        const updatedDepto = await Depto.updateOne({ _id: id }, depto);
        if (updatedDepto.matchedCount === 0) {
            res.status(422).json({ message: "Depto not found" });
            return;
        }
        res.status(200).json(depto);
    } catch {
        res.status(500).json({ error: error });
    }
  deptos[id] = name;
  return res.json(deptos);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params.id;
  const depto = await Depto.findOne({ _id: id });
    if (!depto) {
      res.status(422).json({ message: "Depto not found" });
      return;
    }
  try {
    await Depto.deleteOne({ _id: id });
    res.status(200).json({ message: "Depto deleted" });
  }
    catch {
        res.status(500).json({ error: error });
    }
});

module.exports = router;
