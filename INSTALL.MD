# Initial Setup

## Cloning and spinning container up

```
git clone https://github.com/dudanogueira/rocketchat-botpress-lab-bot.git mycoolbot
cd mycoolbot
docker compose up
```

## Register Workspace
- Acess Rocket.Chat at http://localhost:3000
- Register the workspace
- Syncronize and Login with Rocket.Chat Cloud,


## Configure Botpress
- http://localhost:3001
- configure botpress with admin username
- [download](https://github.com/dudanogueira/rocketchat-botpress-lab-bot/raw/main/bot_lab.tgz) and import bot from the rocketlab demo bot, using the bot id as "lab"
- click on the bot
- Click on train Chatbot (bottom right)

## Create a bot and agent user and install Botpress Connector

- create bot in Admin > Users, and apply the roles: bot, user, livechat-agent and livechat-manager
- create agent1 in Admin > Users, and apply the roles: user and livechat-agent
- Install [Botpress Conector from Luis Hlatki](https://github.com/hlatki01/botpress-connector) in Admin > Apps > search bot botpress
- Configure the Botpress Connector in Admin > Apps > Installed > Botpress Connector > Settings
  - Rocket.Chat bot username: bot
  - Botpress bot id: lab
  - Botpress server URL: 
  - Default handover department: GENERAL
-  save the bot configurations

## Configure Omnichannel
- create an omnichannel GENERAL department in Top Left > Omnichannel > Departments with bot as agent, mark it to show at the registration form
- create an omnichannel OTHER department in Top Left > Omnichannel > Departments with agent1 as agent, anb don't mark it to show at the registration form
- edit the agent and the make it available in Top Left > Omnichannel > Agents
- Logout as you user, and log in with the bot user, and create a PAT (Personal Access Token) without 2 Factor Authentication

## Configure Botpress with bot PAT and Department to Transfer
- update botpress with the PAT infos in your bot > Code Editor > Configurations > Current Bot > bot.config.json
- update the transfer room ID (you can get this ID while editing the department in Rocket.Chat) in your bot > Flows > Main Flow > transfer-room node at the set-variable action

## Try it out!
Now, you can talk with your bot in [http://localhost:3000/livechat](http://localhost:3000/livechat)
