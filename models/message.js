const { Schema, model } = require("mongoose");

const MessageSchema = Schema({
        message: {
            type: String,
            required: true,
        },
        from: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        to: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true
    }
);

MessageSchema.methods.toJSON = function () {
    const { __v, _id, ...publicProps } = this.toObject();
    publicProps.id = _id;
    return publicProps;
}

module.exports = model('Message', MessageSchema);