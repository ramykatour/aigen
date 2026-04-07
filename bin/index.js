#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import { execa } from 'execa';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';
import { createProject } from '../lib/create-project.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();

program
  .name('aigen')
  .description('A modern CLI tool to scaffold high-performance AI chatbot apps')
  .version('1.0.0');

program
  .command('create <app-name>')
  .description('Create a new AI chatbot app')
  .option('-f, --force', 'Force overwrite existing directory')
  .action(async (appName, options) => {
    try {
      console.log(chalk.cyan.bold('\n✨ Welcome to aigen!\n'));
      console.log(chalk.gray('Building modern AI chatbot apps with ease.\n'));

      // Interactive prompts
      const answers = await inquirer.prompt([
        {
          type: 'list',
          name: 'provider',
          message: 'Select your AI Provider:',
          choices: [
            { name: 'Groq (fastest, recommended)', value: 'groq' },
            { name: 'HuggingFace', value: 'huggingface' },
            { name: 'TogetherAI', value: 'togetherai' }
          ],
          default: 'groq'
        },
        {
          type: 'list',
          name: 'framework',
          message: 'Select Framework:',
          choices: [
            { name: 'Next.js (App Router) - Production Ready', value: 'nextjs' },
            { name: 'Vanilla - Lightweight', value: 'vanilla' }
          ],
          default: 'nextjs'
        }
      ]);

      await createProject(appName, answers, options);

      console.log(chalk.green.bold('\n🎉 Project created successfully!\n'));
      console.log(chalk.cyan('Next steps:\n'));
      console.log(chalk.white(`  cd ${appName}`));
      console.log(chalk.white(`  npm install`));
      console.log(chalk.white(`  npm run dev`));
      console.log(chalk.gray('\nHappy coding! 💻\n'));

    } catch (error) {
      console.error(chalk.red('\n❌ Error:'), error.message);
      process.exit(1);
    }
  });

program.parse();
