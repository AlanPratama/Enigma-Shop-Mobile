const axios = require("axios");
const { faker } = require("@faker-js/faker");

const token =
  "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwMjIxMGMyYS1mYzFkLTRlNjUtYWM1Zi02YWQ2Y2M3YzQyNWIiLCJyb2xlcyI6WyJST0xFX0NVU1RPTUVSIl0sImlhdCI6MTcyNTkzNzM4OSwiZXhwIjoxNzI1OTM4Mjg5LCJpc3MiOiJFbmlnbWEgU2hvcCJ9.cVleO_aYWTTI0LDYR1wIfl76r8pY03J31sFin0vhCCggbpTNAVra9E1Van4ltOd36DM-G1_ky6TOG2CnnZ3n1Q";

for (let i = 0; i < 100; i++) {
  (async function () {
    try {
      await axios.post(
        "http://localhost:8080/api/products",
        {
          name: `product-${i}`,
          price: faker.commerce.price({ min: 10000, max: 100000, dec: 0 }),
          stock: faker.number.int({ min: 1, max: 100 }),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(`${i + 1} product inserted`);
    } catch (err) {
      console.error(err);
    }
  })();
}
