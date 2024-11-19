const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/crud', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


const ItemSchema = new mongoose.Schema({
    bookname: String,
    firstname: String,
    lastname: String,
    publish_year: SVGAnimatedInteger,
    edition: SVGAnimatedInteger,
    book_id: SVGAnimatedInteger,
    issue_data: Date,
    likes: SVGAnimatedInteger,
    dislikes: SVGAnimatedInteger
});

const Item = mongoose.model('Item', ItemSchema);


app.post('/items', async (req, res) => {
    const newItem = new Item(req.body);
    try {
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json(err);
    }
});


app.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json(err);
    }
});


app.put('/items/:id', async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedItem);
    } catch (err) {
        res.status(400).json(err);
    }
});


app.delete('/items/:id', async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json(err);
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



