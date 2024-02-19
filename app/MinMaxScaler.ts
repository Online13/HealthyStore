export class MinMaxScaler {
   min: number = NaN;
   max: number = NaN;

   fit(list: number[]) {
      this.min = Math.min(...list);
      this.max = Math.max(...list);
   }

   transform<T extends number | number[]>(list: T): T {
      if (Array.isArray(list) && list.every((v) => Number.isInteger(v)))
         return list.map((val) => this.transform(val)) as T;
      else {
         const diff = this.max - this.min;
         return (((list as number) - this.min) / (diff === 0 ? 1 : diff)) as T;
      }
   }

   inverse_transform<T extends number | number[]>(list: T): T {
      if (Array.isArray(list))
         return list.map((val) => this.inverse_transform(val) as number) as T;
      else
         return Math.round(
            (list as number) * (this.max - this.min) + this.min
         ) as T;
   }
}
