export const convertPrice = (price) => {
    if (!price) return "Q0.00";
    const newPrice = price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
    return `Q${newPrice}`;
};
