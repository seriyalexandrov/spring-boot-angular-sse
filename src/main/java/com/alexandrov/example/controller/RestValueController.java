package com.alexandrov.example.controller;

import com.alexandrov.example.domain.Value;
import com.alexandrov.example.service.ValueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/rest/values")
public class RestValueController {
    private ValueRepository valueRepository;

    private final List<SseEmitter> sseEmitters = Collections.synchronizedList(new ArrayList<>());

    @Autowired
    public RestValueController(ValueRepository valueRepository) {
        this.valueRepository = valueRepository;
    }

    @PostMapping
    public Value create(@RequestBody @Valid Value value) {
        Value tempValue = this.valueRepository.save(value);
        synchronized (this.sseEmitters) {
            for (SseEmitter sseEmitter : this.sseEmitters) {
                try {
                    sseEmitter.send("created", MediaType.APPLICATION_JSON);
                    sseEmitter.complete();
                } catch (Exception e) {
                    //???
                }
            }
        }
        return tempValue;
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Value> list() {
        return this.valueRepository.findAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Value get(@PathVariable("id") long id) {
        return this.valueRepository.findOne(id);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public Value update(@PathVariable("id") long id, @RequestBody @Valid Value value) {
        return valueRepository.save(value);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Boolean> delete(@PathVariable("id") long id) {
        this.valueRepository.delete(id);
        return new ResponseEntity<>(Boolean.TRUE, HttpStatus.OK);
    }

    @GetMapping(value = "subscribe")
    public SseEmitter subscribe() {
        SseEmitter sseEmitter = new SseEmitter();
        synchronized (this.sseEmitters) {
            this.sseEmitters.add(sseEmitter);
            sseEmitter.onCompletion(() -> {
                synchronized (this.sseEmitters) {
                    this.sseEmitters.remove(sseEmitter);
                }
            });
            sseEmitter.onTimeout(sseEmitter::complete);
        }
        return sseEmitter;
    }
}
