// Modelo producto 
///Representa la estructura de cada prod en el sistema
class Product {
    constructor (id, nombre , precio, descripcion) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.descripcion = descripcion;
    }
}

module.exports = Product;