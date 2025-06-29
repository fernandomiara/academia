package com.example.academiaBackend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class UsuarioExercicio {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@ManyToOne
	@JoinColumn(name = "id_usuario")
	private Usuario usuario;
	
	@ManyToOne
	@JoinColumn(name = "id_professor")
	private Professor professor;
	
	@ManyToOne
	@JoinColumn(name = "id_exercicio")
	private ExercicioTreino exercicio;
	
	@ManyToOne
	@JoinColumn(name = "id_modelo")
	private ExercicioModelo modelo;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public Professor getProfessor() {
		return professor;
	}

	public void setProfessor(Professor professor) {
		this.professor = professor;
	}

	public ExercicioTreino getExercicio() {
		return exercicio;
	}

	public void setExercicio(ExercicioTreino exercicio) {
		this.exercicio = exercicio;
	}
	
	private Boolean concluido;

	public Boolean getConcluido() {
		return concluido;
	}

	public void setConcluido(Boolean concluido) {
		this.concluido = concluido;
	}
	
	public ExercicioModelo getModelo() {
		return modelo;
	}

	public void setModelo(ExercicioModelo modelo) {
		this.modelo = modelo;
	}
}
