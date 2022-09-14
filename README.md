# DYNAMODB CSV LOAD

Command line javascript application to load a CSV file into DynamoDB Table

This app use `aws-sdk` and the operation `put-item`, please take care into DynamoDB write restrictions restrictions, these can cause some errors in the load process.

## CSV File Format

The first line of the file (csv title) must have the names of the fiels and theirs dyanmodb data types using the format `<field-name>:<dynamodb-data-type>`. ie:

```csv
bankId:S	accountTypeId:S	allowed:BOOL	masks:SS
"4"	"1"	true	###-#######-#-## ###-#######
"4"	"2"	true	###-########-#-## ##-######## ########
"8"	"1"	true	###-#########-#
"8"	"2"	true	###-#########-#
```

where:

- bankId:S: means, field name: `bankId` data type: `S`(string)

### Supproted Data Types

- S: String
- BOOL: Boolean
- N: Number
- SS: Set String - this field uses the `-as` option to set the character to split the string into an array

## Install

```bash
  npm i -g dynamo-csv-load
```

## Use

```bash
Usage:  -t <table-name> -f <path> -s <separator-char> -as <array-separator> -a
<aws-url> -r <aws-region>

Options:
      --version                Show version number                     [boolean]
  -t, --table                  DynamoDB Table Name           [string] [required]
  -f, --file                   path to csv file              [string] [required]
  -s, --separator              csv separator char            [string] [required]
      --array-separator, --as  (Optional) Array Separator char, only used when
                               type is SS, default value: ESP
                                                       [string] [default: "ESP"]
  -a, --aws-endpoint           (Optional) aws environment endpoint url, only use
                               when you try to connect to local environment
                                                                        [string]
  -r, --aws-region             (Optional) aws region, default: us-east-1
                                                 [string] [default: "us-east-1"]
      --help                   Show help                               [boolean]
```

### Example

```bash
dynamo-csv-load -t MyTable -f ./my_csv_source_file.csv -s TAB --as ESP -r us-east-1 -a http://localhost:4566
```

where:

- -t: Name of the DynamoDB table
- -f: Path to csv file
- -s: Field separator character, use the words TAB for tab character or ESP for espace character
- --as: array (SS) separator character, use the words TAB for tab character or ESP for espace character
- -r: AWS Region
- -a: AWS endpoint, only use when you connect to localstack or local DynamoDB
