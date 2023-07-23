import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import 'firebase/database'; // Importe o módulo do Realtime Database, se necessário

import { firebaseConfig } from '../consts';

// Inicialize o Firebase com a configuração
const firebase = initializeApp(firebaseConfig);

// Obtenha uma referência para o banco de dados
const database = getDatabase(firebase);

export { database, firebase };