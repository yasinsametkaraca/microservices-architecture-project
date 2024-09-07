const mongoose = require('mongoose');
const { ProductModel } = require("../models");


class ProductRepository {

    async CreateProduct({ name, desc, type, unit,price, available, supplier, banner }){

        const product = new ProductModel({
            name, desc, type, unit,price, available, supplier, banner
        })

        // return await ProductModel.findByIdAndDelete('12345');

        return await product.save();
    }

    async Products(){
        return await ProductModel.find();
    }
   
    async FindById(id){
       return await ProductModel.findById(id);
    }

    async FindByCategory(category){
        const products = await ProductModel.find({ type: category});
        return products;
    }

    async FindSelectedProducts(selectedIds){
        const products = await ProductModel.find().where('_id').in(selectedIds.map(_id => _id)).exec();
        return products;
    }
}

module.exports = ProductRepository;
