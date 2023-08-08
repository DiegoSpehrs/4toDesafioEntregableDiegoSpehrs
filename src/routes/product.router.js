import { Router } from 'express';
import { productManager } from '../ProductsManager.js';

const router = Router()

router.get('/',async(req,res)=>{
    const limit = req.query.limit
    try{
        if(!limit){
            const product = await productManager.getProduct()
            res.status(200).json({message:'products',product})
        }else{
            const product = await productManager.getProduct()
            const prodLimit = product.slice(0,limit)
            res.status(200).json({message:'Los productos segun tu busqueda son', prodLimit})
        }
    }catch(error){
        res.status(500).json((error))
    }   
})
router.get('/:pid',async(req,res)=>{
    const {pid} = req.params
    try{
    const product = await productManager.getProductById(+pid)
    res.status(200).json({message: 'Product',product})    
    }catch(error){
        res.status(500).json({error})
    }
})
router.post('/',async(req,res)=>{
try{
    const newProduct = await productManager.addProduct(req.body)
    res.status(200).json({message:'new product create',product:newProduct})
}catch(error){
    res.status(500).json({error})
}
})
router.put('/:pid',async(req,res)=>{
    const {pid} = req.params
    try{
      const producUpdate = await productManager.updateProduct(pid,req.body)
      res.status(200).json({message:'Product updated'})  
    }catch(error){
        res.status(500).json({error})
    }
})
router.delete('/:pid',async(req,res)=>{
    const {pid} = req.params
    try{
        const response = await productManager.deletProduct(pid)
        res.status(200).json({message:'Product deleted'})
    }catch(error){
        res.status(500).json({error})
    }
})

export default router