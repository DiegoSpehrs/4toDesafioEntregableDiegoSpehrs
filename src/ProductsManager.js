
import fs from "fs";

class ProductManager{
    constructor(path){
        this.path = path
    }

    async getProduct(){
        try{
          if(fs.existsSync(this.path)) {
            const productFile = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(productFile)
          } else {
            return []
          } 
        } catch (error) {
            return error
        }
    }

    async addProduct(title,description,price,thumbnail,code,stock){
        try{
          const productPrev = await this.getProduct()
          let id 
          if(!productPrev.length) {
            id = 1
          } else {
            id = productPrev[productPrev.length -1].id +1   
          }
          const newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
          productPrev.push({...newProduct, id})
          await fs.promises.writeFile(this.path, JSON.stringify(productPrev))
        } catch (error){
            return error
        }
    }

    async getProductById(id){
        try{
          const productPrev = await this.getProduct()
          const product = productPrev.find((p) => p.id === id)
          if(!product) {
            return 'Producto con id no encontrado'
          } 
          return product     
        } catch (error){
            return error
        }
    }

    async updateProduct(id,obj) {
        try{
          const productPrev = await this.getProduct()
          const productIndex = productPrev.findIndex((p) => p.id === id)
          if(productIndex === -1) {
            return 'No hay un producto con ese id'
          }
          const product = productPrev[productIndex]
          productPrev[productIndex] = {...product,...obj}
          await fs.promises.writeFile(this.path, JSON.stringify(productPrev))  
        } catch (error) {
            return error
        }
    }

    async deletProduct(id) {
        try{
          const productPrev = await this.getProduct()
          const newArrProduct = productPrev.filter((p) => p.id !== id)
          await fs.promises.writeFile(this.path, JSON.stringify(newArrProduct))  
        }catch (error) {
            return error
        }
    }
}


export const productManager = new ProductManager('productosPrueba.json')
