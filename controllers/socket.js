const Message = require("../models/message");
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

const saveMessage = async (data = {}) => {
    try {
        const message = new Message(data);
        await message.save();

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

module.exports = {
    connectUser,
    disconnectUser,
    saveMessage
}