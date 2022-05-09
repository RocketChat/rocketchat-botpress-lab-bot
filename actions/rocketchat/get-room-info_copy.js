  /**
   * This Action will grab all information from a target room
   * @title Get Room Info
   * @category RocketChat
   * @author Duda Nogueira <duda.nogueira@gmail.com>
   * @param {string} default_visitor_name - a Default visitor name to use
   */

  const axios = require('axios')

  const RocketChatGetRoomInfo = async () => {
    const globalConfig = await bp.config.getBotpressConfig()
    const botConfig = await bp.config.mergeBotConfig(event.botId, globalConfig)
    bp.logger.info('ROCKETCHAT:ROOM INFO:TARGET: ' + event.target)

    const options = {
      method: 'GET',
      url: botConfig['rocketchat_url'] + '/api/v1/rooms.info',
      params: { roomId: event.target },
      headers: {
        'X-Auth-Token': botConfig['rocketchat_auth_token'],
        'X-User-Id': botConfig['rocketchat_userid']
      }
    }

    await axios
      .request(options)
      .then(function(response) {
        user.room_info = response.data['room']
        session.room_info = response.data['room']
        session.visitor_name = ' ' + session.room_info.fname
        bp.logger.info('ROCKETCHAT:ROOM INFO:GOT ', response.data['room'])
      })
      .catch(function(error) {
        bp.logger.error('ROCKETCHAT:ROOM INFO:ERROR: ', error)
        session.room_info = false
        session.visitor_name = args.default_visitor_name
      })
  }

  return RocketChatGetRoomInfo()