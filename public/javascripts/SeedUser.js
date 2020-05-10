const faker = require("faker");
const db = require("../../config/DbConnect");
const User = require("../../models/UserModel");
const Cred = require("../../models/Credentials");
const Encrypt = require("../../services/hash");
function seed_user() {
  let user = {
    first_name: faker.name.firstName(),
    DOB: faker.date.past(20, "01/01/2000"),
    last_name: faker.name.lastName(),
    address: {
      street: faker.address.streetName(),
      city: faker.address.city(),
      zipcode: faker.address.zipCode(),
    },
    books: [],
  };
  user.email = faker.internet.email(user.first_name, undefined, "library.com");
  let newUser = new User(user);
  newUser
    .save()
    .then((doc) => {
      const pwd = faker.internet.password(8);
      let obj = {
        user_id: doc._id,
        password: pwd,
        passwordHash: Encrypt.getHashPwd(pwd),
      };
      const credential = new Cred(obj);
      credential
        .save()
        .then((doc) => {
          console.log(doc);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
}

let i =0
while(i<5){
    seed_user()
    i++
}
