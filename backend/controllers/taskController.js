const Task = require('../models/Task');
const getTasks = async (req, res) => {
try {
const tasks = await Task.find({ userId: req.user.id });
res.json(tasks);
} catch (error) {
res.status(500).json({ message: error.message });
}
};

const addTask = async (req, res) => {
    const { title, author, price } = req.body;
    try {
    const task = await Task.create({ userId: req.user.id, title, author,
    price });
    res.status(201).json(task);
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
    };

const updateTask = async (req, res) => {
    const { title, author, price } = req.body;
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Book not found' });
        task.title = title || task.title;
        task.author = author || task.author;
        task.price = price || task.price;
        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
};

const deleteTask = async (req, res) => {
    try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Book not found' });
    await task.remove();
    res.json({ message: 'Book deleted' });
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
};

module.exports = { getTasks, addTask, updateTask, deleteTask };