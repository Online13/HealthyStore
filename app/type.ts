

export type Solution = { minPrice: number; medicines: number[] };
export type State = { price: number; symptomes: number[]; medicines: number[] };
export type Data = {
   symptomes: number[];
   medicinePrices: number[];
   medicineEffectOnSymptome: number[][];
};

export type Test = {
   INPUT: Data;
   OUTPUT: Solution;
}