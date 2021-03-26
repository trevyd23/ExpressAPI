const request = require('supertest')
const express = require("express"); // import express
const serverRoutes = require('./serverRoutes'); //import file we are testing

const app = express(); //an instance of an express app, a 'fake' express app
app.use("/users", serverRoutes); //routes

jest.mock("./userInfo.json", () => {
    return ({
        id: "1234567abcdefg",
        username: "John",
        email: "johnjohn@gmail.com",
        RegisteredOn: "11/13/2020, 3:57:54 AM"
    })

}
); //callback function with mock data

describe("testing-server-routes", () => {
    it("GET /user-info - success", async () => {
        const { body } = await request(app).get("/users/user-info"); //use the request function that we can use the app// save the response to body variable
        expect(body).toEqual({
            id: "1234567abcdefg",
            username: "John",
            email: "johnjohn@gmail.com",
            RegisteredOn: "11/13/2020, 3:57:54 AM"
        });

    });

})