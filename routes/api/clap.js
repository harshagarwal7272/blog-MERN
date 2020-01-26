const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const multer = require('multer');
const auth = require('../../middleware/auth');

//Clap Model
const Clap = require('../../models/Clap');

// @route api/clap
// @desc Add a clap to the story
// @access Public
router.post('/', (req, res) => {

    const {user_email, story_id} = req.body;

    Clap.findOne({clapper_email:user_email,
        story_id:story_id
    }).then((item)=>{
        console.log("clapping..................");
        if(item){
            //update existing clap items count by 1
            item.clap_count = item.clap_count + 1;
            item.save();
        }else{
            //create new clap item with count 1
            const newClap = new Clap({
                clapper_email:user_email,
                story_id,
                clap_count: 1
            });
            newClap.save();
        }
    })
});

module.exports = router;