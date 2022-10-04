const loadCSV = require("./load-csv");
const truncate = require("./truncate");
const AWS = require("aws-sdk");

const commandProcessor = async (options) => {
  AWS.config.update({ region: options.awsRegion });
  const ddb = new AWS.DynamoDB({
    apiVersion: "2012-08-10",
    endpoint: options.awsEndpoint,
  });

  if (options.truncate) {
    await truncate(ddb, options.table);
  }

  loadCSV(
    ddb,
    options.table,
    options.file,
    options.separator,
    options.arraySeparator
  );
};

module.exports = commandProcessor;
