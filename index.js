const express = require( 'express' );
const dotenv = require( 'dotenv' );
const connect = require( './conection' ); // Importamos las colecciones desde conection.js
const { MongoClient, ObjectId } = require( 'mongodb' );


// Cargar las variables de entorno
dotenv.config();

const app = express();
app.use( express.json() ); // Para manejar datos en formato JSON

let personasCollection, comidaCollection, criptosCollection;

// Conectar a la base de datos y asignar las colecciones
connect().then( ( collections ) => {
  personasCollection = collections.personasCollection;
  comidaCollection = collections.comidaCollection;
  criptosCollection = collections.criptosCollection;
} );

// Rutas CRUD

// 1. Obtener todas las personas
app.get( '/personas', async ( req, res ) => {
  const personas = await personasCollection.find().toArray();
  res.json( personas );
} );

// 2. Agregar una nueva persona
app.post( '/personas', async ( req, res ) => {
  const nuevaPersona = req.body;
  await personasCollection.insertOne( nuevaPersona );
  console.log( nuevaPersona );
  res.json( { message: 'Persona agregada' } );
} );

// 3. Actualizar una persona por ID
app.put( '/personas/:id', async ( req, res ) => {
  const { id } = req.params;
  const actualizacion = req.body;

  try {
    // Convertir el id a número
    const idNumerico = parseInt( id );

    if ( isNaN( idNumerico ) ) {
      return res.status( 400 ).json( { message: 'El id debe ser un número válido' } );
    }

    // Actualizar el documento que tiene el id personalizado
    const resultado = await personasCollection.updateOne( { id: idNumerico }, { $set: actualizacion } );

    if ( resultado.matchedCount === 0 ) {
      return res.status( 404 ).json( { message: 'Persona no encontrada' } );
    }
    console.log( actualizacion );
    res.json( { message: 'Persona actualizada correctamente' } );
  } catch ( error ) {
    console.error( 'Error al actualizar la persona:', error );
    res.status( 500 ).json( { message: 'Error al actualizar la persona', error: error.message } );
  }
} );

// 4. Eliminar una persona por ID
app.delete( '/personas/:id', async ( req, res ) => {
  const { id } = req.params;

  try {
    // Convertir el id a número si es necesario
    const idNumerico = parseInt( id );

    if ( isNaN( idNumerico ) ) {
      return res.status( 400 ).json( { message: 'El id debe ser un número válido' } );
    }

    // Eliminar el documento con el id personalizado
    const resultado = await personasCollection.deleteOne( { id: idNumerico } );

    if ( resultado.deletedCount === 0 ) {
      return res.status( 404 ).json( { message: 'Persona no encontrada' } );
    }
    console.log( "Eiminar persona" + id );
    res.json( { message: 'Persona eliminada correctamente' } );
  } catch ( error ) {
    console.error( 'Error al eliminar la persona:', error );
    res.status( 500 ).json( { message: 'Error al eliminar la persona', error: error.message } );
  }
} );

// Rutas para comida

// 1. Obtener todas las comidas
app.get( '/comida', async ( req, res ) => {
  const comidas = await comidaCollection.find().toArray();
  res.json( comidas );
} );

// 2. Agregar una nueva comida
app.post( '/comida', async ( req, res ) => {
  const nuevaComida = req.body;
  await comidaCollection.insertOne( nuevaComida );
  console.log( nuevaComida );
  res.json( { message: 'Comida agregada' } );
} );

// 3. Actualizar una comida por ID personalizado
app.put( '/comida/:id', async ( req, res ) => {
  const { id } = req.params;
  const actualizacion = req.body;

  try {
    // Convertir el id a número
    const idNumerico = parseInt( id );

    if ( isNaN( idNumerico ) ) {
      return res.status( 400 ).json( { message: 'El id debe ser un número válido' } );
    }

    // Actualizar el documento que tiene el id personalizado
    const resultado = await comidaCollection.updateOne( { id: idNumerico }, { $set: actualizacion } );

    if ( resultado.matchedCount === 0 ) {
      return res.status( 404 ).json( { message: 'Comida no encontrada' } );
    }
    console.log( actualizacion );
    res.json( { message: 'Comida actualizada correctamente' } );
  } catch ( error ) {
    console.error( 'Error al actualizar la comida:', error );
    res.status( 500 ).json( { message: 'Error al actualizar la comida', error: error.message } );
  }
} );

