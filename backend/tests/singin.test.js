// test for signin

const User = require('../models/userModel');
const app = require('../app');
const request = require('supertest');
const mongoose =  require('mongoose');

const url = "mongodb+srv://milan361:iZEK0AAW2n6p4ilc@cluster0.uanmf.mongodb.net/FundGator?retryWrites=true&w=majority";


// Login user with incorrect password
test("Sign in testing for user with incorrect password", async () => {
  await request(app)
    .post("/user/login")
    .send({
      username: "sprint",
      password: "agile",
    })
    .expect("Content-Type", /json/)
    .expect(201)
    .then((res) => {
      expect.arrayContaining([
        expect.objectContaining({
          token: expect.any(String),
          userType: expect.any(String),
        }),
      ]);
    });
});

// Login user with correct username and password
test("Sign in testing for user with correct username and password", async () => {
   await request(app)
     .post("/api/login")
     .send({
       username: "sprint",
       password: "agile123",
     })
     .expect("Content-Type", /json/)
     .expect(201)
     .then((res) => {
       expect.arrayContaining([
         expect.objectContaining({
           token: expect.any(String),
           userType: expect.any(String),
         }),
       ]);
     });
 });
 


 