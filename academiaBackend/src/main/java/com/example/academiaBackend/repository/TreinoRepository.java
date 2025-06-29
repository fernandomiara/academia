package com.example.academiaBackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.academiaBackend.entity.Treino;
@Repository
public interface TreinoRepository extends JpaRepository<Treino, Long>{

}
