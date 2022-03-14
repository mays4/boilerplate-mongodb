equire('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const Schema = mongoose.Schema;
const personSchema= new Schema({
  name : {type: String, required: true},
  age :  Number,
  favoriteFoods : [String]
})


 const Person = mongoose.model('Person',personSchema)

const createAndSavePerson = (done) => {
  let ali = new Person({name:"ali",age:22,favoriteFoods:["pizza,cake,burger"]})
  ali.save(function(err, data) {
    if (err) return done(err);
  done(null, data);
 
});

};
let arrayOfPeople =[{name:"maryem",age:32,favoriteFoods:["chocolate,sushi,cheese"]},{name:"mary",age:82,favoriteFoods:["pizza,pasta,rise"]},{name:"john",age:54,favoriteFoods:["burger,fish,fries"]}]

const createManyPeople = (arrayOfPeople, done) => {
    Person.create(arrayOfPeople,(err,data)=>{
     if (err) return done(err);
  done(null, data);
  })
 
};
// let personName = "ali";
const findPeopleByName = (personName, done) => {
    Person.find({name:personName},(err,data)=>{
     if (err) return done(err);
  done(null, data);
    
  })

};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:food},(err,data)=>{
     if (err) return done(err);
  done(null, data);
    
  })
 
};

const findPersonById = (personId, done) => {
 Person.findById({_id:personId},(err,data)=>{
     if (err) return done(err);
  done(null, data);
    
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId,(err,data)=>{
    if (err) return done(err);
    data.favoriteFoods.push(foodToAdd)
    data.save((err,updatedData)=>{
     if (err) return done(err);
    })
  })
};
