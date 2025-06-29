package com.example.academiaBackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.academiaBackend.entity.UsuarioExercicio;

@Repository
public interface UsuarioExercicioRepository extends JpaRepository<UsuarioExercicio, Long> {

	List<UsuarioExercicio> findByUsuarioIdAndProfessorId(Integer idUsuario, Integer idProfessor);
	
	List<UsuarioExercicio> findAllByUsuarioId(Long idUsuario);
}