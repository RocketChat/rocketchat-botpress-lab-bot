  /**
   * Post a message to a channel or direct. The user sending the message must on the room.
   * @title Post Message to Channel
   * @category RocketChat
   * @author Duda Nogueira <duda.nogueira@rocket.chat>
   * @param {string} channel - Channel ID. #GENERAL or @user.name or fZeZmHPLqTQfDsQEe
   * @param {string} message - Text message to send
   * @param {string} message_extra - Json to extend the message payload
   */

  const axios = require('axios')

  const myAction = async () => {
    const globalConfig = await bp.config.getBotpressConfig()
    const botConfig = await bp.config.mergeBotConfig(event.botId, globalConfig)
    var payload = {
      channel: args.channel,
      text: args.message
    }

    if (args.message_extra) {
      const message_extra = JSON.parse(args.message_extra)
      payload = Object.assign({}, message_extra, payload)
    }

    const options = {
      method: 'POST',
      url: botConfig['rocketchat_url'] + '/api/v1/chat.postMessage',
      data: payload,
      headers: {
        'X-Auth-Token': botConfig['rocketchat_auth_token'],
        'X-User-Id': botConfig['rocketchat_userid']
      }
    }

    bp.logger.info('ROCKETCHAT:POST MESSAGE:PAYLOAD ', payload)
    await axios
      .request(options)
      .then(function(response) {
        session.message_sent = true
        session.message_posted = response.data['message']
        bp.logger.info('ROCKETCHAT:POST MESSAGE: ', response.data['message'])
      })
      .catch(function(error) {
        bp.logger.error('ROCKETCHAT:POST MESSAGE ERROR: ', error)
        session.message_sent = false
        if (error.response) {
          bp.logger.error('ROCKETCHAT:POST MESSAGE ERROR JSON: ', error.response.data)
          session.message_posted_error = error.response.data
        }
      })
  }

  return myAction()