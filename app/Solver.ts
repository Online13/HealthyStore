import { MinMaxScaler } from "./MinMaxScaler";
import { Data, Solution, State } from "./type";

export class Solver {
   data: Data;
   solution: Solution;
   scaler: MinMaxScaler;
   normalize: boolean;

   constructor() {
      this.data = {
         symptomes: [],
         medicinePrices: [],
         medicineEffectOnSymptome: [],
      };
      this.scaler = new MinMaxScaler();
      this.solution = { minPrice: +Infinity, medicines: [] };

      this.normalize = false;
   }

   public setup(data: Data) {
      this.data = { ...data };
   }

   public normalizeData() {
      const data = [
         ...this.data.symptomes,
         ...this.data.medicineEffectOnSymptome.flat(2),
      ];
      this.scaler.fit(data);

      this.data.symptomes = this.scaler.transform(this.data.symptomes);
      for (let i = 0; i < this.data.medicineEffectOnSymptome.length; i++) {
         this.data.medicineEffectOnSymptome[i] = this.scaler.transform(
            this.data.medicineEffectOnSymptome[i]
         );
      }
      this.data.medicinePrices = this.scaler.transform(
         this.data.medicinePrices
      );

      this.normalize = true;
   }

   private updateState(state: State, medId: number): State {
      return {
         // add medicine into new state (we use this medicine)
         medicines: [...state.medicines, medId],
         // update price according to the price of medicine
         price: state.price + this.data.medicinePrices[medId],
         // udpate symptomes when we apply the medicine
         symptomes: state.symptomes.map(
            (sym, i) => sym - this.data.medicineEffectOnSymptome[medId][i]
         ),
      };
   }

   private isEndState(state: State): boolean {
      const isAllSymptomeTreated = state.symptomes.every((value) => value <= 0);
      return isAllSymptomeTreated;
   }

   private chooseMedicine(state: State) {
      // we select a symptom to treat.
      // We choose a symptome with high value
      const symptomeToFocusIndex = state.symptomes.reduce(
         (maxIndex, symp, index, arr) =>
            arr[maxIndex] < symp ? index : maxIndex,
         0
      );

      if (state.symptomes[symptomeToFocusIndex] <= 0) return [];

      return (
         Object.entries(this.data.medicineEffectOnSymptome)
            // we remove all medicine that has no effect on the target symptom
            .filter((effect) => effect[1][symptomeToFocusIndex] > 0)
            // we sort by the max effect
            .sort((effectA, effectB) => {
               return (
                  effectB[1][symptomeToFocusIndex] -
                  effectA[1][symptomeToFocusIndex]
               );
            })
            // we get only the index
            .map(([index]) => parseInt(index))
      );
   }

   private _computeMinPrice(state: State, depth = 1) {
      if (this.isEndState(state)) {
         // we update the solution
         this.solution.minPrice = state.price;
         this.solution.medicines = [...state.medicines];
         return;
      }

      for (const medId of this.chooseMedicine(state)) {
         const newState = this.updateState(state, medId);
         // we make sure to consider the optimal state
         if (newState.price >= this.solution.minPrice) {
            continue;
         }
         this._computeMinPrice(newState, depth + 1);
      }
   }

   public computeMinPrice() {
      const firstState = {
         price: 0,
         medicines: [],
         symptomes: this.data.symptomes,
      };
      this._computeMinPrice(firstState);
      if (this.normalize)
         this.solution.minPrice = this.scaler.inverse_transform(
            this.solution.minPrice
         );
      return this.solution;
   }

   public countOccurence(list: number[]) {
      return list.reduce<Record<string, number>>((acc, cur) => {
         const key = `m${cur}`;
         return {
            ...acc,
            [key]: key in acc ? acc[key] + 1 : 1,
         };
      }, {});
   }

   public printSolution() {
      console.log("\nprice=", this.solution.minPrice);
      console.log("medicine=", this.countOccurence(this.solution.medicines));
   }
}
