#!/usr/bin/env node
/** @format */

import arg from "arg";
import chalk from "chalk";
import { getConfig } from "../src/config/config-mgr.js";
import { start } from "../src/commands/start.js";
import { build } from "../src/commands/build.js"; // Import the build function

try {
  const args = arg({
    "--start": Boolean,
    "--build": Boolean,
  });

  if (args["--start"]) {
    const config = getConfig();
    start(config);
  } else if (args["--build"]) {
    const config = getConfig();
    build(config); // Call the build function
  }
} catch (e) {
  console.log(chalk.yellow(e.message));
  console.log();
  usage();
}

function usage() {
  console.log(`${chalk.whiteBright("tool [CMD]")}`);
  console.log(`${chalk.greenBright("--start")}\tStarts the app`);
  console.log(`${chalk.greenBright("--build")}\tBuilds the app`);
}
