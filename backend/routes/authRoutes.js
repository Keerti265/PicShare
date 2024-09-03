const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.post('/login', async (req, res) => {
    const { username } = req.body;
    let user = await User.findOne({ username });
     
  console.log(user);
    if (!user) {
        user = new User({ username });
        await user.save();
    }
    res.json({ userId: user._id });
});


module.exports = router;
