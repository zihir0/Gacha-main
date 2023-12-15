import Inventory from "../models/Inventory.js";

export const getInventory = async (req, res) => {
  try {
    const { id } = req.params;

    const inventory = await Inventory.findById(id);

    if (!inventory) {
      return res.status(404).json({ message: "Inventory not found" });
    }

    res.status(200).json(inventory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const inventory = await Inventory.findById(id);

    if (!inventory) {
      return res.status(404).json({ message: "Inventory not found" });
    }

    const { user_id, item_id, quantity } = req.body;

    // Prepare the updated fields
    const updatedFields = {
      user_id,
      item_id,
      quantity,
    };

    const updatedInventory = await Inventory.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { new: true }
    );

    res.status(200).json(updatedInventory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addItemToInventory = async (req, res) => {
  try {
    const { user_id, item_id, quantity } = req.body;

    const newItem = new Inventory({
      user_id,
      item_id,
      quantity,
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getInvetoryByPlayer = async (req, res) => {
  try {
    const { id } = req.params;

    const inventory = await Inventory.find({ user_id: id });

    if (!inventory) {
      return res.status(404).json({ message: "Inventory not found" });
    }

    res.status(200).json(inventory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteInventory = async (req, res) => {
  try {
    const { id } = req.params;

    const inventory = await Inventory.findByIdAndDelete(id);

    if (!inventory) {
      return res.status(404).json({ message: "Inventory not found" });
    }

    res.status(200).json(inventory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
