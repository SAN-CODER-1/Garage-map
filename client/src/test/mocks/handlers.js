import { http, HttpResponse } from 'msw';

export const handlers = [
  // Mock User
  http.get('http://localhost:8080/auth/users/me', () => {
    return HttpResponse.json({ id: 1, username: 'testowner', role: 'GARAGE_OWNER' });
  }),
  // Mock Garage
  http.get('http://localhost:8080/api/garages/owner', () => {
    return HttpResponse.json({ 
        garageName: 'My Test Garage', 
        address: '123 Test St', 
        garageType: 'Repair', 
        yearsOfService: 5 
    });
  }),
  // Mock Employees
  http.get('http://localhost:8080/api/employees/garage/1', () => {
    return HttpResponse.json([{ id: 101, employeeName: 'John Doe', experienceYears: 3, specialization: 'Engine', availabilityStatus: 'Available' }]);
  }),
  // Mock Bookings
  http.get('http://localhost:8080/bookings', () => {
    return HttpResponse.json([{ id: 201, userId: 99, bookingStatus: 'PENDING' }]);
  }),
];
