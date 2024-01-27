
<h1 align="center">
  <br>
  PalBot
  <br>
</h1>

<h4 align="center">Discord bot to interface with a PalWorld server via RCON! Written in discord.js</h4>

<p align="center">
  <a href="https://www.gnu.org/licenses/gpl-3.0">
    <img alt="GPLv3 License" src="https://img.shields.io/badge/License-GPLv3-blue.svg">
  </a>
  <a href="https://www.npmjs.com/package/discord.js">
    <img src="https://img.shields.io/node/v/discord.js.svg">
  </a>
  <a href="https://www.npmjs.com/package/discord.js">
    <img src="https://img.shields.io/npm/v/discord.js.svg">
  </a>
</p>
<p align="center">
  <a href="https://github.com/discordjs/discord.js">
     <img src="https://img.shields.io/badge/discord-js-blue.svg" alt="discord.js">
  </a>
  <a href="http://makeapullrequest.com">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg">
  </a>
  <a href="https://gitmoji.dev">
  <img
    src="https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square"
    alt="Gitmoji"
  />
</a>
</p>

# Overview

PalBot is a self-hosted bot that interfaces with a PalWorld Dedicated Server using RCON (Remote Console), this allows you to use [admin console commands](https://tech.palworldgame.com/server-commands) over discord.

# Usage

## Requirements

Palbot requires [npm](https://www.npmjs.com/) and uses node.js (>= v16.11.0), and is designed for ease of use.

Run ``node -v``, if the version is above ``v16.11.0`` then you are all set!

## Installation

Clone the repo with ``git clone``, open the folder you cloned it to and run ``npm install --force`` to install all dependencies.

## Setup

To input your Discord developer token, and other important info for the bot, create a ``.env`` file in the root folder of the project.

The following is an example of the information necessary in the file for the bot to function:

```.env
TOKEN="DISCORD-TOKEN-HERE"

CLIENT_ID="DISCORD-BOT-CLIENT-ID-HERE"

ADMIN_PASSWORD="PALWORLD SERVER ADMIN PASSWORD"

RCON_PORT=12345  #This must be an integer, everything else is strings!

RCON_IP="0.0.0.0"
```


### Running the bot

You can run the bot using ``node .``, to refresh the commands after editing, run ``node deploy-commands.js``<br>

### Command customization

To customize the messages the bot sends, you may create a ``command-overrides.json`` file in the root folder, or rename ``command-overrides-empty.json``. **Every string in this file is nullable, and will revert to default if left empty or non-existent.**

While not as streamlined of a process, you may add any ``{command}.js`` file to any sub-folder in the the ``commands`` folder, and it will automatically be deployed along with the other commands, with no tweaking of the base code.

(*``interface.js`` is an object included along with this that may be used to send rcon commands, and could be repurposed if you wish!*)

# Planned Features

- Fixing the */unban* command, which is not supported by PalWorld directly.
- Tool to generate commands and subsequent JSON entries, allowing for modularity.
- Expand on the ``interface.js`` file, allowing for more interaction with server.
- Default command text localization into other languages

# License

This project is licensed under GPL-3.0-or-later!
