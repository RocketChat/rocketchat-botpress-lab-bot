  /**
   * Post an offline message to the user department or default
   * @title Post Offline Message
   * @category RocketChat
   * @author Duda Nogueira <duda.nogueira@rocket.chat>
   * @param {string} name - Name of the visitor
   * @param {string} email - Email of the visitor
   * @param {string} message - offline message
   * @param {string} department - Department to follow the settings from
   */

  const axios = require('axios')

  const myAction = async () => {
    const globalConfig = await bp.config.getBotpressConfig()
    const botConfig = await bp.config.mergeBotConfig(event.botId, globalConfig)
    var payload = {
      name: args.name,
      email: args.email,
      message: args.message,
      department: args.department
    }

    const options = {
      method: 'POST',
      url: botConfig['rocketchat_url'] + '/api/v1/livechat/offline.message',
      data: payload,
      headers: {
        'X-Auth-Token': botConfig['rocketchat_auth_token'],
        'X-User-Id': botConfig['rocketchat_userid']
      }
    }

    bp.logger.info('ROCKETCHAT:OFFLINE MESSAGE:PAYLOAD ', payload)
    await axios
      .request(options)
      .then(function(response) {
        session.offline_message_sent = true
        session.offline_message = response.data
        bp.logger.info('ROCKETCHAT:OFFLINE MESSAGE GOT: ', response.data)
      })
      .catch(function(error) {
        bp.logger.error('ROCKETCHAT:OFFLINE MESSAGE ERROR: ', error)
        session.offline_message_sent = false
        if (error.response) {
          bp.logger.error('ROCKETCHAT:OFFLINE MESSAGE ERROR JSON: ', error.response.data)
          session.offline_message_sent_error = error.response.data
        }
      })
  }

  return myAction()