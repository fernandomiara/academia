package com.example.academiaBackend.mapper;
import java.util.List;
import java.util.stream.Collectors;

import com.example.academiaBackend.dto.DisponivelVinculacaoDTO;
import com.example.academiaBackend.entity.Treino;

public class TreinoMapper {

    public static DisponivelVinculacaoDTO toDisponivelVincularDTO(Treino treino) {
        return new DisponivelVinculacaoDTO(
            treino.getId().intValue(),
            treino.getNome(),
            treino.getGrupoMuscular()
        );
    }

    public static List<DisponivelVinculacaoDTO> toDisponivelVincularDTOList(List<Treino> treinos) {
        return treinos.stream()
                .map(TreinoMapper::toDisponivelVincularDTO)
                .collect(Collectors.toList());
    }
}
