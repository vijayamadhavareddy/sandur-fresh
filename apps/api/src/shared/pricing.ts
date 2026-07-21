/** Free delivery when subtotal (paise) is at or above this threshold. */
export const FREE_DELIVERY_THRESHOLD_PAISE = 19900; // ₹199

/** Flat delivery fee in paise when below free threshold. */
export const DELIVERY_FEE_PAISE = 2500; // ₹25

export type PricedLine = {
  price: number;
  mrp: number;
  quantity: number;
};

export const lineTotal = (price: number, quantity: number): number => price * quantity;

export const lineSavings = (price: number, mrp: number, quantity: number): number =>
  Math.max(0, mrp - price) * quantity;

export const cartSubtotal = (lines: ReadonlyArray<PricedLine>): number =>
  lines.reduce((sum, line) => sum + lineTotal(line.price, line.quantity), 0);

export const cartSavings = (lines: ReadonlyArray<PricedLine>): number =>
  lines.reduce((sum, line) => sum + lineSavings(line.price, line.mrp, line.quantity), 0);

export const deliveryFee = (subtotal: number): number =>
  subtotal >= FREE_DELIVERY_THRESHOLD_PAISE ? 0 : DELIVERY_FEE_PAISE;

export const orderTotal = (subtotal: number, fee: number, discount = 0): number =>
  Math.max(0, subtotal + fee - discount);

export const summarizeCart = (lines: ReadonlyArray<PricedLine>) => {
  const subtotal = cartSubtotal(lines);
  const savings = cartSavings(lines);
  const fee = deliveryFee(subtotal);
  const total = orderTotal(subtotal, fee, 0);
  return { subtotal, savings, deliveryFee: fee, discount: 0, total };
};
