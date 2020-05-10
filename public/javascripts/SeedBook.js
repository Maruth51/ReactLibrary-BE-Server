const faker = require("faker");
const db = require("../../config/DbConnect");
const Book = require("../../models/BookModel")

const seedBook =()=>{
    let obj = {
        title : faker.name.title(),
        author:faker.name.findName(),
        summary:faker.lorem.sentence(10),
        count :faker.random.number(10),
        genre:"Fiction"
    }
    const newBook = new Book(obj)
    newBook.save().then(doc=>{
        console.log(doc)
    }).catch(err=>{
        console.log(err)
    })
}
let i =0
while(i<10){
i++
seedBook()
}