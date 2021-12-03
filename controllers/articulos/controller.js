import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js';

const queryAllArticles = async (callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('articulo').find({}).limit(50).toArray(callback);
};

const crearArticulo = async (datosArticulo, callback) => {
  if (
    Object.keys(datosArticulo).includes('name') &&
    Object.keys(datosArticulo).includes('brand') &&
    Object.keys(datosArticulo).includes('model')
  ) {
    const baseDeDatos = getDB();
    // implementar código para crear Artículo en la BD

    await baseDeDatos.collection('articulo').insertOne(datosArticulo, callback);
  } else {
    return 'error';
  }
};

const consultarArticulo = async (id, callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('articulo').findOne({ _id: new ObjectId(id) }, callback);
};

const editarArticulo = async (id, edicion, callback) => {
  const filtroArticulo = { _id: new ObjectId(id) };
  const operacion = {
    $set: edicion,
  };
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection('articulo')
    .findOneAndUpdate(filtroArticulo, operacion, { upsert: true, returnOriginal: true }, callback);
};

const eliminarArticulo = async (id, callback) => {
  const filtroArticulo = { _id: new ObjectId(id) };
  const baseDeDatos = getDB();
  await baseDeDatos.collection('articulo').deleteOne(filtroArticulo, callback);
};

export { queryAllArticles, crearArticulo, consultarArticulo, editarArticulo, eliminarArticulo };