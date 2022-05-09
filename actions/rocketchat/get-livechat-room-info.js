  /**
   * This Action will grab all Livechat information from a target room
   * @title Get Livechat Room Info
   * @category RocketChat
   * @author Duda Nogueira <duda.nogueira@gmail.com>
   * @param {string} visitor_token - the visitor token
   */

  const axios = require('axios')

  const RocketChatGetLiveChatRoomInfo = async () => {
    const globalConfig = await bp.config.getBotpressConfig()
    const botConfig = await bp.config.mergeBotConfig(event.botId, globalConfig)
    bp.logger.info('ROCKETCHAT:LIVECHAT ROOM INFO:TARGET: ' + event.target)

    const options = {
      method: 'GET',
      url: botConfig['rocketchat_url'] + '/api/v1/livechat/room',
      params: { token: args.visitor_token, rid: event.target },
      headers: {
        'X-Auth-Token': botConfig['rocketchat_auth_token'],
        'X-User-Id': botConfig['rocketchat_userid']
      }
    }

    await axios
      .request(options)
      .then(function(response) {
        session.visitor_info = response.data['visitor']
        bp.logger.info('ROCKETCHAT:LIVECHAT ROOM INFO:GOT ', response)
      })
      .catch(function(error) {
        bp.logger.error('ROCKETCHAT:LIVECHAT ROOM INFO:ERROR: ', error)
        session.room_info = false
        session.visitor_name = args.default_visitor_name
      })
  }

  return RocketChatGetLiveChatRoomInfo()