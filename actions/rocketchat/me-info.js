  /**
   * Me Info - Get "me" (user/bot) information from Rocket.Chat
   * @title Get "Me" Info
   * @category RocketChat
   * @author Duda Nogueira <duda.nogueira@rocket.chat>
   * @param {string} [default_bot_name="Sir Hamster III"] a Default bot name to use
   */

  const axios = require('axios')

  const myAction = async (name, value) => {
    const globalConfig = await bp.config.getBotpressConfig()
    const botConfig = await bp.config.mergeBotConfig(event.botId, globalConfig)
    bp.logger.info('ROCKETCHAT:ME INFO')

    const options = {
      method: 'GET',
      url: botConfig['rocketchat_url'] + '/api/v1/me',
      headers: {
        'X-Auth-Token': botConfig['rocketchat_auth_token'],
        'X-User-Id': botConfig['rocketchat_userid']
      }
    }

    await axios
      .request(options)
      .then(function(response) {
        bp.logger.info('ROCKETCHAT:ME INFO: GOT :', response.data)
        session.serving_bot = response.data
        session.serving_bot_name = session.serving_bot['name']
      })
      .catch(function(error) {
        bp.logger.error('ROCKETCHAT:ME INFO:ERROR GETTING ', error)
        bp.logger.error('ROCKETCHAT:ME INFO:FALLBACK TO ', args.default_bot_name)

        session.has_rocketchat = false
        session.serving_bot_name = args.default_bot_name
      })
  }

  return myAction(args.name, args.value)