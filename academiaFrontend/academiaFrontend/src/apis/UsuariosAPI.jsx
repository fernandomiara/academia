import axios from 'axios';

const ACADEMIA_BACKEND_URL = import.meta.env.VITE_ACADEMIA_BACKEND_URL;

export const buscarTodosUsuarios = async () => {
  try {
    const response = await axios.get(`${ACADEMIA_BACKEND_URL}/api/usuario/findAll`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar treinos:", error);
    throw error;
  }
};
