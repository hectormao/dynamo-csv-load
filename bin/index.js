#!/usr/bin/env node

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const loadCSV = require("../scr/load-csv");

const options = yargs(hideBin(process.argv))
  .usage(
    "Usage: $0 -t <table-name> -f <path> -s <separator-char> -as <array-separator> -a <aws-url> -r <aws-region>"
  )
  .option("table", {
    alias: "t",
    describe: "DynamoDB Table Name",
    type: "string",
    demandOption: true,
  })
  .option("file", {
    alias: "f",
    describe: "path to csv file",
    type: "string",
    demandOption: true,
  })
  .option("separator", {
    alias: "s",
    describe: "csv separator char",
    type: "string",
    demandOption: true,
  })
  .option("array-separator", {
    alias: "as",
    describe:
      "(Optional) Array Separator char, only used when type is SS, default value: ESP",
    type: "string",
    demandOption: false,
    default: "ESP",
  })
  .option("aws-endpoint", {
    alias: "a",
    describe:
      "(Optional) aws environment endpoint url, only use when you try to connect to local environment",
    type: "string",
    demandOption: false,
  })
  .option("aws-region", {
    alias: "r",
    describe: "(Optional) aws region, default: us-east-1",
    type: "string",
    demandOption: false,
    default: "us-east-1",
  })
  .help().argv;

loadCSV(
  options.table,
  options.file,
  options.separator,
  options.awsEndpoint,
  options.arraySeparator,
  options.awsRegion
);
