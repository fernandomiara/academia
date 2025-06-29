package com.example.academiaBackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.academiaBackend.dto.UsuarioDTO;
import com.example.academiaBackend.service.UsuarioService;

@RestController
@RequestMapping("/api/usuario")
@CrossOrigin(origins = "*")
public class UsuarioController {
	
	@Autowired
	private UsuarioService service;

	@GetMapping("/findAll")
    public List<UsuarioDTO> listarTodosOsUsuarios() {
        return service.listarTodosOsUsuarios();
    }
	

}
