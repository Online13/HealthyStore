export type DataID = {
   id: number;
};

export type MedicineData = {
   name: string;
   description: string;
};

export type SymptomData = {
   name: string;
   description: string;};

export type Medicine = DataID & MedicineData;
export type Symptom = DataID & SymptomData;
