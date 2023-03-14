const {Schema, model} = require('mongoose')

const imageSchema = new Schema({
    imgId: {type: String},
    imageURL: {type: String},
    user: [ { type: Schema.Types.ObjectId, ref:'User' } ],
    post: [{ type: Schema.Types.ObjectId, ref:'Post'}],


}, {
    timestamps: true, 
});




module.exports = model("Image", imageSchema)
