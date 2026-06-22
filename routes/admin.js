const express = require("express");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

const router = express.Router();

router.post("/register", async (req,res)=>{

    try{

        const { email, password } = req.body;

        const existingAdmin =
        await Admin.findOne({ email });

        if(existingAdmin){

            return res.json({
                success:false,
                message:"Admin Already Exists"
            });

        }

        const hashedPassword =
        await bcrypt.hash(password,10);

        const admin = new Admin({
            email,
            password:hashedPassword
        });

        await admin.save();

        res.json({
            success:true,
            message:"Admin Registered Successfully"
        });

    }catch(err){

        res.status(500).json({
            success:false,
            message:err.message
        });

    }

});

module.exports = router;