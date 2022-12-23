const express = require('express');

const auth = require('../middlewares/auth-guard');
const Questions = require('../models/questionsModel');
const User = require('../models/userModel');
const Company = require('../models/companyModel');
const userAuth = require('../middlewares/auth-guard');
const router = express.Router();


//to create question by user to company
router.post('/api/create-qn/:company', userAuth, async (req, res) => {
    try {
        const
            user = await User.findById(req.user._id),
            company = await Company.findById(req.params.company),
            question = new Questions({
                user: user,
                question: req.body.question,
                answer: req.body.answer,
                company:company

            });
        await question.save();
        return res.status(200).json({
            success: true,
            message: "question added successfully",
            question,
          });
        } catch (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: "An error occurred.",
          });
        }
      });

    

    //to reply to question by company
    router.post('/api/reply-qn/:id', userAuth, async (req, res) => {
        try {
            const
                company = await Company.findById(req.user._id),
                question = await Questions.findById(req.params.id);
            if (!question) {
                return res.status(400).json({
                    success: false,
                    message: "Question not found",
                });
            }
            question.answer = req.body.answer;
            question.company = company;
            await question.save();
            return res.status(200).json({
                success: true,
                message: "Question replied successfully",
                question,
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "An error occurred.",
            });
        }
    });


//to get all questions of company
router.get('/api/qn-company/:company', userAuth, async (req, res) => {
    try {
        let questions = await Questions.find({ company: req.params.company
        });
        if (!questions) {
            return res.status(400).json({
                success: false,
                message: "Questions not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Questions fetched successfully",
            questions,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "An error occurred.",
        });
    }
});

//to get question of praticular company
router.get('/api/qn-company/:id', userAuth, async (req, res) => {
    try {
        let question = await Company.findById(req.params.id);
        if (!question) {
            return res.status(400).json({
                success: false,
                message: "Question not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Question fetched successfully",
            question,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "An error occurred.",
        });
    }
});


//to delete question 
router.delete('/api/delete-qn/:id', userAuth, async (req, res) => {
    try {
        let question = await Questions.findById(req.params.id);
        if (!question) {
            return res.status(400).json({
                success: false,
                message: "Question not found",
            });
        }
        await question.remove();
        return res.status(200).json({
            success: true,
            message: "Question deleted successfully",
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "An error occurred.",
        });
    }
});

module.exports = router;