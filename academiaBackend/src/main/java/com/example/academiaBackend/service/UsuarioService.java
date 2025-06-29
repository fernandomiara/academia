package com.example.academiaBackend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.academiaBackend.dto.UsuarioDTO;
import com.example.academiaBackend.entity.Usuario;
import com.example.academiaBackend.mapper.UsuarioMapper;
import com.example.academiaBackend.repository.UsuarioRepository;

@Service
public class UsuarioService {
	
	@Autowired
	private UsuarioRepository repository;

	public List<UsuarioDTO> listarTodosOsUsuarios() {
		List<Usuario> usuarios = repository.findAll();
		return UsuarioMapper.toUsuarioDTOList(usuarios);
	}

}
