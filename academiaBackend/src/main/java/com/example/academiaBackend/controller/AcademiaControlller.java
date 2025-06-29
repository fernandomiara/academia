package com.example.academiaBackend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.academiaBackend.dto.ExercicioDTO;
import com.example.academiaBackend.entity.Professor;
import com.example.academiaBackend.service.AcademiaService;

@RestController
@RequestMapping("/api/academia")
@CrossOrigin(origins = "*") // permite acesso do app mobile
public class AcademiaControlller {
	
	@Autowired
	private AcademiaService service;
	
	@GetMapping("/professor/{idusuario}")
    public List<Professor> listarTodasAcademiaUsuario(@PathVariable Integer idUsuario) {
        return service.listarTodasAcademiaUsuario(idUsuario);
    }
	
	@GetMapping("/aulas/{idUsuario}/{idProfessor}")
    public Map<Integer, List<ExercicioDTO>> listarTodasAulas(@PathVariable Integer idUsuario, @PathVariable Integer idProfessor) {
        return service.listarTodasAulasUsuario(idUsuario, idProfessor);
    }
}
