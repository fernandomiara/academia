package com.example.academiaBackend.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.academiaBackend.dto.ExercicioDTO;
import com.example.academiaBackend.entity.ExercicioTreino;
import com.example.academiaBackend.entity.Professor;
import com.example.academiaBackend.entity.UsuarioExercicio;
import com.example.academiaBackend.repository.ProfessorRepository;
import com.example.academiaBackend.repository.UsuarioExercicioRepository;

@Service
public class AcademiaService {
	
	@Autowired
	private ProfessorRepository repository;
	
	@Autowired
    private UsuarioExercicioRepository usuarioExercicioRepository;
	
	public List<Professor> listarTodasAcademiaUsuario(Integer idUsuario){
		return repository.listarTodasAcademiaUsuario(idUsuario);
	}
	
	public Map<Integer, List<ExercicioDTO>> listarTodasAulasUsuario(Integer idUsuario, Integer idProfessor) {
        List<UsuarioExercicio> lista = usuarioExercicioRepository.findByUsuarioIdAndProfessorId(idUsuario, idProfessor);

        Map<Integer, List<ExercicioDTO>> treinoSemanal = new HashMap<>();

        for (int i = 0; i <= 6; i++) {
            treinoSemanal.put(i, new ArrayList<>());
        }

        for (UsuarioExercicio ue : lista) {
            int dia = ue.getExercicio().getDiaSemana();
            if (dia < 0 || dia > 6) continue;

            ExercicioTreino exercicio = ue.getExercicio();
            String titulo = exercicio.getTreino().getNome();
            Integer series = exercicio.getSeries();
            Integer repeticao = exercicio.getRepeticoes();
            Boolean concluido = ue.getConcluido();

            ExercicioDTO dto = new ExercicioDTO(titulo, repeticao, series, concluido);
            treinoSemanal.get(dia).add(dto);
        }

        return treinoSemanal;
    }
}
