package com.example.academiaBackend.dto;

import java.util.List;
import java.util.Map;

public class TreinoModeloDTO {
    private String nome; // Nome do treino
    private Long professor; // ID do professor
    private List<ExercicioInputDTO> exercicios;
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public Long getProfessor() {
		return professor;
	}
	public void setProfessor(Long professor) {
		this.professor = professor;
	}
	public List<ExercicioInputDTO> getExercicios() {
		return exercicios;
	}
	public void setExercicios(List<ExercicioInputDTO> exercicios) {
		this.exercicios = exercicios;
	}

}
