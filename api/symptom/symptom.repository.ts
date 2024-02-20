import { sql } from "@vercel/postgres";
import { Container } from "../../core/Container";
import { Symptom, SymptomData } from "../type";

export class Repository {
   constructor() {
      console.log("Create symptom repository !");
   }

   async getAll() {
      const result =
         await sql<Symptom>`SELECT id, name, description FROM symptom;`;
      return result;
   }

   async getOne(id: number) {
      const result =
         await sql<Symptom>`SELECT id, name, description FROM symptom WHERE id=${id};`;
      return result;
   }

   async insert(symptom: SymptomData) {
      const result = await sql`
         INSERT INTO symptom (name, description) 
         VALUES (${symptom.name}, ${symptom.description});
      `;
      return result;
   }

   async update(id: number, symptom: SymptomData) {
      const result = await sql`
         UPDATE symptom
         SET name = ${symptom.name}, description = ${symptom.description}
         WHERE id = ${id};
      `;
      return result;
   }

   async delete(id: number) {
      const result = await sql`DELETE FROM symptom WHERE id = ${id};`;
      return result;
   }
}

export const container = Container.create(() => {
   return new Repository();
});
