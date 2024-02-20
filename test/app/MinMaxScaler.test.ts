import { beforeEach, describe, it } from "node:test";
import assert from "node:assert";
import { MinMaxScaler } from "../../app/MinMaxScaler";

describe("MinMaxScaler", () => {
   let scaler: MinMaxScaler;

   beforeEach(() => {
      scaler = new MinMaxScaler();
   });

   it("should inverse scale correctly", () => {
      const testData = [1, 2, 3];

      scaler.fit(testData);
      // Test inverse_transform method
      const inverseTransformedData = scaler.inverse_transform(0.5);
      assert.equal(inverseTransformedData, 2); // Inverse scaling of 0.5 should be 3

      const inverseTransformedArrayData = scaler.inverse_transform([0.5, 1]);
      assert.deepEqual(inverseTransformedArrayData, [2, 3]); // 0.25*(5-1)+1=2, 0.75*(5-1)+1=4
   });

   it("should scale correctly", () => {
      const testData = [1, 2, 3];

      scaler.fit(testData);
      assert.equal(scaler.min, 1);
      assert.equal(scaler.max, 3);

      // Test transform method
      const transformedData1 = scaler.transform(1);
      assert.equal(transformedData1, 0);

      const transformedData2 = scaler.transform(2);
      assert.equal(transformedData2, 0.5);

      const transformedData3 = scaler.transform(3);
      assert.equal(transformedData3, 1);

      const transformedArrayData = scaler.transform([1, 2]);
      assert.deepEqual(transformedArrayData, [0, 0.5]); // (2-1)/4=1/4, (4-1)/4=3/4
   });
});
