const Feedback = require("./feedbackLib");

const getAllFeedbacks = (req, res) => {
    const feedbacks = Feedback.getAll();
    res.json(feedbacks);
};

const createFeedback = (req, res) => {
    const { name, message, rating } = req.body;

    const feedback = Feedback.addOne(name, message, rating);
    if (feedback) {
        res.json(feedback);
    } else {
        res.status(500).json({ message: "Failed to create pet" });
    }
};

const getFeedbackById = (req, res) => {
    const id = req.params.feedbackId;
    console.log(id);
    const feedback = Feedback.findById(id);
    console.log(feedback);
    if (feedback) {
        res.json(feedback);
    } else {
        res.status(404).json({ message: "Feedback not found" });
    }
};

const updateFeedback = (req, res) => {
    const id = req.params.feedbackId;
    const { name, message, rating } = req.body;

    const feedback = Feedback.updateById(id, name, message, rating);

    if (feedback) {
        res.json(feedback);
    } else {
        res.status(404).json({ message: "Feedback not found" });
    }
};

const deleteFeedback = (req, res) => {
    const id = req.params.feedbackId;
    const result = Feedback.deleteById(id);
    if (result) {
        res.json({ message: "Feedback deleted" });
    } else {
        res.status(404).json({ message: "Feedback not found" });
    }
};

module.exports = {
  getAllFeedbacks,
  getFeedbackById,
  createFeedback,
  updateFeedback,
  deleteFeedback,
};