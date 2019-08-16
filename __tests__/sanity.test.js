const smoltime = require("../dist/smoltime.umd");

it("should be a valid smoltime object", () => {
  expect(smoltime).not.toHaveProperty("default");
});
