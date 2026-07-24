// import {register, login} from "../services/auth.services";
// import { describe, test } from "node:test";
// import authTestData from "../testData/auth.services.test.data"
// import assert from "node:assert";
// // import loginData from "../testData/login.testdata"

// describe("Register", ()=>{
//     test("should return 400 when the email is already registered", async()=>{
//         const result = await register(
//             authTestData.register.existingEmail
//         )
//         assert.strictEqual(result.status, 400);
//         assert.strictEqual(result.message, "Email/Phone number already exist")       
//     })

//     test("should return 400 when the password not satisfy the constraints", async()=>{
//         const result = await register(authTestData.register.withUnSatisfiedPassword)
//         assert.strictEqual(result.status, 400);   
//         assert.strictEqual(result.message, "Password not satisfying the constraints")     
//     })

//     test("Should return 400 because name field is missing", async()=>{
//         const result = await register(authTestData.register.withoutName)
//         assert.strictEqual(result.status, 400); 
//         assert.strictEqual(result.message, "name field is undefined")
//     })

//     test("Should return 400 because of gender field is undefined", async()=>{
//         const result = await register(authTestData.register.withoutGender);
//         assert.strictEqual(result.status, 400)
//         assert.equal(result.message, "gender field is undefined")
//     })

//     test("Should return 400 because of phone number is undefined", async()=>{
//         const result = await register(authTestData.register.withoutPhoneNumber)
//         assert.strictEqual(result.status, 400);
//         assert.strictEqual(result.message,"phone number field is undefined")
//     })

//     test("Should return 400 because of email is undefined", async()=>{
//         const result = await register(authTestData.register.withoutEmail)
//         assert.strictEqual(result.status, 400);
//         assert.strictEqual(result.message,"email field is undefined")
//     })

//     test("Should return 400 because of password is undefined", async()=>{
//         const result = await register(authTestData.register.withoutPassword)
//         assert.strictEqual(result.status, 400);
//         assert.strictEqual(result.message,"password field is undefined")
//     })

//     test("Should return 400 because of role is undefined", async()=>{
//         const result = await register(authTestData.register.withoutRole)
//         assert.strictEqual(result.status, 400);
//         assert.strictEqual(result.message,"role field is undefined")
//     })

//      test("Should return 400 because of address is undefined", async()=>{
//         const result = await register(authTestData.register.withoutAddress)
//         assert.strictEqual(result.status, 400);
//         assert.strictEqual(result.message,"address field is undefined")
//     })

//      test("Should return 400 because of pincode is undefined", async()=>{
//         const result = await register(authTestData.register.withoutPincode)
//         assert.strictEqual(result.status, 400);
//         assert.strictEqual(result.message,"pincode field is undefined")
//     })
// })

// // describe("Register - Valid Data", ()=>{
// //     test("Should return 200", async()=>{
// //         const result = await register({
// //             name: "organizerTest1",
// //             gender:"MALE",
// //             phone_number: "+91 12345 67999",
// //             email: "organizerTest1@gmail.com",
// //             password: "Organizer@1",
// //             role:"ORGANIZER",
// //             address: "Kotturpuram",
// //             pincode: "654321"
// //         })
// //         assert.strictEqual(result.status,200)
// //     })
// // })

// describe("Login - without mail id",()=>{
//     test("Should return 400 because mail field is undefined", async()=>{
//         const result = await login(authTestData.login.withoutEmail)
//         assert.strictEqual(result.status, 400)
//         assert.strictEqual(result.message, "email field is undefined")
//     })

//     test("Should return 400 because password field is undefined", async()=>{
//         const result = await login(authTestData.login.withoutPassword)
//         assert.strictEqual(result.status, 400)
//         assert.strictEqual(result.message, "password field is undefined")
//     })

//     test("Should return 400 because wrong mail id", async()=>{
//         const result = await login(authTestData.login.wrongMail)
//         assert.strictEqual(result.status, 400)
//         assert.strictEqual(result.message, "User Not Found")
//     })

//     test("Should return 400 because wrong password", async()=>{
//         const result = await login(authTestData.login.wrongPassword)
//         assert.strictEqual(result.status, 401)
//         assert.strictEqual(result.message, "Invalid password")
//     })

//     test("Should return 200 because right credentials", async()=>{
//         const result = await login(authTestData.login.validCredentials)
//         assert.strictEqual(result.status, 200)
//         assert.strictEqual(result.message, "login successful")
//     })
// })
