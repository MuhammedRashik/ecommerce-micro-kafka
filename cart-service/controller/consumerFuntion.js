import { serviceToProducer } from "../kafka/serviceToProducer.js";
import { Cart } from "../model/cartModel.js";

export async function addToCartConsumer(data) {

console.log('----------here-------------');



  const userId = data.user;
  const products = data.product;


  const existingCart = await Cart.findOne({ userId: userId });

  if (!existingCart) {
    
    let price = 0;
    for (let i = 0; i < products.length; i++) {
      price += products[i].price;
    }

    const newCart = new Cart({
      userId: userId,
      products: products.map(product => ({
        productId: product._id,
        productName: product.title,
        quantity: 1, 
        subtotal: product.price,
      })),
      total: price,
    });

   
    await newCart.save();
  } else {
   
    for (let i = 0; i < products.length; i++) {
      const existingProductIndex = existingCart.products.findIndex(
        cartProduct => cartProduct.productId.toString() === products[i]._id.toString()
      );

      if (existingProductIndex !== -1) {
      
        existingCart.products[existingProductIndex].quantity += 1;
        existingCart.products[existingProductIndex].subtotal += products[i].price;
      } else {
       
        existingCart.products.push({
          productId: products[i]._id,
          productName: products[i].title,
          quantity: 1,
          subtotal: products[i].price,
        });
      }

   
      existingCart.total += products[i].price;
    }

   
    const cart=await existingCart.save();
    console.log('-----cart ',cart,'-------');



   
   

  



  }
}


export const createOrder=async(data)=>{
  try {


const userId=data.userId
    const cart=await Cart.findOne({userId})
   


const obj={
  event:"create-order-cart",
  userId:userId,
  cart:cart,
  address:data.address
}

console.log(obj);

await serviceToProducer(obj,'cart-topic')

cart.total=0
cart.products=[]
await cart.save()
   

  } catch (error) {
    console.log('Error in crete order in cart service',error);
  }
}