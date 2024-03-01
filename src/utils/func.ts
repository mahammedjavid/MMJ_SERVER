const validSizes = ["S", "M", "L", "XL", "XXL", "XXXL"];
const cartValidParameter = ['add','remove']
const isValidSize = (size: string) => {
  if (size) {
    console.log("ppppp",size);
    return size && validSizes.includes(size.toUpperCase().trim());
  }
  return false;
};
const checkCartParameter = (param:string)=> {
  if (param) {
    return param && cartValidParameter.includes(param);
  }
  return false;
}
export { isValidSize, validSizes , checkCartParameter };
