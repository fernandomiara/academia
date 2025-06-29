package com.example.academiaBackend.entity;

import jakarta.persistence.*;
import java.util.List;
import java.util.ArrayList;

@Entity
public class TreinoModelo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

	@ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_exercicio")
    private ExercicioTreino exercicioTreino;
    
	@ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_professor")
    private Professor professor;
	
	@ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_exercicio_modelo")
    private ExercicioModelo exercicioModelo;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Professor getProfessor() {
		return professor;
	}

	public void setProfessor(Professor professor) {
		this.professor = professor;
	}

	public ExercicioTreino getExercicioTreino() {
		return exercicioTreino;
	}

	public void setExercicioTreino(ExercicioTreino exercicioTreino) {
		this.exercicioTreino = exercicioTreino;
	}

	public ExercicioModelo getExercicioModelo() {
		return exercicioModelo;
	}

	public void setExercicioModelo(ExercicioModelo exercicioModelo) {
		this.exercicioModelo = exercicioModelo;
	}   
}