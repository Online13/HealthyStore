import { Container } from "../../core/Container";
import { Symptom, SymptomData } from "../type";
import { Repository, container as srContainer } from "./symptom.repository";

export class Controller {
   constructor(private repository: Repository) {
      console.log("Create symptom controller !");
   }

   async getAll(): Promise<Symptom[]> {
      const symptom = await this.repository.getAll();
      return symptom.rows;
   }

   async getOne(id: number): Promise<Symptom> {
      const symptom = await this.repository.getOne(id);
      return symptom.rows[0];
   }

   async create(symptomData: SymptomData) {
      const result = await this.repository.insert(symptomData);
      console.log(result);
   }

   async update(id: number, symptom: SymptomData) {
      const result = await this.repository.update(id, symptom);
      console.log(result);
   }

   async delete(id: number) {
      const result = await this.repository.delete(id);
      console.log(result);
   }

}

export const container = Container.create(() => {
	const repository = srContainer.getInstance();
	return new Controller(repository);
});