import React from 'react'
import './Admin.css'
import { useState, useEffect } from 'react'
import { collection, addDoc, setDoc, doc} from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db,storage } from '../../services/firebase/firebaseConfig'
import Swal from 'sweetalert2';


const Admin = () => {
    const [image1, setImg1] = useState(null);
    const [imagePreview1, setImagePreview1] = useState('');
    const [image2, setImg2] = useState(null);
    const [imagePreview2, setImagePreview2] = useState('');
    const [category, setCategory] = useState('quemadores');
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState(0);
    const [stock, setStock] = useState(false);
    const [descripcion, setDescripcion] = useState('');
    const [descuento, setDescuento] = useState(0);
    const [sizes, setSizes] = useState([{ size: '', price: '' }]);
    const [conTamanios, setConTamanios] = useState(false);

    const handleNombre = (e) => setNombre(e.target.value);
    const handlePrecio = (e) => setPrecio(e.target.value);
    const handleStock = (e) => setStock(e.target.checked);
    const handleDescripcion = (e) => setDescripcion(e.target.value);
    const handleDescuento = (e) => setDescuento(e.target.value);
    const handleCategory = (e) => setCategory(e.target.value);

    const handleImage1Change = (e) => {
        const file = e.target.files[0];
        setImg1(file);
        const reader = new FileReader();
        reader.onload = () => setImagePreview1(reader.result);
        reader.readAsDataURL(file);
    };

    const handleImage2Change = (e) => {
        const file = e.target.files[0];
        setImg2(file);
        const reader = new FileReader();
        reader.onload = () => setImagePreview2(reader.result);
        reader.readAsDataURL(file);
    };

    const handleSizeChange = (index, field, value) => {
        const updatedSizes = [...sizes];
        updatedSizes[index][field] = value;
        setSizes(updatedSizes);
    };

    const addSizeField = () => {
        setSizes([...sizes, { size: '', price: '' }]);
    };

    const removeSizeField = (index) => {
        const updatedSizes = sizes.filter((_, i) => i !== index);
        setSizes(updatedSizes);
    };

    const addProduct = async (e) => {
        e.preventDefault();
        const productFolderRef = ref(storage, `products/${category}/${nombre}`);

        let imageUrl1 = '';
        if (image1) {
            const image1Ref = ref(productFolderRef, image1.name);
            await uploadBytesResumable(image1Ref, image1);
            imageUrl1 = await getDownloadURL(image1Ref);
        }

        let imageUrl2 = '';
        if (image2) {
            const image2Ref = ref(productFolderRef, image2.name);
            await uploadBytesResumable(image2Ref, image2);
            imageUrl2 = await getDownloadURL(image2Ref);
        }

        const nombreProducto = nombre.toUpperCase().replace(/\s+/g, '-');
        const nuevoProducto = {
            nombre,
            descripcion,
            stock,
            descuento,
            categoria: category,
            conTamanios,
            tamanios: conTamanios ? sizes : [],
            img1: imageUrl1,
            img2: imageUrl2,
        };

        if (!conTamanios) {
            nuevoProducto.precio = precio;
        }

        try {
            const productRef = doc(db, 'products', nombreProducto);
            await setDoc(productRef, nuevoProducto);
            Swal.fire({
                icon: 'success',
                title: 'Producto agregado',
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error al agregar producto',
                text: error.message,
                showConfirmButton: true,
            });
        }
    };

    return (
        <div className="adminContainer">
            <form className="adminForm" onSubmit={addProduct}>
                <h1>Administrar Productos</h1>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre:</label>
                    <input type="text" id="nombre" name="nombre" required value={nombre} onChange={handleNombre} />
                </div>
                {!conTamanios && (
                    <div className="form-group">
                        <label htmlFor="precio">Precio:</label>
                        <input type="number" id="precio" name="precio" required value={precio} onChange={handlePrecio} />
                    </div>
                )}
                <div className="form-group">
                    <label htmlFor="descripcion">Descripción:</label>
                    <input type="text" id="descripcion" name="descripcion" required value={descripcion} onChange={handleDescripcion} />
                    <label htmlFor="stock">Stock:</label>
                    <input type="checkbox" id="stock" name="stock" className="stock" checked={stock} onChange={handleStock} />
                </div>
                <div className="form-group">
                    <label htmlFor="descuento">Descuento:</label>
                    <select name="descuento" id="descuento" required value={descuento} onChange={handleDescuento}>
                        {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60].map((val) => (
                            <option key={val} value={val}>{`${val}%`}</option>
                        ))}
                    </select>
                    <label htmlFor="category">Categoría:</label>
                    <select name="category" id="category" required value={category} onChange={handleCategory}>
                        <option value="quemadores">Quemadores</option>
                        <option value="fogoneros">Fogoneros</option>
                        <option value="tablas">Tablas</option>
                        <option value="parrillas">Parrillas</option>
                        <option value="braseros">Braseros</option>
                        <option value="ollas">Ollas y Cacerolas</option>
                    </select>
                </div>

                <label htmlFor="img1">Imagen 1:</label>
                <input type="file" id="img1" name="imagen1" onChange={handleImage1Change} />
                {imagePreview1 && <img src={imagePreview1} alt="Preview" style={{ maxWidth: '100px' }} />}

                <label htmlFor="img2">Imagen 2:</label>
                <input type="file" id="img2" name="imagen2" onChange={handleImage2Change} />
                {imagePreview2 && <img src={imagePreview2} alt="Preview" style={{ maxWidth: '100px' }} />}

                <div className="form-group">
                    <label>
                        <input
                            type="checkbox"
                            checked={conTamanios}
                            onChange={(e) => setConTamanios(e.target.checked)}
                        />
                        ¿El producto tiene tamaños?
                    </label>
                </div>

                {conTamanios && (
                    <div>
                        <h3>Tamaños y Precios</h3>
                        {sizes.map((size, index) => (
                            <div key={index} className="size-group">
                                <input
                                    type="text"
                                    placeholder="Tamaño"
                                    value={size.size}
                                    onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
                                    required
                                />
                                <input
                                    type="number"
                                    placeholder="Precio"
                                    value={size.price}
                                    onChange={(e) => handleSizeChange(index, 'price', e.target.value)}
                                    required
                                />
                                <button type="button" onClick={() => removeSizeField(index)}>
                                    Eliminar
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={addSizeField}>Añadir Tamaño</button>
                    </div>
                )}

                <button className="Button" type="submit">Agregar</button>
            </form>
        </div>
    );
};

export default Admin;