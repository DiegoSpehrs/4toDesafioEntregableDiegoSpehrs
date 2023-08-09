import  express  from 'express';
import { productManager } from './ProductsManager.js';
import cartsRouter from './routes/cart.router.js';
import productsRouter from './routes/product.router.js';
import viewsRouter from './routes/views.router.js';
import {__dirname} from './utils.js';
import hanldebars from 'express-handlebars';
import { Server } from 'socket.io';



const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'public'))

app.engine('handlebars',hanldebars.engine())
app.set('views',__dirname+'/views')
app.set('view engine','handlebars')


app.use('/api/products',productsRouter)
app.use('/api/carts',cartsRouter)
app.use('/api/views',viewsRouter)


const PORT = 8080

const httpServer = app.listen(PORT,()=>{
    console.log('Escuchando al puerto 8080')
})

const socketServer = new Server(httpServer)




socketServer.on('connection',(socket)=>{
    console.log(`Usuario conectado: ${socket.id}`);
    
    socketServer.on('addProduct',async(newProduct)=>{ 
        try{
            const addProduct = await productManager.addProduct(
                newProduct.title,
                newProduct.description,
                newProduct.price,
                newProduct.thumbnai,
                newProduct.code,
                newProduct.stock,
                newProduct.id                
            );
            socketServer.emit("addProductSuccess", addProduct);
        }catch(error){
            socket.emit('errorAddProd',"error al agregar el producto")
        }  
    })

    socketServer.on('deletPorduct',async(idProduct)=>{
        try{
            const producDeleted = await productManager.deletProduct(idProduct)
            socketServer.emit("deleteProductSuccess", producDeleted);
        }catch(error){
            socket.emit('errorDeletedProd',"error al eliminar el producto")
        }
       
    })

    socket.on('disconnect',()=>{
        console.log(`Usuario desconectado: ${socket.id}`);
    })

})


