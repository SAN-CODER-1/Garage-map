package com.wheelconnect.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wheelconnect.entity.UserEntity;

public interface userrepo extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByEmail(String email);

}