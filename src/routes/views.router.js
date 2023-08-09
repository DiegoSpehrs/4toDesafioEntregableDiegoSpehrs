import { Router } from "express";
import  {productManager}  from "../ProductsManager.js";


const router = Router()




router.get('/',async(req,res) =>{
    const allProducts = await productManager.getProduct();
    res.render("bodyHome",{ products: allProducts })
})

router.get('/realtimeproducts',async(req,res)=>{    
    const allProducts = await productManager.getProduct();
    res.render("realTimeProducts",{ products: allProducts })
})




export default router