package com.example.academiaBackend.dto;

public class DisponivelVinculacaoDTO {
	
	private Integer id;
	private String titulo;
	private String Tipo;
	
	public DisponivelVinculacaoDTO(Integer id, String titulo, String tipo) {
		super();
		this.id = id;
		this.titulo = titulo;
		Tipo = tipo;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getTitulo() {
		return titulo;
	}
	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}
	public String getTipo() {
		return Tipo;
	}
	public void setTipo(String tipo) {
		Tipo = tipo;
	}
}
