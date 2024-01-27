var { RconClient } = require("rconify");

class Interface {
  constructor(rconPort, rconIP, adminPassword) {
    this.rconIP = rconIP;
    this.rconPort = rconPort;
    this.adminPassword = adminPassword;
  }

  async rconSend(sendToRcon) {
    const client = new RconClient({
      host: this.rconIP,
      port: this.rconPort,
      password: this.adminPassword,
    });

    try {
      await client.connect();
    } catch (err) {
      console.log(err);
    }

    let response = await client.sendCommand(sendToRcon);

    client.disconnect();

    return response;
  }

  async shutdown(seconds, messageText) {
    await this.rconSend(`shutdown ${seconds} ${messageText}`);
  }
  async doExit() {
    await this.rconSend(`doexit`);
  }
  async broadcast(messageText) {
    await this.rconSend(`broadcast ${messageText}`);
  }
  async kickPlayer(steamId) {
    await this.rconSend(`kickplayer ${steamId}`);
  }
  async banPlayer(steamId) {
    await this.rconSend(`banplayer ${steamId}`);
  }
  async unbanPlayer(steamId) {
    console.log(`nonfunctional command: ` + steamId);
  }
  /*
  teleportToPlayer(steamId) {
    await this.rconSend(`teleportToPlayer ${steamId}`);
  };
  teleportToMe(steamId) {
    await this.rconSend(`teleportToMe ${steamId}`);
  };*/

  async showPlayers() {
    let response = await this.rconSend(`showplayers`);
    response = response.split("\n");

    let len = response.length;

    response = response.toString().split(",");

    let list = [];

    for (let i = 1; i < len * 3; i++) {
      if (i % 3 == 0 && response[i] != "") {
        list.push(response[i]);
      }
    }

    return list;
  }
  async info() {
    return await this.rconSend(`info`);
  }
  async save() {
    await this.rconSend(`save`);
  }
}

module.exports = Interface;
