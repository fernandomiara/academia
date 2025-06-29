package com.example.academiaBackend.dto;
public class ExercicioDTO {

    private String titulo;
    private Integer repeticao;
    private Integer serie;
    private Boolean concluido;

    public ExercicioDTO() {
    }

    public ExercicioDTO(String titulo, Integer repeticao, Integer quantidade, Boolean concluido) {
        this.titulo = titulo;
        this.repeticao = repeticao;
        this.setSerie(quantidade);
        this.concluido = concluido;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public Integer getRepeticao() {
        return repeticao;
    }

    public void setRepeticao(Integer repeticao) {
        this.repeticao = repeticao;
    }

    public Boolean getConcluido() {
        return concluido;
    }

    public void setConcluido(Boolean concluido) {
        this.concluido = concluido;
    }

	public Integer getSerie() {
		return serie;
	}

	public void setSerie(Integer serie) {
		this.serie = serie;
	}
}
