package com.example.academiaBackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.academiaBackend.entity.TreinoModelo;
import com.example.academiaBackend.service.TreinoModeloService;

@RestController
@RequestMapping("/api/treinos-modelo")
@CrossOrigin(origins = "*") // permite acesso do app mobile
public class TreinoModeloController {
	
	@Autowired
    private TreinoModeloService service;

    @PostMapping
    public TreinoModelo criar(@RequestBody TreinoModelo treinoModelo) {
        return service.salvar(treinoModelo);
    }

    @GetMapping("/professor/{idProfessor}")
    public List<TreinoModelo> listarTodos(@PathVariable Integer idProfessor) {
        return service.listarTodos(idProfessor);
    }

    @GetMapping("/{id}")
    public TreinoModelo buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id);
    }
}
