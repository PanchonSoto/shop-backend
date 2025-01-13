


export class ProductEntity {

    constructor(
        public id: number,
        public negocio_id: string,
        public name: string,
        public stock: number,
        public price: number,
        public available: boolean,
        // public created_at: Date,
        // public updated_at: Date
    ) { }
}
