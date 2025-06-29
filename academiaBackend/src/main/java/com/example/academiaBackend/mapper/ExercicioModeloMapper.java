package com.example.academiaBackend.mapper;

import java.util.List;
import java.util.stream.Collectors;

import com.example.academiaBackend.dto.ConsultaTreinoModeloDTO;
import com.example.academiaBackend.entity.ExercicioModelo;

public class ExercicioModeloMapper {
	
    public static ConsultaTreinoModeloDTO toConsultaTreinoModeloDTO(ExercicioModelo exercicioModelo) {
        return new ConsultaTreinoModeloDTO(
        	exercicioModelo.getId(),
        	exercicioModelo.getNome()
        );
    }

    public static List<ConsultaTreinoModeloDTO> toDisponivelVincularDTOList(List<ExercicioModelo> exercicioModelo) {
        return exercicioModelo.stream()
                .map(ExercicioModeloMapper::toConsultaTreinoModeloDTO)
                .collect(Collectors.toList());
    }

}
