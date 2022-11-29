const buffer = Buffer.from("some data");
const token =
"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InltaWxhbjU5M0BnbWFpbC5jb20iLCJuYW1lIjoiTWlsYW4gWWFkYXYiLCJpZCI6IjYzODBhNWM2MWZhYjg2NDNkNDZiMzg5ZSIsImlhdCI6MTY2OTYxNjk5OSwiZXhwIjoxNjY5NzAzMzk5fQ.9h3SLnEaq9WGyju7LCLkvLnS-2vG-yZS_yVnSHix5D8";
const request = require("supertest");
const app = require("../app");


//To get all Companies and their owners

test("Show All Companies", async () => {
  await request(app)
    .get("/company/api/companies")

    .set("Authorization", token)
    .expect(200)
    // .expect("Content-Type", /json/)
    .then((response) => {
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe("Companies Retrieved Successfully");
        expect(response.body.company).not.toBe(null);
    });
});

test("To retrieve all Companies of authenticated user ", async () => {

    await request(app)
      .get("/company/api/get-my-companies/6380a6181fab8643d46b38a8")
        .set("Authorization", token)
        .expect(200)
      .expect("Content-Type", /json/)
      .expect(200);
  });





