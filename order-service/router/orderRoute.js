import express from 'express'
export const router=express()

import authMiddleware from '../authmiddleware.js'
import {
    
    showAllOrder,
    aOrderData,
    canselOrder,
    returnOrder,


} from '../controller/orderController.js'
router.get('/getAllOrders',authMiddleware,showAllOrder)
router.post('/aOrder',authMiddleware,aOrderData)
router.post('/retunOrder',authMiddleware,returnOrder)
router.post('/canselOrder',authMiddleware,canselOrder)


