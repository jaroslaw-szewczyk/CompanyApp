const Employee = require('../models/employee.model');

exports.getAll = async (req, res) => {
  try {
      res.json(await Employee.find().populate('department'));
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.getRandom = async (req, res) => {
  try {
      const count = await Employee.countDocuments();
      const rand = Math.floor(Math.random() * count);
      const dep = await Employee.findOne().skip(rand).populate('department');
      if(!dep) res.status(404).json({ message: 'Not found' });
      else res.json(dep);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.getById = async (req, res) => {
  try {
      const dep = await Employee.findById(req.params.id).populate('department');
      if(!dep) res.status(404).json({ message: 'Not found' });
      else res.json(dep);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.addOne = async (req, res) => { 
  try {
      const { firstName, lastName, department } = req.body;
      const newEmployee = new Employee({ 
        firstName: firstName, 
        lastName: lastName, 
        department: department
      });
      await newEmployee.save();
      res.json({ message: 'OK' });
    } catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.updateOne = async (req, res) => {
  try {
      const updatePerson = {};
      const { firstName, lastName, department } = req.body;
    
      if (firstName) updatePerson.firstName = firstName;
      if (lastName) updatePerson.lastName = lastName;
      if (department) updatePerson.department = department;

      const dep = await Employee.findById(req.params.id);
      if(dep) {
        await Employee.updateOne({ _id: req.params.id }, { $set: updatePerson });
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
      const dep = await Employee.findById(req.params.id);
      if(dep) {
        await Employee.deleteOne({ _id: req.params.id });
        res.json({ message: 'OK' });
      }
      else res.status(500).json({message: 'Not found...'});
    } catch(err) {
      res.status(500).json({ message: err });
    }
};