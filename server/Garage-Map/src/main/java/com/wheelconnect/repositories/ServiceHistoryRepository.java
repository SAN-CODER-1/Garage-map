package com.wheelconnect.repositories;

import com.wheelconnect.entity.ServiceHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ServiceHistoryRepository extends JpaRepository<ServiceHistory, Long> {

    
	Optional<ServiceHistory> findByBookingId(Long bookingId);

}