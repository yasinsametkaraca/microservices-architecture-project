const { ShoppingRepository } = require("../database");
const { FormatData } = require("../utils");

// All Business logic will be here
class ShoppingService {

    constructor(){
        this.repository = new ShoppingRepository();
    }

    async GetCart({ _id }){
        const cartItems = await this.repository.Cart(_id);
        return FormatData(cartItems);
    }

    async PlaceOrder(userInput){
        const { _id, txnNumber } = userInput
        const orderResult = await this.repository.CreateNewOrder(_id, txnNumber);
        
        return FormatData(orderResult);
    }

    async GetOrders(customerId){
        const orders = await this.repository.Orders(customerId);
        return FormatData(orders)
    }

    async GetOrderDetails({ _id,orderId }){
        const orders = await this.repository.Orders(productId);
        return FormatData(orders)
    }

    async ManageCart(customerId, item,qty, isRemove){
        const cartResult = await this.repository.AddCartItem(customerId, item, qty, isRemove);
        return FormatData(cartResult);
    }

    async SubscribeEvents(payload){
        payload = JSON.parse(payload);
        const { event, data } = payload;
        const { userId, product, qty } = data;
        
        switch(event){
            case 'ADD_TO_CART':
                this.ManageCart(userId, product, qty, false);
                break;
            case 'REMOVE_FROM_CART':
                this.ManageCart(userId, product, qty, true);
                break;
            default:
                break;
        }
    }

    async GetOrderPayload(userId, order, event){
        if (order) {
           const payload = {
               event: event,
               data: { userId, order }
           };

           return payload
        } else {
           return FormatData({error: 'No Order Available'});
        }
   }
}

module.exports = ShoppingService;
