package com.example.academiaBackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.academiaBackend.entity.TreinoModelo;
import com.example.academiaBackend.repository.TreinoModeloRepository;

import java.util.List;

@Service
public class TreinoModeloService {
	
	@Autowired
    private TreinoModeloRepository repository;

    public TreinoModelo salvar(TreinoModelo treinoModelo) {
        return repository.save(treinoModelo);
    }

    public List<TreinoModelo> listarTodos(Integer idProfessor) {
        return repository.findAllByProfessorId(idProfessor);
    }

    public TreinoModelo buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }
}