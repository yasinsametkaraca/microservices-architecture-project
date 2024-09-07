const { CustomerRepository } = require("../database");
const { FormatData, GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } = require('../utils');

// All Business logic will be here
class CustomerService {

    constructor(){
        this.repository = new CustomerRepository(); // dependency injection
    }

    async SignIn(userInputs){

        const { email, password } = userInputs;
        
        const existingCustomer = await this.repository.FindCustomer({ email});

        if(existingCustomer){
            
            const validPassword = await ValidatePassword(password, existingCustomer.password, existingCustomer.salt);
            if(validPassword){
                const token = await GenerateSignature({ email: existingCustomer.email, _id: existingCustomer._id});
                return FormatData({id: existingCustomer._id, token });
            }
        }

        return FormatData(null);
    }

    async SignUp(userInputs){
        
        const { email, password, phone } = userInputs;

        if (!email || !password || !phone) {
            return FormatData({ msg: 'Invalid Inputs'});
        }
        
        // create salt
        let salt = await GenerateSalt();
        
        let userPassword = await GeneratePassword(password, salt);
        
        const existingCustomer = await this.repository.CreateCustomer({email, password: userPassword, phone, salt});
        
        const token = await GenerateSignature({ email: email, _id: existingCustomer._id});
        return FormatData({id: existingCustomer._id, token });
    }

    async AddNewAddress(_id,userInputs){
        
        const { street, postalCode, city,country} = userInputs;
    
        const addressResult = await this.repository.CreateAddress({_id, street, postalCode, city,country})

        return FormatData(addressResult);
    }

    async GetProfile(id){

        const existingCustomer = await this.repository.FindCustomerById({id});
        return FormatData(existingCustomer);
    }

    async GetShoppingDetails(id){

        const existingCustomer = await this.repository.FindCustomerById({id});

        if(existingCustomer){
            // const orders = await this.shoppingRepository.Orders(id);
           return FormatData(existingCustomer);
        }       
        return FormatData({ msg: 'Error'});
    }

    async GetWishList(customerId){
        const wishListItems = await this.repository.Wishlist(customerId);
        return FormatData(wishListItems);
    }

    async AddToWishlist(customerId, product){
         const wishlistResult = await this.repository.AddWishlistItem(customerId, product);        
        return FormatData(wishlistResult);
    }

    async ManageCart(customerId, product, qty, isRemove){
        const cartResult = await this.repository.AddCartItem(customerId, product, qty, isRemove);        
       return FormatData(cartResult);
    }

    async ManageOrder(customerId, order){
        const orderResult = await this.repository.AddOrderToProfile(customerId, order);
        return FormatData(orderResult);
    }

    async SubscribeEvents(payload){ // Communication between services. If other services call our customer service, this method will be triggered
 
        console.log('Triggering.... Customer Events')
        console.log(payload)
        if (typeof payload === 'string') {
            try {
                payload = JSON.parse(payload);
            } catch (error) {
                console.error('Invalid JSON format:', error);
                return;
            }
        }
        const { event, data } =  payload;
        const { userId, product, order, qty } = data;

        switch(event){
            case 'ADD_TO_WISHLIST':
            case 'REMOVE_FROM_WISHLIST':
                this.AddToWishlist(userId, product)
                break;
            case 'ADD_TO_CART':
                this.ManageCart(userId, product, qty, false);
                break;
            case 'REMOVE_FROM_CART':
                this.ManageCart(userId, product,qty, true);
                break;
            case 'CREATE_ORDER':
                this.ManageOrder(userId, order);
                break;
            case 'TEST':
                console.log('TEST EVENT')
                break;
            default:
                break;
        }
    }
}
// SubscribeEvents method is used to listen to events from other services and trigger the appropriate method in the customer service

module.exports = CustomerService;
