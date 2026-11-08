process.loadEnvFile(); // Cargar el archivo .env

import { REST, Routes, ApplicationCommandOptionType } from 'discord.js';

const commands = [
  {
    name: 'play',
    description: 'Reproduce una canción en tu canal de voz',
    options: [
      {
        name: 'cancion',
        description: 'Nombre o enlace de la canción que quieres escuchar',
        type: ApplicationCommandOptionType.String,
        required: true
      }
    ]
  }
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}