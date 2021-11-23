const mongoose = require("mongoose");
const {model, Schema} = mongoose;

const mascotaSchema = new Schema({
    nombre:
    { 
        type: String,
        required: true,
    },
    edad:{
        type: Number,
        required: true, 
        min:0, 
        max:30
    },
    tipo:{
        type: String,
        required: true
    },
    vacunado:{
        type: Boolean,
        required: true
    },
    observaciones:{
        type: String
    }
});

mascotaSchema.set("toJSON", {
    transform:((document, mascotaToJSON)=>{
        mascotaToJSON.id = mascotaToJSON._id.toString();
        delete mascotaToJSON._id; 
        delete mascotaToJSON.__v;
    })
})

module.exports = model("Mascota", mascotaSchema); 