import { describe, expect, it } from "vitest";
import { generateID } from "@/services/helpers";

describe('generateID', () => {
    it("should be one if parameter is equal zero", () => {
      expect(generateID(null)).toBe(1);
    });

    it("should be id more onde if have parameter", () => {
     expect(generateID(1)).toBe(2);
    });

    it("should be id eaqual zero should be onde", () => {
        expect(generateID(0)).toBe(1);
    });

})
