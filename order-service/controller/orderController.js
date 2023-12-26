import { Order } from "../model/orderModel.js";

//display order
export const showAllOrder=async(req,res)=>{
    try {
        
const userId=req.user.id 

        const order = await Order.find({userId})
        if(!order){
          return  res.status(400).json("No Order found")
        }

        res.status(200).json(order)
    } catch (error) {
       res.status(400).json("Error happnec in order-service in the showOrder",error)
    }
}


//cansel order
export const canselOrder=async(req,res)=>{
    try {
        const {id}=req.body
        const order=await Order.findById(id)

        if(!order){
            return res.status(400).json("Invalid Id No order found..!")
        }else if(order.status=='delevered'){
            return res.status(400).json('Order is alredy delivered You cant cansel this..!')
        }else{
      
            order.status='canseled'
            await order.save()
            return res.status(200).json(order)

        }


    } catch (error) {
        res.status(400).json("Error happnec in order-service in the canselOrder",error)
        
    }
}

//retrun order
export const returnOrder=async(req,res)=>{
    try {
      const {id}=req.body 
      const order=await Order.findById(id)

      if(!order){
          return res.status(400).json("Invalid Id No order found..!")
      }else if(order.status=='canseled'){
        return res.status(400).json('Order is alredy canselled You cant return  this..!')

      }else{

        order.status='returned'
        await order.save()

        return res.status(200).json(order)
      }
    } catch (error) {
        res.status(400).json("Error happnec in order-service in the returnOrder",error)
        
    }
}


//order status
//a specific order    
export const aOrderData=async(req,res)=>{
    try {
        const {id}=req.body
        const order=await Order.findById(id)
        if(!order){
            return res.status(400).json("Invalid Id No order found..!")
        }
        return res.status(200).json(order)

    } catch (error) {
        res.status(400).json("Error happnec in order-service in the aOrderData",error)
        
    }
}
  





