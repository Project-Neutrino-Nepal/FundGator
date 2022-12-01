const express = require("express");
const router = express.Router();
const userAuth = require("../middlewares/auth-guard");
const Company= require("../models/companyModel");
const Reason = require("../models/reasonModel");
/**
 * @description To input list of top resason to invest in a company
 * @api /company/reason/api/create-reason
 * @access PRIVATE
 * @type POST
 */
router.post("/api/create-reason",userAuth,async(req,res)=>{
    try {
        const {body}=req;
        const comName = body.name;

        const company = await Company.findOne({name:comName});
        const companyID = company._id

        console.log(company);
        if(!company){
            return res.status(404).json({
                success:false,
                message:"Company not found"
            });
        }
        const reason=await Reason.create({
            company:companyID,
            ...body
        });
        res.status(200).json({
            success:true,
            message:"Reason created successfully",
            reason
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        });
    }
});

module.exports = router;


