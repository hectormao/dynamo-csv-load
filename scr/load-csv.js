const { parse } = require("csv-parse");
const fs = require("fs");
const { PassThrough, Transform } = require("stream");
const through2 = require("through2");
const csvToPutItem = require("./csv-translator");
const AWS = require("aws-sdk");

const Separators = {
  TAB: "\t",
  ESP: " ",
};

const loadCSV = (table, file, separator, url, arraySeparator, awsRegion) => {
  AWS.config.update({ region: awsRegion });

  const ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10", endpoint: url });

  const separatorChar = Separators[separator] || separator;
  const as = Separators[arraySeparator] || arraySeparator;

  const putItemTransform = through2(
    { objectMode: true },
    function (chunk, enc, callback) {
      const putItem = csvToPutItem(chunk, as);
      this.push(JSON.stringify(putItem));
      callback();
    }
  );

  const parser = parse({ delimiter: separatorChar, columns: true });
  fs.createReadStream(file)
    .pipe(parser)
    .pipe(putItemTransform)
    .pipe(
      through2({ objectMode: true }, function (chunk, enc, callback) {
        const item = JSON.parse(chunk);

        const params = {
          TableName: table,
          Item: item,
        };
        console.debug(`Putting data ... ${JSON.stringify(params)}`);
        ddb.putItem(params, function (err, data) {
          if (err) {
            console.error(err);
          } else {
            console.log("Success Put Item ...");
          }
          callback();
        });
      })
    );
};

module.exports = loadCSV;
