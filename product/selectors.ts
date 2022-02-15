import {Variant} from "./types";

import {groupBy} from "~/selectors/group";

export function getVariantsString(variants: Variant[]): string {
  if (!variants?.length) return "";

  return variants
    .map((option) => {
      const groups = groupBy(option.value, ({title}) => title);

      if (!groups?.length) return "";

      return `${option.title}: ${groups
        .map(([title, items]) => `${title}${items.length > 1 ? ` X${items.length}` : ``}`)
        .join(", ")}`;
    })
    .filter(Boolean)
    .join(" - ");
}

export function getVariantsPrice(variants: Variant[]): number {
  if (!variants?.length) return 0;

  return variants?.reduce((total, option) => {
    if (!option.value?.length) return total;

    return total + option.value.reduce((total, option) => total + Number(option.price || 0), 0);
  }, 0);
}

export function getVariantsPriceRange(variants: Variant[] = []): [number, number] {
  // Get prices for all variants
  const prices = variants
    // Get all the prices
    .reduce((prices, variant) => prices.concat(variant.options.map((option) => option.price)), [])
    // Get valid prices
    .filter(Boolean);

  // Return a tuple of min max
  return [Math.min(...prices), Math.max(...prices)];
}
