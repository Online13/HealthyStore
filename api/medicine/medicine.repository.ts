import { sql } from "@vercel/postgres";
import { Medicine, MedicineData } from "../type";
import { Container } from "../../core/Container";

export class Repository {
   constructor() {
      console.log("Create medicine repository !");
   }

   async getAll() {
      const result =
         await sql<Medicine>`SELECT id, name, description FROM medicine;`;
      return result;
   }

   async getOne(id: number) {
      const result =
         await sql<Medicine>`SELECT id, name, description FROM medicine WHERE id=${id};`;
      return result;
   }

   async insert(medicine: MedicineData) {
      const result = await sql`
         INSERT INTO medicine (name, description) 
         VALUES (${medicine.name}, ${medicine.description});
      `;
      return result;
   }

   async update(id: number, medicine: MedicineData) {
      const result = await sql`
         UPDATE medicine
         SET name = ${medicine.name}, description = ${medicine.description}
         WHERE id = ${id};
      `;
      return result;
   }

   async delete(id: number) {
      const result = await sql`DELETE FROM medicineWHERE id = ${id};`;
      return result;
   }
}

export const container = Container.create(() => {
   return new Repository();
});
