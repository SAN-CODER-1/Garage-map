import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import axios from "axios";
import GarageDashboard from "./GarageDashboard";

vi.mock("axios");

describe("GarageDashboard Component", () => {
  it("shows loading state initially", async () => {
    axios.get.mockReturnValue(new Promise(() => {}));
    render(<GarageDashboard />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it("renders dashboard data after successful API calls", async () => {
    axios.get.mockImplementation((url) => {
      if (url.includes("/auth/users/me")) {
        return Promise.resolve({ data: { id: 1, username: 'testowner', role: 'GARAGE_OWNER' } });
      }
      if (url.includes("/api/garages/owner")) {
        return Promise.resolve({ data: { garageName: 'My Test Garage', address: '123 Test St', garageType: 'Repair', yearsOfService: 5 } });
      }
      if (url.includes("/api/employees/garage/1")) {
        return Promise.resolve({ data: [{ id: 101, employeeName: 'John Doe', experienceYears: 3, specialization: 'Engine', availabilityStatus: 'Available' }] });
      }
      if (url.includes("/bookings")) {
        return Promise.resolve({ data: [{ id: 201, userId: 99, bookingStatus: 'PENDING' }] });
      }
      return Promise.reject(new Error("Unknown URL"));
    });

    render(<GarageDashboard />);

    await waitFor(() => {
      expect(screen.getByText(/My Test Garage/i)).toBeInTheDocument();
      expect(screen.getAllByText(/John Doe/i)[0]).toBeInTheDocument();
      expect(screen.getByText(/201/i)).toBeInTheDocument();
    });
  });
});
