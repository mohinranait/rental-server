const House = require("../models/HouseModel");


const createNewHouse = async (req, res) => {
    console.log(req.body);
    const tokenId = req.user?.id;
    if(!tokenId){
        return res.send({
            message:"Unauthorize",
            success:false,
        })
    }

    const body = req.body;

    try {
        const house = await House.create({...body});
        res.send({
            success:true,
            message:"Created successfull",
        })
    } catch (error) {
        return res.send({
            message:error.message,
            success:false,
        })
    }
}

// get owner wish house
const getOwnerHouse = async(req, res) => {
    try {
        const userId = req.params?.id;
        const tokenId = req.user?.id;
        if(userId !== tokenId){
            return res.status(401).send({
                message:"Unauthorize",
                success:false,
            })
        }
        const houses = await House.find({owner:userId});
        res.send({
            success:true,
            houses
        })
    } catch (error) {
        return res.send({
            message:error.message,
            success:false,
        })
    }
}

// get single house house
const getSingleHouse = async(req, res) => {
    try {
        const id = req.params?.id;
       
        const house = await House.findById(id);
        res.send({
            success:true,
            house
        })
    } catch (error) {
        return res.send({
            message:error.message,
            success:false,
        })
    }
}

// update house
const updateHouse = async (req, res) => {
    const userId = req.query?.userId;
    const tokenId = req.user?.id;
    if(userId !== tokenId){
        return res.status(401).send({
            message:"Unauthorize",
            success:false,
        })
    }

    const id = req.params?.id;
    const query = {
        _id: id,
        owner: userId
    }
    try {
        const house = await House.findByIdAndUpdate(query , req.body, {
            new:true,
            runValidators:true,
        })

        if(!house){
            return res.send({
                message:"Notfound",
                success:false,
            })
        }
    
        res.send({
            house,
            message:"success",
            success:true,
        })
    } catch (error) {
        return res.send({
            message:error.message,
            success:false,
        })
    }
}

// get all houses
const getAllHouses = async (req, res) => {
    try {
        const houses = await House.find({});
        res.send({
            houses,
            success: true,
        })
    } catch (error) {
        return res.send({
            message:error.message,
            success:false,
        })
    }
} 


module.exports = {
    createNewHouse,
    getOwnerHouse,
    getSingleHouse,
    updateHouse,
    getAllHouses
}