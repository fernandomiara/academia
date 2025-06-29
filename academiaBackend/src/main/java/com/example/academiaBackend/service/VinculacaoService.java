package com.example.academiaBackend.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.academiaBackend.dto.ConsultaTreinoModeloDTO;
import com.example.academiaBackend.dto.DisponivelVinculacaoDTO;
import com.example.academiaBackend.dto.ExercicioInputDTO;
import com.example.academiaBackend.dto.TreinoModeloDTO;
import com.example.academiaBackend.dto.VincularUsuarioTreinoDTO;
import com.example.academiaBackend.entity.ExercicioModelo;
import com.example.academiaBackend.entity.ExercicioTreino;
import com.example.academiaBackend.entity.Professor;
import com.example.academiaBackend.entity.Treino;
import com.example.academiaBackend.entity.TreinoModelo;
import com.example.academiaBackend.entity.Usuario;
import com.example.academiaBackend.entity.UsuarioExercicio;
import com.example.academiaBackend.mapper.TreinoMapper;
import com.example.academiaBackend.repository.ExercicioModeloRepository;
import com.example.academiaBackend.repository.ExercicioTreinoRepository;
import com.example.academiaBackend.repository.ProfessorRepository;
import com.example.academiaBackend.repository.TreinoModeloRepository;
import com.example.academiaBackend.repository.TreinoRepository;
import com.example.academiaBackend.repository.UsuarioExercicioRepository;
import com.example.academiaBackend.repository.UsuarioRepository;

@Service
public class VinculacaoService {
	
	@Autowired
    private TreinoRepository treinoRepository;

    @Autowired
    private ExercicioTreinoRepository exercicioTreinoRepository;

    @Autowired
    private ExercicioModeloRepository exercicioModeloRepository;

    @Autowired
    private TreinoModeloRepository treinoModeloRepository;

    @Autowired
    private ProfessorRepository professorRepository;
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private UsuarioExercicioRepository usuarioExercicioRepository;
    
    Logger logger = LoggerFactory.getLogger(getClass());

	public List<DisponivelVinculacaoDTO> listarTodosOsTreino() {
		List<Treino> treinos = treinoRepository.findAll();
		return TreinoMapper.toDisponivelVincularDTOList(treinos);
	}

	@Transactional
	public ResponseEntity<String> salvarModeloTreino(TreinoModeloDTO dto) {
	    try {
	        Optional<Professor> professorOpt = professorRepository.findById(dto.getProfessor());
	        if (professorOpt.isEmpty()) {
	            return ResponseEntity.badRequest().body("Professor não encontrado.");
	        }
	        Professor professor = professorOpt.get();
            // Salva ExercicioModelo
            ExercicioModelo exercicioModelo = salvaExercicioModelo(dto.getNome());
	        for (ExercicioInputDTO exDto : dto.getExercicios()) {
	            Optional<Treino> treinoOpt = treinoRepository.findById(exDto.getId());
	            if (treinoOpt.isEmpty()) {
	                logger.warn("Treino com ID {} não encontrado. Ignorando...", exDto.getId());
	                continue;
	            }
	            Treino treino = treinoOpt.get();
	            // Salva ExercicioTreino
	            ExercicioTreino exercicioTreino = salvaExercicioTreino(treino, exDto);
	            // Salva TreinoModelo
	            salvarTreinoModelo(professor, exercicioTreino, exercicioModelo);
	        }
	        return ResponseEntity.ok("Modelo de treino salvo com sucesso.");
	    } catch (Exception e) {
	        logger.error("Erro ao salvar modelo de treino: {}", e.getMessage(), e);
	        return ResponseEntity.internalServerError().body("Erro ao salvar modelo de treino.");
	    }
	}
	
	private ExercicioTreino salvaExercicioTreino(Treino treino, ExercicioInputDTO exDto) {
	    ExercicioTreino exercicioTreino = new ExercicioTreino();
	    exercicioTreino.setSeries(exDto.getSeries());
	    exercicioTreino.setRepeticoes(exDto.getRepeticoes());
	    exercicioTreino.setDiaSemana(exDto.getDia());
	    exercicioTreino.setOrdem(exDto.getOrdem());
	    exercicioTreino.setTreino(treino);
	    return exercicioTreinoRepository.save(exercicioTreino);
	}

	private ExercicioModelo salvaExercicioModelo(String nomeTreino) {
	    ExercicioModelo exercicioModelo = new ExercicioModelo();
	    exercicioModelo.setNome(nomeTreino);
	    return exercicioModeloRepository.save(exercicioModelo);
	}

	private void salvarTreinoModelo(Professor professor, ExercicioTreino exercicioTreino, ExercicioModelo exercicioModelo) {
	    TreinoModelo treinoModelo = new TreinoModelo();
	    treinoModelo.setProfessor(professor);
	    treinoModelo.setExercicioTreino(exercicioTreino);
	    treinoModelo.setExercicioModelo(exercicioModelo);
	    treinoModeloRepository.save(treinoModelo);
	}

	public List<ConsultaTreinoModeloDTO> consultarModelosDeTreino(Integer idProfessor) {
		return exercicioModeloRepository.buscarNomesExercicioModeloPorProfessor(idProfessor);
	}

	public ResponseEntity<String> vincularUsuarioTreino(VincularUsuarioTreinoDTO vincularUsuarioTreinoDTO) {
		List<TreinoModelo> treinos = treinoModeloRepository.findAllByExercicioModeloId(vincularUsuarioTreinoDTO.getIdModeloTreino());
		ExercicioModelo modelo = exercicioModeloRepository.findById(vincularUsuarioTreinoDTO.getIdModeloTreino().longValue())
				.orElseThrow(() -> new RuntimeException("Modelo não encontrado"));	
		Usuario usuario = usuarioRepository.findById(vincularUsuarioTreinoDTO.getIdUsuario().longValue())
			    .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
		if(treinos.isEmpty()) {
			return ResponseEntity.internalServerError().body("Erro ao salvar modelo de treino ao usuario."); 
		}
		for (TreinoModelo treino: treinos) {
			salvarTreinoDoUsuario(treino, usuario, modelo);
		}
		return ResponseEntity.ok("Modelo de treino vinculado com sucesso.");
	}
	
	public void salvarTreinoDoUsuario(TreinoModelo treino, Usuario usuario, ExercicioModelo modelo) {
		UsuarioExercicio usuarioExercicio = new UsuarioExercicio();
		usuarioExercicio.setConcluido(false);
		usuarioExercicio.setExercicio(treino.getExercicioTreino());
		usuarioExercicio.setProfessor(treino.getProfessor());
		usuarioExercicio.setUsuario(usuario);
		usuarioExercicio.setModelo(modelo);
		usuarioExercicioRepository.save(usuarioExercicio);
	}
	
	public List<ExercicioModelo> listaTodosOsModelosDoUsuario(Integer idUsuario){
		return usuarioExercicioRepository.findAllByUsuarioId(idUsuario.longValue())
			    .stream()
			    .map(UsuarioExercicio::getModelo)
			    .distinct()
			    .collect(Collectors.toList());
	}
}

