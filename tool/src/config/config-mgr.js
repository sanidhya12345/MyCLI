/** @format */

import chalk from "chalk";
import { cosmiconfigSync } from "cosmiconfig";
import schema from './schema.json' assert { type: 'json' };

import Ajv from "ajv";
import betterAjvErrors from "better-ajv-errors";

const ajv = new Ajv({ jsonPointers: true });

const configLoader = cosmiconfigSync("tool");

export async function getConfig() {
  const result = configLoader.search(process.cwd());
  if (!result) {
    console.log(chalk.yellow("Could not find configuration, using default"));
    return { port: 1234 };
  } else {
    const isValid = ajv.validate(schema, result.config);
    if (!isValid) {
      console.log(chalk.yellow("Invalid configuration was supplied"));
      console.log();
      console.log(betterAjvErrors(schema, result.config, ajv.errors));
      process.exit(1);
    }
    console.log("Found configuration", result.config);
    return result.config;
  }
}
