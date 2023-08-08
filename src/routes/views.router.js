import { Router } from "express";

const router = Router()


router.get('/',(res,req) =>{
    res.render('productsHome')
})

router.post('/realtimeproducts',(req,res)=>{    
    res.render('productsInRealTime')
})




export default router