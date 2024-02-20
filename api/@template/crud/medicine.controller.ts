import { Container } from "../../../core/Container";
import { Medicine, MedicineData } from "../../type";
import { Repository, container as mrContainer } from "../crud/medicine.repository";

export class Controller {
   constructor(private repository: Repository) {
      console.log("Create medicine controller !");
   }

   async getAll(): Promise<Medicine[]> {
      const medicine = await this.repository.getAll();
      return medicine.rows;
   }

   async getOne(id: number): Promise<Medicine> {
      const medicine = await this.repository.getOne(id);
      return medicine.rows[0];
   }

   async create(medicineData: MedicineData) {
      const result = await this.repository.insert(medicineData);
      console.log(result);
   }

   async update(id: number, medicine: MedicineData) {
      const result = await this.repository.update(id, medicine);
      console.log(result);
   }

   async delete(id: number) {
      const result = await this.repository.delete(id);
      console.log(result);
   }

}

export const container = Container.create(() => {
	const repository = mrContainer.getInstance();
	return new Controller(repository);
});