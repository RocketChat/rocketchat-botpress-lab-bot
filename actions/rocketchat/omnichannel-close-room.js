  /**
   * This action will transfer an Omnichannel Chat to a target department
   * @title Close Omnichannel Room
   * @category RocketChat
   * @author Duda Nogueira <duda.nogueira@rocket.chat>
   */

  const axios = require('axios')

  const RocketChatOmnichannelCloseRoom = async () => {
    const botConfig = await bp.config.mergeBotConfig(event.botId, {})
    const options = {
      method: 'POST',
      url: botConfig['rocketchat_url'] + '/api/v1/livechat/room.close',
      data: {
        rid: event.target,
        token: user.room_info.v.token
      },
      headers: {
        'X-Auth-Token': botConfig['rocketchat_auth_token'],
        'X-User-Id': botConfig['rocketchat_userid']
      }
    }

    await axios
      .request(options)
      .then(function(response) {
        user.transfer_attepmt = response
        user.transfer_success = true
        bp.logger.info('ROCKETCHAT: Close Room: ', response.data['room'])
      })
      .catch(function(error) {
        bp.logger.error('ROCKETCHAT: Close Room: ', error)
        user.transfer_success = false
      })
  }

  return RocketChatOmnichannelCloseRoom()