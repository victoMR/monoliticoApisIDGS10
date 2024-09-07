const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

// Cargar las variables de entorno
dotenv.config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
console.log('URI:', uri);

// Función para conectar a MongoDB y exportar las colecciones
async function connect() {
  try {
    await client.connect();
    console.log('Conectado al servidor MongoDB');

    // Conectar a las bases de datos
    const personasDb = client.db('personas');
    const comidaDb = client.db('comida');
    const criptosDb = client.db('criptos');

    // Exportar las colecciones
    const personasCollection = personasDb.collection('datos_personas');
    const comidaCollection = comidaDb.collection('datos_comida');
    const criptosCollection = criptosDb.collection('datos_criptos');

    return { personasCollection, comidaCollection, criptosCollection };

  } catch (error) {
    console.error('Error conectando a las bases de datos', error);
  }
}

module.exports = connect;
