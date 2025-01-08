require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const menuItem = require('./menuItem');

const app = express();
const port = 3010;

// app.use(express.static('static'));
app.use(express.json())
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Error connecting to MongoDB:', error));

// app.get('/', (req, res) => {
//   res.sendFile(resolve(__dirname, 'pages/index.html'));
// });
app.post('/menu', async (req,res)=>{
  const {name, desc, price}=req.body;
  if(!name|| !price){
    return res.status(400).json({message: 'Name and price required.'})
  }
  try {
    const newMenuItem=new menuItem({
      name,
      desc,
      price
    });
    await newMenuItem.save();
    res.status(201).json({message:'Menu item created successfully', item:newMenuItem})
  } catch (error) {
    res.status(500).json({message: 'Failed to create menuItem', error})
  }
})
app.get('/menu',async (req,res)=>{
  try {
    const menuItems=await menuItem.find();
    res.status(200).json(menuItems)
  } catch (error) {
    res.status(500).json({message: 'Failed to fetch menu Items', error})
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
