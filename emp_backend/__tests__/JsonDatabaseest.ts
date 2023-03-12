// import { afterEach, beforeEach, describe } from "node:test";
// import { FileStorage } from "../Databases/FileStorage";
// import * as fs from "fs";
// import { employee1, employee2 } from "./constant";
// import { Employee } from "../interfaces/Employee";

// describe("JsonDatabase", () => {
//   const TEST_FILE = "../DataStorage/testData";

//   let db: FileStorage<Employee>;

//   beforeEach(() => {
//     // Create a new instance of the database before each test
//     db = new FileStorage(TEST_FILE);
//   });

//   afterEach(() => {
//     // Delete the test database file after each test
//     try {
//       fs.unlinkSync(TEST_FILE);
//     } catch (error: any) {
//       // Ignore error if the file doesn't exist
//       if (error && error.code !== "ENOENT") {
//         console.error(
//           `Error while deleting test database file ${TEST_FILE}: ${error}`
//         );
//       }
//     }
//   });

//   describe("addUser", () => {
//     it("adds a user to the database", () => {
//       const user = { id: 1, name: "Alice", email: "alice@example.com" };
//       db.add(employee1);
//       expect(db.getAll()).toEqual([user]);
//     });
//   });

//   describe("removeUser", () => {
//     it("removes a user from the database", () => {
//       const user1 = { id: 1, name: "Alice", email: "alice@example.com" };
//       const user2 = { id: 2, name: "Bob", email: "bob@example.com" };
//       db.add(employee1);
//       db.add(employee2);
//       db.remove(employee1.id);
//       expect(db.getAll()).toEqual([user2]);
//     });

//     it("does not remove a non-existent user from the database", () => {
//       const user = { id: 1, name: "Alice", email: "alice@example.com" };
//       db.add(employee1);
//       db.remove("9");
//       expect(db.getAll()).toEqual([user]);
//     });
//   });

//   describe("updateUser", () => {
//     it("updates an existing user in the database", () => {
//       db.add(employee1);
//       db.add(employee2);
//       db.update({
//         ...employee1,
//         firstName: "Alice Smith",
//         email: "alice.smith@example.com",
//       });
//       const updatedEmployee = {
//         id: 1,
//         name: "Alice Smith",
//         email: "alice.smith@example.com",
//       };
//       expect(db.getEmployees()).toEqual([updatedEmployee, employee2]);
//     });

//     it("returns undefined for a non-existent user", () => {
//       const result = db.updateEmployee({
//         ...employee1,
//         id: "10",
//         firstName: "Alice Smith",
//         email: "alice.smith@example.com",
//       });
//       expect(result).toBeUndefined();
//     });
//   });
// });
