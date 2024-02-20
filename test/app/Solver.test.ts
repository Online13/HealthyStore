import assert from "node:assert";
import { Solver } from "../../app";
import { Test } from "../../app/type";
import { TEST_1, TEST_2, TEST_3 } from "./__mock__";
import { beforeEach, describe, it } from "node:test";

describe("Solver", () => {
   let solver: Solver;

   beforeEach(() => {
      solver = new Solver();
   });


   it("should count occurrences correctly", () => {
      // Test countOccurence method
      const medicines = [0, 1, 2, 0, 1, 1];
      const occurrenceCount = solver.countOccurence(medicines);
      assert.deepEqual(occurrenceCount, { m0: 2, m1: 3, m2: 1 }); // Occurrence count should be { m0: 2, m1: 3, m2: 1 }
   });
});

describe("Input - Output", () => {
   let solver: Solver;
   let MOCK_DATA: Test;

   beforeEach(() => {
      solver = new Solver();
   });


   it("[TEST_1] should compute minimum price correctly ", () => {
      MOCK_DATA = TEST_1;

      solver.setup(MOCK_DATA.INPUT);
      solver.normalizeData();
      solver.computeMinPrice();

      assert.deepEqual(MOCK_DATA.OUTPUT, solver.solution);
   });

   it("[TEST_2] should compute minimum price correctly ", () => {
      MOCK_DATA = TEST_2;

      solver.setup(MOCK_DATA.INPUT);
      solver.normalizeData();
      solver.computeMinPrice();

      assert.deepEqual(MOCK_DATA.OUTPUT, solver.solution);
   });

   it("[TEST_3] should compute minimum price correctly ", () => {
      MOCK_DATA = TEST_3;

      solver.setup(MOCK_DATA.INPUT);
      solver.normalizeData();
      solver.computeMinPrice();

      assert.deepEqual(MOCK_DATA.OUTPUT, solver.solution);
   });

});
