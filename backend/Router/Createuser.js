const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const User = require("../model/userSchema");
// Route to register a user
router.post(
    "/user",
    [
        body("email").isEmail().withMessage("Invalid email address"),
        body("name").isLength({ min: 5 }).withMessage("Name must be at least 5 characters long"),
        body("password").isLength({ min: 5 }).withMessage("Password must be at least 5 characters long"),
    ],
    async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                location: req.body.location
            });
            res.json({ success: true });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, error: "Server error" });
        }
    }
);

// Route to login a user
router.post(
    '/login',
    [
        body("email").isEmail().withMessage("Invalid email address"),
        body("password").isLength({ min: 5 }).withMessage("Password must be at least 5 characters long"),
    ],
    async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ success: false, error: "Incorrect credentials" });
            }

            // Compare plaintext password with stored password (consider hashing for production)
            if (password !== user.password) {
                return res.status(400).json({ success: false, error: "Incorrect credentials" });
            }

            return res.json({ success: true });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    }
);

module.exports = router;
