const mongoose=require('mongoose');
const menuItemSchema=new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    description: {
        type: String,
        required: false
      },
      price: {
        type: Number,
        required: true
      }
})
const menuItem=mongoose.model('MenuItem', menuItemSchema);
module.exports=menuItem;