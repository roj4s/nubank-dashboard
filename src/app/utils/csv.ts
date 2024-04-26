export const csvStrToArray = (str: string) => {
  const csvHeader = str.slice(0, str.indexOf("\n")).split(",");
  const csvRows = str.slice(str.indexOf("\n") + 1).split("\n");

  const array = csvRows.map((i) => {
    const values = i.split(",");
    const obj = csvHeader.reduce(
      (object: { [k: string]: any }, header, index) => {
        object[header] = values[index];
        return object;
      },
      {}
    );
    return obj;
  });

  return array;
};
