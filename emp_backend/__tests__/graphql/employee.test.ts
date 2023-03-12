// import { ApolloServer } from "apollo-server-express";
// import assert from "assert";
// import EmployeeResolvers from "../../resolvers/Employee";
// import EmployeeSchema from "../../schema/Employee";


// export const EMPLOYEES_QUERY = `
//   query Employees {
//     employees {
//       id
//       firstName
//       middleName
//     }
//   }
// `;

// it("returns hello with the provided name", async () => {
//   const testServer = new ApolloServer({
//     typeDefs: EmployeeSchema,
//     resolvers: EmployeeResolvers,
//   });

//   const response = await testServer.executeOperation({
//     query: EMPLOYEES_QUERY,
//     variables: { name: "world" },
//   });

//   console.log('rrrrrrrrr ', response)

//   // Note the use of Node's assert rather than Jest's expect; if using
//   // TypeScript, `assert`` will appropriately narrow the type of `body`
//   // and `expect` will not.
// //   assert(response.body.kind === "single");
// //   expect(response.body.singleResult.errors).toBeUndefined();
// //   expect(response.body.singleResult.data?.hello).toBe("Hello world!");
// });
