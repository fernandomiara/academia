package com.example.academiaBackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.academiaBackend.dto.ConsultaTreinoModeloDTO;
import com.example.academiaBackend.entity.ExercicioModelo;
@Repository
public interface ExercicioModeloRepository extends JpaRepository<ExercicioModelo, Long>{

	@Query("SELECT DISTINCT new com.example.academiaBackend.dto.ConsultaTreinoModeloDTO(em.id, em.nome) " +
		       "FROM TreinoModelo tm " +
		       "JOIN tm.exercicioModelo em " +
		       "WHERE tm.professor.id = :professorId")
    List<ConsultaTreinoModeloDTO> buscarNomesExercicioModeloPorProfessor(@Param("professorId") Integer idProfessor);
	
}
