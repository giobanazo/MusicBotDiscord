import { Client, Events, GatewayIntentBits } from 'discord.js';
import { joinVoiceChannel } from '@discordjs/voice';

process.loadEnvFile(); // Cargar el archivo .env

const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
  ]
});

client.on(Events.ClientReady, readyClient => {
  console.log(`Logged in as ${readyClient.user.tag}!`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'join') {
    const canalSeleccionado = interaction.options.getChannel('canal');

    const conexion = joinVoiceChannel({
      channelId: canalSeleccionado.id,
      guildId: interaction.guild.id,
      adapterCreator: interaction.guild.voiceAdapterCreator,
    });

    if (conexion) {
      await interaction.reply(canalSeleccionado.name + '  |  ' + canalSeleccionado.id);
    } else {
      await interaction.reply('Error: El bot no se pudo conectar al canal de voz seleccionado');
    }
  }
});

client.login(process.env.DISCORD_TOKEN);