import { describe, it, expect } from "vitest";
import { calculatePercentage, isCorrectAnswer } from "./quizScoring";

describe("calculatePercentage", () => {
  it("calculates 100% for a perfect score", () => {
    expect(calculatePercentage(5, 5)).toBe(100);
  });

  it("calculates 0% for a zero score", () => {
    expect(calculatePercentage(0, 5)).toBe(0);
  });

  it("calculates 50% for half correct", () => {
    expect(calculatePercentage(5, 10)).toBe(50);
  });

  it("rounds to the nearest whole number", () => {
    expect(calculatePercentage(1, 3)).toBe(33);
  });

  it("returns 0 when there are no questions, avoiding division by zero", () => {
    expect(calculatePercentage(0, 0)).toBe(0);
  });
});

describe("isCorrectAnswer", () => {
  it("returns true when selected index matches correct answer", () => {
    expect(isCorrectAnswer(1, 1)).toBe(true);
  });

  it("returns false when selected index does not match", () => {
    expect(isCorrectAnswer(0, 1)).toBe(false);
  });
});