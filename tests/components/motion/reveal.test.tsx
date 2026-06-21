import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Reveal } from "@/components/motion/reveal";

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => []);
  root = null;
  rootMargin = "";
  thresholds = [];
}

describe("Reveal", () => {
  beforeEach(() => {
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
  });

  it("renders children", () => {
    render(<Reveal>hello</Reveal>);
    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  it("starts hidden (opacity 0) until observed", () => {
    const { container } = render(<Reveal>content</Reveal>);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.opacity).toBe("0");
  });

  it("respects prefers-reduced-motion by showing immediately", () => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockReturnValue({
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    );
    const { container } = render(<Reveal>no motion</Reveal>);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.opacity).toBe("1");
  });
});
