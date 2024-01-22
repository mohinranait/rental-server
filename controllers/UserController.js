const User = require("../models/UserModel");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { jwtSecret } = require("../services/secretEnv");

const registerUser = async (req, res) => {
    const body = req.body;
    const saltRounds = 10;
    try {
        const hasPass = await bcrypt.hash(body?.password, saltRounds);
        const user = await User.create({...body, password: hasPass});
        res.send({
            success:true,
            user,
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message: error.message,
        })
    }
}

const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.send({
                message: "Notfound",
                success:false,
            })
        }
        const passwordMatch = await bcrypt.compare( password , user?.password )
        if(!passwordMatch){
            return res.send({
                message: "Email and password not exists",
                success:false,
            })
        }

        const token = jwt.sign({ id: user?._id, email: user?.email }, jwtSecret, {expiresIn:'1h'});

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite:  'none',
        })

        res.send({
            success: true,
            message:"Login successfull",
            user,
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message: error.message,
        })
    }
}


const findUsreById = async (req, res) => {
    try {
        const id = req.params?.id;
        const tokenUserId = req.user?.id;
        if(id !== tokenUserId){
            res.send({
                message: "Invalid request",
                success:false,
            })
        }
        const user = await User.findById(id);
        if(!user){
            return res.send({
                message: "Notfound",
                success:false,
            })
        }
        res.send({
            user,
            success:true,
        })

    } catch (error) {
        
    }
}


module.exports = {
    registerUser,
    loginUser,
    findUsreById
}