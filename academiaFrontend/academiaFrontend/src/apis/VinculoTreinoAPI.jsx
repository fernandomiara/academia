import axios from 'axios';

const ACADEMIA_BACKEND_URL = import.meta.env.VITE_ACADEMIA_BACKEND_URL;

export const salvarModeloTreino = async (payload) => {
  try {
    const response = await axios.post(`${ACADEMIA_BACKEND_URL}/api/vincular/criarModelo`, payload);
    return response.data;
  } catch (error) {
    console.error("Erro ao salvar treino:", error);
    throw error;
  }
};

export const buscarTodosTreinos = async () => {
  try {
    const response = await axios.get(`${ACADEMIA_BACKEND_URL}/api/vincular/findAll`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar treinos:", error);
    throw error;
  }
};

export const buscarTodosModelos = async (idProfessor) => {
  try {
    const response = await axios.get(`${ACADEMIA_BACKEND_URL}/api/vincular/consultaModelos/${idProfessor}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar treinos:", error);
    throw error;
  }
};

export const vincularUsuarioTreino = async (payload) => {
  try {
    const response = await axios.post(`${ACADEMIA_BACKEND_URL}/api/vincular/vincularUsuarioTreino`, payload);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar treinos:", error);
    throw error;
  }
};

export const consultaModelosUsuario = async (idUsuario) => {
 try {
    const response = await axios.get(`${ACADEMIA_BACKEND_URL}/api/vincular/consultaModelosUsuario/${idUsuario}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar treinos:", error);
    throw error;
  }
}