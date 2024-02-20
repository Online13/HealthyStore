import { Test } from "../../app/type";

export const TEST_1: Test = {
   INPUT: {
      symptomes: [2, 2, 2],
      medicinePrices: [8, 16, 12, 20],
      medicineEffectOnSymptome: [
         [4, 0, 0], // m1
         [6, 0, 0], // m2
         [0, 0, 2], // m3
         [1, 1, 1], // m4
      ],
   },
   OUTPUT: { minPrice: 40, medicines: [3, 3] },
};

export const TEST_2: Test = {
	INPUT: {
		symptomes: [1, 1],
		medicinePrices: [1, 1],
		medicineEffectOnSymptome: [
			[1, 0],
			[0, 1]
		]
	},
	OUTPUT: { minPrice: 2, medicines: [0, 1] }
};

export const TEST_3: Test = {
   INPUT: {
      symptomes: [1, 3, 4],
      medicinePrices: [1, 1],
      medicineEffectOnSymptome: [
         [1, 0, 0],
         [0, 0, 0],
      ],
   },
   OUTPUT: { minPrice: Infinity, medicines: [] },
};