const { response } = require("express");

const Message = require("../models/message");

const getAll = async (req, res = response) => {
    const messagesFrom = req.params.from;
    const personalUid = req.uid;

    try {
        const messages = await Message
          .find({
              $or: [{ from: messagesFrom, to: personalUid }, { from: personalUid, to: messagesFrom }],
          })
          .sort({createdAt: 'desc'})
          .limit(30);

        res.json({
            ok: true,
            messages
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            message: "Some error ocurred while access to messages list",
        });
    }
};

module.exports = {
    getAll,
};
