package com.wheelconnect.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wheelconnect.entity.Booking;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByUserId(Long userId);

    List<Booking> findByGarageId(Long garageId);

    List<Booking> findByBookingStatus(String bookingStatus);

}