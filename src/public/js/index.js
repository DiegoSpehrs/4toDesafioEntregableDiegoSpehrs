const socketClient = io()

const formularioAddProduct = document.getElementById('formAddProduct')
const title = document.getElementById('productTitle')
const description = document.getElementById('productDescription')
const price = document.getElementById('productPrice')
const thumbnail = document.getElementById('productThumbnail')
const code = document.getElementById('productCode')
const stock = document.getElementById('productStock')
const idProduct = document.getElementById('idProduct')

const formularioDeletProduct = document.getElementById('formDeleteProduct')
const id = document.getElementById('idProductDeleted')

const productListHome = document.getElementById('productsHome')
const productListInRealTime = document.getElementById('productsInRealTime')

formularioAddProduct.onsubmit = (e)=>{
    e.preventDefault()
    const product = {
        title: title.value,
        description: description.value,
        price: price.value,
        thumbnail: thumbnail.value,
        code: code.value,
        stock: stock.value,
        id: idProduct.value
    }
    socketClient.emit('addProduct',product)
}

formularioDeletProduct.onsubmit = (e)=>{
    e.preventDefault()
    const idproduct = id.value
    socketClient.emit('deletProduct', idproduct)
}

socketClient.on('arrProductsHome',(arrProducts)=>{
    const arrProd = [...arrProducts]
    .map((objProduct)=>{
        return `<p> title: ${objProduct.title}
                    description: ${objProduct.description}
                    price: $${objProduct.price}
                    code: ${objProduct.code}
                    stock: ${objProduct.stock}
                </p>`
    })
    productListHome.innerHTML = arrProd

})

socketClient.on('arrProductsRealTime', (arrProducts)=>{
    const arrProd = [...arrProducts]
    .map((objProduct)=>{
        return `<p> title: ${objProduct.title}
                    description: ${objProduct.description}
                    price: $${objProduct.price}
                    code: ${objProduct.code}
                    stock: ${objProduct.stock}`
    })
    productListInRealTime.innerHTML = arrProd
})

socketClient.on('productoAgregado',(arrProducts)=>{
    const arrProd = [...arrProducts]
    .map((objProduct)=>{
        return `<p> title: ${objProduct.title}
                    description: ${objProduct.description}
                    price: $${objProduct.price}
                    code: ${objProduct.code}
                    stock: ${objProduct.stock}`
    })
    productListInRealTime.innerHTML = arrProd
})

socketClient.on('productoEliminado',(arrProducts)=>{
    const arrProd = [...arrProducts]
    .map((objProduct)=>{
        return `<p> title: ${objProduct.title}
                    description: ${objProduct.description}
                    price: $${objProduct.price}
                    code: ${objProduct.code}
                    stock: ${objProduct.stock}`
    })
    productListInRealTime.innerHTML = arrProd
})






