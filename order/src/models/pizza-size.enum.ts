export enum PizzaSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export const pizzaSizeMultiplier: {[size in PizzaSize]: number} = {
  [PizzaSize.Small]: (2 / 3),
  [PizzaSize.Medium]: 1,
  [PizzaSize.Large]: (4 / 3),
};
