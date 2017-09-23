package com.alexandrov.example.service;


import com.alexandrov.example.domain.Value;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ValueRepository extends CrudRepository<Value, Long> {
	@Override
	List<Value> findAll();
}
