const { ProductRepository } = require("../database");
const { FormatData } = require("../utils");

// All Business logic will be here
class ProductService {
    constructor() {
        this.repository = new ProductRepository();
    }

    async CreateProduct(productInputs) {
        const productResult = await this.repository.CreateProduct(productInputs);
        return FormatData(productResult);
    }

    async GetProducts() {
        const products = await this.repository.Products();

        let categories = {};

        products.map(({ type }) => {
            categories[type] = type;
        });

        return FormatData({
            products,
            categories: Object.keys(categories),
        });
    }

    async GetProductDescription(productId) {
        const product = await this.repository.FindById(productId);
        return FormatData(product);
    }

    async GetProductsByCategory(category) {
        const products = await this.repository.FindByCategory(category);
        return FormatData(products);
    }

    async GetSelectedProducts(selectedIds) {
        const products = await this.repository.FindSelectedProducts(selectedIds);
        return FormatData(products);
    }

    async GetProductPayload(userId, { productId, qty }, event) {
        const product = await this.repository.FindById(productId);

        if (product) {
            const payload = {
                event: event,
                data: { userId, product, qty },
            };

            return FormatData(payload);
        } else {
            return FormatData({ error: "No product Available" });
        }
    }

    // RPC Response
    async serveRPCRequest(payload) {
        const { type, data } = payload;
        switch (type) {
            case "VIEW_PRODUCT":
                return this.repository.FindById(data);
            case "VIEW_PRODUCTS":
                return this.repository.FindSelectedProducts(data);
            default:
                break;
        }
    }
}

module.exports = ProductService;
