/*Creamos nuestra clase con los metodos a utilizar 
en la carpeta index.js*/

class Product {
  products;
  constructor() {
    this.products = [];
  }
  get() {
    return this.products;
  }
  getById(id) {
    return this.products.find((product) => product.id == id);
  }
  save(dato) {
    const product = { id: this.products.length, ...dato };
    this.products.push(product);
    return product;
  }  
  update(dato, id){
    if(this.products.find(data => data.id ==  id) == undefined){
      return {"error": "product no found"};
    }    
    else {
      const index = this.products.findIndex(data => data.id ==  id);
      dato['id'] = id
      this.products[index] = dato;
      return this.products
    }
  }
  delete(id) {
    if(this.products.find(data => data.id ==  id) == undefined){
        return {"error": "product no found"};
    }    
    else {
        const index = this.products.findIndex(data => data.id ==  id);
        this.products.splice(index, 1);
        return this.products
    }
  } 
    
}


export default Product;
