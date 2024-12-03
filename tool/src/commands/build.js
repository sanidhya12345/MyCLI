#!/usr/bin/env node
/** @format */

import chalk from "chalk";
import fs from "fs";
import path from "path";

// Get current directory using import.meta.url and resolve the path correctly
const dirname = path.dirname("E:/MyCLI/tool/src");
console.log(dirname);

export function build(config) {
  console.log(chalk.bgGreenBright("  Building the app  "));
  console.log(chalk.gray("Using configuration -"), config);
  // Define the source and destination directories with clear variable names
  const sourceDir = path.resolve(dirname, "/MyCLI/tool/src/commands");
  const outputDir = path.resolve(dirname, "/MyCLI/tool/dist"); // Use "dist" instead of "src/dist"
  // Check if the output directory exists, and create it if not
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(chalk.green(`Created output directory at ${outputDir}`));
  }
  // Example: Copy JavaScript files from source to output directory
  const filesToCopy = fs
    .readdirSync(sourceDir)
    .filter((file) => file.endsWith(".js"));
  filesToCopy.forEach((file) => {
    const sourceFile = path.join(sourceDir, file);
    const destinationFile = path.join(outputDir, file);
    fs.copyFileSync(sourceFile, destinationFile);
    console.log(chalk.green(`Copied ${file} to ${outputDir}`));
  });
  console.log(chalk.bgGreenBright("Build completed successfully!"));
}
