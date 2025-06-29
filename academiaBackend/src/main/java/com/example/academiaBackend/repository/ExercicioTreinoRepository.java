package com.example.academiaBackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.academiaBackend.entity.ExercicioTreino;
@Repository
public interface ExercicioTreinoRepository extends JpaRepository<ExercicioTreino, Long> {

}
