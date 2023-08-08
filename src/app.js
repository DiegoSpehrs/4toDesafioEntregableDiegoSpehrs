import  express  from 'express';
import cartsRouter from './routes/cart.router.js';
import productsRouter from './routes/product.router.js';
import viewsRouter from './routes/views.router.js';
import {__dirname} from './utils.js';
import hanldebars from 'express-handlebars';
import { Server } from 'socket.io';
import { productManager } from './ProductsManager.js';


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

const arrProducts = [
    {
        product: {
            title: "Tablet",
            description: "esto es una prueba",
            price: 5000,
            thumbnail: "esto es una prubea",
            code: "abc123",
            stock: 25,
            id: 1
        }
        
    },
    {
        product:{
        title: "Iphone",
        description: "esto es una prueba",
        price: 15000,
        thumbnail: "esto es una prubea",
        code: "abc124",
        stock: 25,
        id: 2
        }
    },
    {
        product:{
        title: "TV",
        description: "esto es una prueba",
        price: 30000,
        thumbnail: "esto es una prubea",
        code: "abc125",
        stock: 25,
        id: 3
        }
    },
    {
        product:{
        title: "Ipad",
        description: "esto es una prueba",
        price: 6000,
        thumbnail: "esto es una prubea",
        code: "abc126",
        stock: 25,
        id: 4
        }
    },
    {
        product:{
        title: "Macbook",
        description: "esto es una prueba",
        price: 25000,
        thumbnail: "esto es una prubea",
        code: "abc127",
        stock: 25,
        id: 5
        }
    },
    {
        product:{
        title: "Notebook",
        description: "esto es una prueba",
        price: 20000,
        thumbnail: "esto es una prubea",
        code: "abc128",
        stock: 25,
        id: 6
        }
    },
    {
        product:{
        title: "Tablet",
        description: "esto es una prueba",
        price: 10000,
        thumbnail: "esto es una prubea",
        code: "abc129",
        stock: 25,
        id: 7
        }
    },
    {
        product:{
        title: "Teclado",
        description: "esto es una prueba",
        price: 3500,
        thumbnail: "esto es una prubea",
        code: "abc130",
        stock: 25,
        id: 8
        }
    },
    {
        product:{
        title: "Microprocesador i-310100f",
        description: "esto es una prueba",
        price: 65000,
        thumbnail: "esto es una prubea",
        code: "abc131",
        stock: 25,
        id: 9
        }
    },
    {
        product:{
        title: "Placa de video rtx 3090TI",
        description: "esto es una prueba",
        price: 150000,
        thumbnail: "esto es una prubea",
        code: "abc132",
        stock: 25,
        id: 10
        }
    }
    
]


socketServer.on('connection',(socket)=>{
    console.log(`Usuario conectado: ${socket.id}`);
    socketServer.emit('arrProductsHome',arrProducts)
    socketServer.emit('arrProductsRealTime',arrProducts)
    
    socket.on('disconnect',()=>{
        console.log(`Usuario desconectado: ${socket.id}`);
    })

    socketServer.on('addProduct',(product)=>{ 
        const newProduct = {...product}
        arrProducts.push(newProduct)
        socketServer.emit('productoAgregado',arrProducts)
    })

    socketServer.on('deletPorduct',(idProduct)=>{
        arrPrev = arrProducts
       const newArrProducts = arrProducts.filter((p)=> p.id !== idProduct)

       socketServer.emit('productoEliminado',arrProducts)
    })
})


