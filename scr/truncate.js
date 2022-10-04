const getKeys = async (ddb, table) => {
  const params = {
    TableName: table,
  };

  const tableDescription = await ddb.describeTable(params).promise();
  return tableDescription.Table.KeySchema.map((sch) => sch.AttributeName);
};

const truncate = async (ddb, table) => {
  const keys = await getKeys(ddb, table);
  const params = {
    TableName: table,
  };

  do {
    items = await ddb.scan(params).promise();
    const deletePromises = items.Items.map(async (item) => {
      const keyValues = keys
        .map((key) => ({ [key]: item[key] }))
        .reduce((agg, cur) => ({ ...agg, ...cur }));

      const deleteParam = {
        TableName: table,
        Key: keyValues,
      };
      console.log("Delete Item ...", deleteParam);
      return ddb.deleteItem(deleteParam).promise();
    });
    const deleteResult = await Promise.all(deletePromises);
    console.log("Delete result ...", deleteResult);
    params.ExclusiveStartKey = items.LastEvaluatedKey;
  } while (typeof items.LastEvaluatedKey !== "undefined");
};

module.exports = truncate;
