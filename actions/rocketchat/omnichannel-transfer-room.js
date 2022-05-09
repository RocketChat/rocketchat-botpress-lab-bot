  /**
   * This action will transfer an Omnichannel Chat to a target department
   * @title Transfer Room
   * @category RocketChat
   * @author Duda Nogueira <duda.nogueira@rocket.chat>
   * @param {string} target_department - The target Department
   */

  const axios = require('axios')

  const RocketChatOmnichannelTransferRoom = async () => {
    const botConfig = await bp.config.mergeBotConfig(event.botId, {})
    const options = {
      method: 'POST',
      url: botConfig['rocketchat_url'] + '/api/v1/livechat/room.transfer',
      data: {
        rid: event.target,
        token: user.room_info.v.token,
        department: args.target_department
      },
      headers: {
        'X-Auth-Token': botConfig['rocketchat_auth_token'],
        'X-User-Id': botConfig['rocketchat_userid']
      }
    }

    axios
      .request(options)
      .then(function(response) {
        user.transfer_attepmt = response
        user.transfer_success = true
        bp.logger.info('ROCKETCHAT: Transfer Room: ', response.data['room'])
      })
      .catch(function(error) {
        bp.logger.error('ROCKETCHAT: Transfer Room: ', error)
        user.transfer_success = false
      })
  }

  return RocketChatOmnichannelTransferRoom()