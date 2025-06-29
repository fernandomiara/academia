package com.example.academiaBackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.academiaBackend.entity.Professor;

@Repository
public interface ProfessorRepository extends JpaRepository<Professor, Long> {

	@Query("SELECT DISTINCT ue.professor  FROM UsuarioExercicio ue  WHERE ue.usuario.id = :idUsuario")
	List<Professor> listarTodasAcademiaUsuario(@Param("idUsuario") Integer idUsuario);

}
