import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";
import "@testing-library/jest-dom";

describe("Login Component", () => {
  it("renders email and password inputs", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText(/you@example.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/••••••••/i)).toBeInTheDocument();
  });

  it("has required attributes on inputs", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText(/you@example.com/i)).toBeRequired();
    expect(screen.getByPlaceholderText(/••••••••/i)).toBeRequired();
  });
});
