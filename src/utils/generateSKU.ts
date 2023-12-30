function generateNextSequentialID(lastValue: any) {
  const prefix = "MMJ";
  const counter = lastValue ? parseInt(lastValue.substring(3)) + 1 : 0;
  const formattedCounter = counter.toString().padStart(5, "0");
  const id = `${prefix}${formattedCounter}`;
  return id;
}
export default generateNextSequentialID
