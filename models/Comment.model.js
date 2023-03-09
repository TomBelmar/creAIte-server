const {Schema, model} = require('mongoose')

const commentSchema = new Schema({
    creator: [ { type: Schema.Types.ObjectId, ref:'User' } ],
    message: { type: String, required: true },
}, {
    timestamps: true, 
});




module.exports = model("Comment", commentSchema)
