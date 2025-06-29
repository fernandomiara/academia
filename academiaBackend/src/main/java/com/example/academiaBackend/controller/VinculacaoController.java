package com.example.academiaBackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.academiaBackend.dto.ConsultaTreinoModeloDTO;
import com.example.academiaBackend.dto.DisponivelVinculacaoDTO;
import com.example.academiaBackend.dto.TreinoModeloDTO;
import com.example.academiaBackend.dto.VincularUsuarioTreinoDTO;
import com.example.academiaBackend.entity.ExercicioModelo;
import com.example.academiaBackend.service.VinculacaoService;

@RestController
@RequestMapping("/api/vincular")
@CrossOrigin(origins = "*")
public class VinculacaoController {
	
	@Autowired
	private VinculacaoService service;

	@GetMapping("/findAll")
    public List<DisponivelVinculacaoDTO> listarTodosOsTreino() {
        return service.listarTodosOsTreino();
    }
	
	@PostMapping("/criarModelo")
    public ResponseEntity<String> salvarModeloTreino(@RequestBody TreinoModeloDTO dto){
		return service.salvarModeloTreino(dto);
	}
	
	@GetMapping("/consultaModelos/{idProfessor}")
	public List<ConsultaTreinoModeloDTO> consultarModelosDeTreino(@PathVariable Integer idProfessor){
		return service.consultarModelosDeTreino(idProfessor);
	}
	
	@PostMapping("/vincularUsuarioTreino")
    public ResponseEntity<String> vincularUsuarioTreino(@RequestBody VincularUsuarioTreinoDTO vincularUsuarioTreinoDTO) {
        return service.vincularUsuarioTreino(vincularUsuarioTreinoDTO);
    }
	
	@GetMapping("/consultaModelosUsuario/{idUsuario}")
	public List<ExercicioModelo> listaTodosOsModelosDoUsuario(@PathVariable Integer idUsuario){
		return service.listaTodosOsModelosDoUsuario(idUsuario);
	}
}
