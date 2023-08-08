import {Router} from 'express';
import { cartManager } from '../CartsManager.js';

const router = Router()

router.post('/',async(req,res)=>{
    try{
        const createCart = await cartManager.createCart()
        res.status(200).json({message:'Cart',cart:createCart})
    }catch(error){
        res.status(500).json({error})
    }
})
router.get('/:cid',async(req,res)=>{
    const {cid} = req.params
    try{
        const cart = cartManager.getOneCart(+cid)
        res.status(200).json({message:'cart',cart})
    }catch(error){
        res.status(500).json({error})
    }
})
router.post('/:idCart/products/:idProduct',async(req,res)=>{
    const {idCart,idProduct} = req.params
    try{
        const addProduct = await cartManager.addProduct
        (+idCart,+idProduct)
        res.status(200).json({message:'product-cart',cart:addProduct})
    }catch(error){
        res.status(500).json({error})
    }
})

export default router