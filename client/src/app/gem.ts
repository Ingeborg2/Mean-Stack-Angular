export class Gem {
    constructor(
        public name: string, 
        public price: number, 
        public forSale: boolean, 
        public soldOut: boolean, 
        public sparkle: string, 
        public createdBy: string,
        public createdOn: Date, 
        public updatedOn: Date
        ) {}
}