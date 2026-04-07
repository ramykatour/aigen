import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';
import ora from 'ora';
import chalk from 'chalk';
import { execaCommand } from 'execa';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function createProject(appName, options, cliOptions) {
  const { provider, framework } = options;
  const targetPath = path.resolve(process.cwd(), appName);

  // Check if directory exists
  if (await fs.pathExists(targetPath)) {
    if (!cliOptions.force) {
      throw new Error(`Directory "${appName}" already exists. Use --force to overwrite.`);
    }
    await fs.remove(targetPath);
  }

  // Create target directory
  const spinner = ora('Creating project directory...').start();
  await fs.ensureDir(targetPath);
  spinner.succeed(chalk.green('Project directory created'));

  // Copy template files
  const templatePath = path.join(__dirname, '..', 'templates', `${framework}-template`);

  if (!(await fs.pathExists(templatePath))) {
    throw new Error(`Template for "${framework}" not found`);
  }

  spinner.start('Copying template files...');
  await fs.copy(templatePath, targetPath);
  spinner.succeed(chalk.green('Template files copied'));

  // Update package.json with app name
  spinner.start('Configuring project...');
  const packageJsonPath = path.join(targetPath, 'package.json');
  const packageJson = await fs.readJson(packageJsonPath);
  packageJson.name = appName;
  await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });

  // Create .env file based on provider
  await createEnvFile(targetPath, provider);

  spinner.succeed(chalk.green('Project configured'));

  // Show provider-specific setup info
  console.log(chalk.cyan('\n📝 Provider Setup:'));
  console.log(getProviderSetupInfo(provider));
}

async function createEnvFile(targetPath, provider) {
  const envContent = getEnvContent(provider);
  await fs.writeFile(path.join(targetPath, '.env'), envContent);
  await fs.writeFile(path.join(targetPath, '.env.example'), envContent);
}

function getEnvContent(provider) {
  switch (provider) {
    case 'groq':
      return `# Groq API Configuration
# Get your API key from: https://console.groq.com/keys
GROQ_API_KEY=your_api_key_here

# Optional: System prompt for the AI
SYSTEM_PROMPT=You are a helpful AI assistant.
`;
    case 'huggingface':
      return `# HuggingFace API Configuration
# Get your API key from: https://huggingface.co/settings/tokens
HUGGINGFACE_API_KEY=your_api_key_here

# Model to use
MODEL=mistralai/Mistral-7B-Instruct-v0.2

# Optional: System prompt for the AI
SYSTEM_PROMPT=You are a helpful AI assistant.
`;
    case 'togetherai':
      return `# TogetherAI API Configuration
# Get your API key from: https://api.together.xyz/settings/api-keys
TOGETHERAI_API_KEY=your_api_key_here

# Model to use
MODEL=mistralai/Mixtral-8x7B-Instruct-v0.1

# Optional: System prompt for the AI
SYSTEM_PROMPT=You are a helpful AI assistant.
`;
    default:
      return '';
  }
}

function getProviderSetupInfo(provider) {
  switch (provider) {
    case 'groq':
      return chalk.white(`
  1. Get your API key from: ${chalk.cyan('https://console.groq.com/keys')}
  2. Add it to your ${chalk.cyan('.env')} file: ${chalk.yellow('GROQ_API_KEY=your_key')}
      `);
    case 'huggingface':
      return chalk.white(`
  1. Get your API key from: ${chalk.cyan('https://huggingface.co/settings/tokens')}
  2. Add it to your ${chalk.cyan('.env')} file: ${chalk.yellow('HUGGINGFACE_API_KEY=your_key')}
      `);
    case 'togetherai':
      return chalk.white(`
  1. Get your API key from: ${chalk.cyan('https://api.together.xyz/settings/api-keys')}
  2. Add it to your ${chalk.cyan('.env')} file: ${chalk.yellow('TOGETHERAI_API_KEY=your_key')}
      `);
    default:
      return '';
  }
}
