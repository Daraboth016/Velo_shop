import { describe, expect, it } from "vitest";
import {
  DEFAULT_DISCOVERY_FILTERS,
  filterAndSortProducts,
  toggleComparisonProduct,
} from "./productDiscovery";

const products = [
  { id: 1, name: "Shimano XT Groupset", brand: "Shimano", category: "Drivetrain", price: 489, rating: 4.9 },
  { id: 2, name: "SRAM Code Brakes", brand: "SRAM", category: "Brakes", price: 329, rating: 4.8 },
  { id: 3, name: "Dura-Ace Wheels", brand: "Shimano", category: "Wheels", price: 1299, rating: 5 },
  { id: 4, name: "FSA Handlebar", brand: "FSA", category: "Cockpit", price: 289, rating: 4.6 },
];

describe("filterAndSortProducts", () => {
  it("searches across product name, brand, and category", () => {
    expect(filterAndSortProducts(products, { ...DEFAULT_DISCOVERY_FILTERS, query: "sram" })).toHaveLength(1);
    expect(filterAndSortProducts(products, { ...DEFAULT_DISCOVERY_FILTERS, query: "wheels" })[0].id).toBe(3);
  });

  it("combines category and price filters", () => {
    const results = filterAndSortProducts(products, {
      ...DEFAULT_DISCOVERY_FILTERS,
      category: "Drivetrain",
      minPrice: "400",
      maxPrice: "500",
    });
    expect(results.map((product) => product.id)).toEqual([1]);
  });

  it("sorts by price and rating without mutating the source", () => {
    const results = filterAndSortProducts(products, { ...DEFAULT_DISCOVERY_FILTERS, sortBy: "price-desc" });
    expect(results.map((product) => product.id)).toEqual([3, 1, 2, 4]);
    expect(products.map((product) => product.id)).toEqual([1, 2, 3, 4]);
  });
});

describe("toggleComparisonProduct", () => {
  it("adds and removes products while enforcing a three-product limit", () => {
    const selected = products.slice(0, 3);
    expect(toggleComparisonProduct(selected, products[3])).toEqual(selected);
    expect(toggleComparisonProduct(selected, products[1]).map((product) => product.id)).toEqual([1, 3]);
    expect(toggleComparisonProduct(selected.slice(0, 2), products[2]).map((product) => product.id)).toEqual([1, 2, 3]);
  });
});
