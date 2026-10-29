const products = new Map([
  [1, ["Shimano XT M8100 Groupset", 489]],
  [2, ["SRAM Code RSC Brake Set", 329]],
  [3, ["Shimano SPD-SL PD-R9100 Pedals", 219]],
  [4, ["SRAM XX1 Eagle 12-Speed Cassette", 399]],
  [5, ["Shimano WH-R9200 Dura-Ace Wheelset", 1299]],
  [6, ["RockShox Pike Ultimate Fork", 799]],
  [7, ["Maxxis Minion DHF Tire", 84]],
  [8, ["Campagnolo Super Record Chainset", 669]],
  [9, ["FSA K-Force Carbon Handlebar", 289]],
]);

export const priceCart = (items, shippingMethod) => {
  if (!Array.isArray(items) || items.length === 0 || items.length > 50) {
    throw new Error("Cart is empty or invalid.");
  }
  const lineItems = items.map((item) => {
    const id = Number(item.id);
    const quantity = Number(item.qty);
    const product = products.get(id);
    if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
      throw new Error("Cart contains an invalid product or quantity.");
    }
    return { id, name: product[0], price: product[1], quantity };
  });
  const subtotal = lineItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = shippingMethod === "express" ? 18 : subtotal >= 150 ? 0 : 8;
  return { lineItems, subtotal, shipping, total: subtotal + shipping };
};
