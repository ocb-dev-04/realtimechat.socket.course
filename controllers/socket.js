const User = require("../models/user");

const connectUser = async (uid = '') => {
    const user = await User.findOne({ _id: uid });
    user.online = true;
    await user.save();
    
    return user;
}

const disconnectUser = async (uid = '') => {
    const user = await User.findOne({ _id: uid });
    user.online = false;
    await user.save();

    return user;
}

module.exports = {
    connectUser,
    disconnectUser
}