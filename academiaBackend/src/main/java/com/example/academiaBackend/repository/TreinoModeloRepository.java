package com.example.academiaBackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.academiaBackend.entity.TreinoModelo;

@Repository
public interface TreinoModeloRepository extends JpaRepository<TreinoModelo, Long> {

	List<TreinoModelo> findAllByProfessorId(Integer idProfessor);
	
	List<TreinoModelo> findAllByExercicioModeloId(Integer idExercicioModelo);
}