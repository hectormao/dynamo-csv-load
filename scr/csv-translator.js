const csvToPutItem = (csvObj, arraySeparator) =>
  Object.keys(csvObj)
    .map((key) => {
      const keyData = key.match(/(.*):(.*)/);
      const name = keyData[1];
      const type = keyData[2];
      const value = csvObj[key]
        ? type === "SS"
          ? csvObj[key].split(arraySeparator)
          : type === "BOOL"
          ? csvObj[key] === "true"
          : csvObj[key]
        : undefined;
      return value != null
        ? {
            [name]: {
              [type]: value,
            },
          }
        : undefined;
    })
    .reduce(
      (acc, cur) => ({
        ...acc,
        ...cur,
      }),
      {}
    );

module.exports = csvToPutItem;
