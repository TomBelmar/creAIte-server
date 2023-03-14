const {Schema, model} = require('mongoose')

const postSchema = new Schema({

    creator: [ { type: Schema.Types.ObjectId, ref:'User' } ],
    likes: [{type: Schema.Types.ObjectId, ref:'User'}],
    imageURL: [{ type: Schema.Types.ObjectId, ref:'Image'}],
    description: {type: String},
    comment: [{ type: Schema.Types.ObjectId, ref:'Comment'}],


}, {
    timestamps: true, 
});




module.exports = model("Post", postSchema)


