export class Container<T> {
   constructor(private instance: T) {}

	getInstance() {
		return this.instance;
	}

   static create<T>(callback: () => T): Container<T> {
      return new Container<T>(callback());
   }
}
