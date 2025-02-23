const Product = require('../models/product.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Product.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Product.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Product.findOne().skip(rand);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const dep = await Product.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.addOne = async (req, res) => {
  try {
    const { name, client } = req.body;
    const newProduct = new Product({ 
      name: name, 
      client: client, 
    });
    await newProduct.save();
    res.json({ message: 'OK' });
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.updateOne = async (req, res) => {
  try {
    const updateProduct = {};
    const { name, client } = req.body;
  
    if (name) updateProduct.name = name;
    if (client) updateProduct.client = client;
    
    const dep = await Product.findById(req.params.id);
    if(dep) {
      await Product.updateOne({ _id: req.params.id }, { $set: updateProduct });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const dep = await Product.findById(req.params.id);
    if(dep) {
      await Product.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(500).json({message: 'Not found...'});
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};