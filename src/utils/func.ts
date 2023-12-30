const validSizes = ["S", "M", "L", "XL", "XXL", "XXXL"];
const isValidSize = (size: string) => {
  if (size) {
    console.log("ppppp",size);
    return size && validSizes.includes(size.toUpperCase().trim());
  }
  return false;
};
export { isValidSize, validSizes };
