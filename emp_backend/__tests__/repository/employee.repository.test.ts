import { Employee } from "../../interfaces/Employee";
import { FileStorage } from "../../Databases/FileStorage";
import { EmployeeRepository } from "../../repository/EmployeeRepository";
import * as fs from "fs";
import { employee1, employee2 } from "../constant";

describe("JsonDatabase", () => {
  const TEST_FILE = "../../dataStorage/testData.json";
  const db = new FileStorage<Employee>(TEST_FILE);

  const repo = new EmployeeRepository(db);
  //   let db: FileStorage<Employee>;

  //   beforeEach(() => {
  // Create a new instance of the database before each test
  //     db = new FileStorage(TEST_FILE);
  //   });

  afterEach(() => {
    // Delete the test database file after each test
    try {
      fs.unlinkSync(TEST_FILE);
    } catch (error: any) {
      // Ignore error if the file doesn't exist
      if (error && error.code !== "ENOENT") {
        console.error(
          `Error while deleting test database file ${TEST_FILE}: ${error}`
        );
      }
    }
  });

  describe("addUser", () => {
    it("adds a user to the database", () => {
      const user = { id: 1, name: "Alice", email: "alice@example.com" };
      repo.add(employee1);
      expect(repo.getAll()).toEqual([user]);
    });
  });

  describe("removeUser", () => {
    it("removes a user from the database", () => {
      repo.add(employee1);
      repo.add(employee2);
      repo.delete(employee1.id);
      expect(repo.getAll()).toEqual([employee2]);
    });

    it("does not remove a non-existent user from the database", () => {
      repo.add(employee1);
      repo.delete("9");
      expect(db.getAll()).toEqual([employee1]);
    });
  });

  describe("updateUser", () => {
    it("updates an existing user in the database", () => {
      repo.add(employee1);
      repo.add(employee2);
      repo.update({
        ...employee1,
        firstName: "Alice Smith",
        email: "alice.smith@example.com",
      });
      const updatedEmployee = {
        id: 1,
        name: "Alice Smith",
        email: "alice.smith@example.com",
      };
      expect(db.getAll()).toEqual([updatedEmployee, employee2]);
    });

    it("returns undefined for a non-existent user", () => {
      const result = db.update({
        ...employee1,
        id: "10",
        firstName: "Alice Smith",
        email: "alice.smith@example.com",
      });
      expect(result).toBeUndefined();
    });
  });
});
