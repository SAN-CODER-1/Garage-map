package com.wheelconnect.controller;

import com.wheelconnect.entity.Booking;
import com.wheelconnect.repositories.BookingRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    private final BookingRepository bookingRepository;

    public BookingController(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    // Assign employee
    @PutMapping("/{bookingId}/assign")
    public Booking assignEmployee(
            @PathVariable Long bookingId,
            @RequestParam Long employeeId) {

        Booking booking = bookingRepository.findById(bookingId).orElseThrow();
        booking.setEmployeeId(employeeId);

        return bookingRepository.save(booking);
    }

    // Create booking (includes vehicle details automatically)
    @PostMapping
    public Booking createBooking(@RequestBody Booking booking) {
        return bookingRepository.save(booking);
    }

    // Get all bookings
    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    // Get bookings by user
    @GetMapping("/user/{userId}")
    public List<Booking> getUserBookings(@PathVariable Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    // Update booking status
    @PutMapping("/{id}/status")
    public Booking updateStatus(@PathVariable Long id, @RequestParam String status) {
        Booking booking = bookingRepository.findById(id).orElseThrow();
        booking.setBookingStatus(status);
        return bookingRepository.save(booking);
    }

    // ✅ Update vehicle details separately
    @PutMapping("/{id}/vehicle")
    public Booking updateVehicleDetails(
            @PathVariable Long id,
            @RequestParam String vehicleName,
            @RequestParam String vehicleModel,
            @RequestParam String vehicleType) {

        Booking booking = bookingRepository.findById(id).orElseThrow();

        booking.setVehicleName(vehicleName);
        booking.setVehicleModel(vehicleModel);
        booking.setVehicleType(vehicleType);

        return bookingRepository.save(booking);
    }

    // Delete booking
    @DeleteMapping("/{id}")
    public void deleteBooking(@PathVariable Long id) {
        bookingRepository.deleteById(id);
    }
}