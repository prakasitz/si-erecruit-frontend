const fs = require('fs')
const dotenv = require('dotenv')

// Load the .env.local file and its contents into process.env
const envLocal = dotenv.config({ path: '.env.local' }).parsed

// Read the content of .env.example
const envExampleContent = fs.readFileSync('.env.example', 'utf8')

// Replace the values in .env.example with empty strings
const updatedEnvExampleContent = Object.entries(envLocal).reduce(
    (content, [key]) => content.replace(new RegExp(`${key}=.*`), `${key}=`),
    envExampleContent
)

// Write the updated content to .env.example
fs.writeFileSync('.env.example', updatedEnvExampleContent)

console.log('env.example file has been updated with empty values.')
