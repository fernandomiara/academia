package com.example.academiaBackend.mapper;

import java.util.List;
import java.util.stream.Collectors;

import com.example.academiaBackend.dto.UsuarioDTO;
import com.example.academiaBackend.entity.Usuario;

public class UsuarioMapper {

	 public static UsuarioDTO toUsuarioDTO(Usuario usuario) {
	        return new UsuarioDTO(
	        	usuario.getId().intValue(),
	        	usuario.getNome(),
	        	usuario.getEmail()
	        );
	 }

	 public static List<UsuarioDTO> toUsuarioDTOList(List<Usuario> usuarios) {
		 	return usuarios.stream()
	                .map(UsuarioMapper::toUsuarioDTO)
	                .collect(Collectors.toList());
	 }
}
