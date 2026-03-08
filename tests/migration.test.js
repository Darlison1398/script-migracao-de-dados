const newDb = require("../src/db/newDb");

test("deve inserir um site", async () => {
  await newDb.insertSite({
    name: "Teste",
    url: "teste.com"
  });

  const result = await newDb.findByUrl("teste.com");

  expect(result).toBeDefined();
});