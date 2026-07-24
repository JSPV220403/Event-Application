// import categoryServiceTest from "../testData/category.services.test.data";
// import {createCategory, listCategory, updateCategory, deleteCategory,getCategoryById} from "../services/category.services"
// import { describe, test } from "node:test";
// import assert from "node:assert";

// describe("Create Category", ()=>{
//     test("It should return 401 for trying to access as a User/ Pending Organizer/ Pending Admin", async()=>{
//         const result= await createCategory({},categoryServiceTest.user)
//         assert.strictEqual(result.status, 401);
//         assert.strictEqual(result.message, "you are not ADMIN/ORGANIZER")
//     })

//      test("It should return 400 for trying to create without name", async()=>{
//         const result= await createCategory({},categoryServiceTest.approvedOrganizer)
//         assert.strictEqual(result.status, 400);
//         assert.strictEqual(result.message, "category name field is undefined")
//     })
// })

// describe("Update Category", ()=>{
//     test("It should return 401 for trying to access as a User/ pending Organizer / pending Admin", async()=>{
//         const result= await updateCategory({},categoryServiceTest.pendingOrganizer)
//         assert.strictEqual(result.status, 401);
//         assert.strictEqual(result.message, "you are not ADMIN/ORGANIZER")
//     })

//     test("It should return 400 for trying to update without id", async()=>{
//         const result= await updateCategory(categoryServiceTest.withoutId, categoryServiceTest.approvedOrganizer)
//         assert.strictEqual(result.status, 400);
//         assert.strictEqual(result.message, "category id field is undefined")
//     })

//      test("It should return 400 for trying to update without name", async()=>{
//         const result= await updateCategory(categoryServiceTest.validIdWithoutName, categoryServiceTest.approvedOrganizer)
//         assert.strictEqual(result.status, 400);
//         assert.strictEqual(result.message, "category name field is undefined")
//     })

//     test("It should return 404 for trying to update on not existing id", async()=>{
//         const result= await updateCategory(categoryServiceTest.invalidCategoryId, categoryServiceTest.approvedOrganizer)
//         assert.strictEqual(result.status, 404);
//         assert.strictEqual(result.message, "Category not found")
//     })

//      test("It should return 401 for trying to update as non creator/ admin", async()=>{
//         const result= await updateCategory(categoryServiceTest.validIdExistingName, categoryServiceTest.approvedOrganizer2)
//         assert.strictEqual(result.status, 401);
//         assert.strictEqual(result.message, "UnAthorized to change")
//     })

//      test("It should return 400 for trying to update with existing name", async()=>{
//         const result= await updateCategory(categoryServiceTest.validIdExistingName, categoryServiceTest.approvedOrganizer)
//         assert.strictEqual(result.status, 400);
//         assert.strictEqual(result.message, "Category name Already exist")
//     })
// })

// describe("delete Category", ()=>{
//     test("It should return 401 for trying to delete with PENDING status", async()=>{
//         const result= await deleteCategory({}, categoryServiceTest.user)
//         assert.strictEqual(result.status, 401);
//         assert.strictEqual(result.message, "you are not ADMIN/ORGANIZER")
//     })

//     test("It should return 400 for trying to delete without id", async()=>{
//         const result= await deleteCategory({}, categoryServiceTest.approvedOrganizer)
//         assert.strictEqual(result.status, 400);
//         assert.strictEqual(result.message, "category id field is undefined")
//     })

//     test("It should return 404 for trying to delete not existing id", async()=>{
//         const result= await deleteCategory(categoryServiceTest.invalidCategoryId, categoryServiceTest.approvedOrganizer)
//         assert.strictEqual(result.status, 404);
//         assert.strictEqual(result.message, "Category not found")
//     })

//      test("It should return 404 for trying to delete not existing id", async()=>{
//         const result= await deleteCategory(categoryServiceTest.invalidCategoryId, categoryServiceTest.approvedOrganizer)
//         assert.strictEqual(result.status, 404);
//         assert.strictEqual(result.message, "Category not found")
//     })

//     test("It should return 401 for trying to delete as non creator/ admin", async()=>{
//         const result= await deleteCategory(categoryServiceTest.validIdWithoutName, categoryServiceTest.approvedOrganizer2)
//         assert.strictEqual(result.status, 401);
//         assert.strictEqual(result.message, "UnAuthorized person")
//     })
// })