// 4. Eliminar una comida por ID personalizado
app.delete( '/comida/:id', async ( req, res ) => {
  const { id } = req.params;

  try {
    // Convertir el id a número si es necesario
    const idNumerico = parseInt( id );

    if ( isNaN( idNumerico ) ) {
      return res.status( 400 ).json( { message: 'El id debe ser un número válido' } );
    }

    // Eliminar el documento con el id personalizado
    const resultado = await comidaCollection.deleteOne( { id: idNumerico } );

    if ( resultado.deletedCount === 0 ) {
      return res.status( 404 ).json( { message: 'Comida no encontrada' } );
    }
    console.log( "Eiminar comida" + id );
    res.json( { message: 'Comida eliminada correctamente' } );
  } catch ( error ) {
    console.error( 'Error al eliminar la comida:', error );
    res.status( 500 ).json( { message: 'Error al eliminar la comida', error: error.message } );
  }
} );

// Rutas para criptos

// 1. Obtener todas las criptos
app.get( '/criptos', async ( req, res ) => {
  const criptos = await criptosCollection.find().toArray();
  res.json( criptos );
} );

// 2. Agregar una nueva cripto
app.post( '/criptos', async ( req, res ) => {
  const nuevaCripto = req.body;
  await criptosCollection.insertOne( nuevaCripto );
  console.log( nuevaCripto );
  res.json( { message: 'Cripto agregada' } );
} );

// 3. Actualizar una cripto por ID personalizado
app.put( '/criptos/:id', async ( req, res ) => {
  const { id } = req.params;
  const actualizacion = req.body;

  try {
    // Convertir el id a número
    const idNumerico = parseInt( id );

    if ( isNaN( idNumerico ) ) {
      return res.status( 400 ).json( { message: 'El id debe ser un número válido' } );
    }

    // Actualizar el documento que tiene el id personalizado
    const resultado = await criptosCollection.updateOne( { id: idNumerico }, { $set: actualizacion } );

    if ( resultado.matchedCount === 0 ) {
      return res.status( 404 ).json( { message: 'Cripto no encontrada' } );
    }
    console.log( actualizacion );
    res.json( { message: 'Cripto actualizada correctamente' } );
  } catch ( error ) {
    console.error( 'Error al actualizar la cripto:', error );
    res.status( 500 ).json( { message: 'Error al actualizar la cripto', error: error.message } );
  }
} );

// 4. Eliminar una cripto por ID personalizado
app.delete( '/criptos/:id', async ( req, res ) => {
  const { id } = req.params;

  try {
    // Convertir el id a número si es necesario
    const idNumerico = parseInt( id );

    if ( isNaN( idNumerico ) ) {
      return res.status( 400 ).json( { message: 'El id debe ser un número válido' } );
    }

    // Eliminar el documento con el id personalizado
    const resultado = await criptosCollection.deleteOne( { id: idNumerico } );

    if ( resultado.deletedCount === 0 ) {
      return res.status( 404 ).json( { message: 'Cripto no encontrada' } );
    }
    console.log( "Eiminar cripto" + id );
    res.json( { message: 'Cripto eliminada correctamente' } );
  } catch ( error ) {
    console.error( 'Error al eliminar la cripto:', error );
    res.status( 500 ).json( { message: 'Error al eliminar la cripto', error: error.message } );
  }
} );


// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen( PORT, () => {
  console.log( `Servidor corriendo en el puerto ${ PORT }` );
} );
