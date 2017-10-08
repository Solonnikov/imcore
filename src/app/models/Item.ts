export class Item {
    constructor(
        public accetId: string,
        public itemName: string,
        public imageUrl: string,
        public marketHashName: string,
        public itemType: string,
        public price: number,
        public status: string
    ) { }
}
