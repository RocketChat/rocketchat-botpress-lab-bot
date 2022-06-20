  /**
   * This Action will grab all Livechat information from a visitor
   * @title Get Livechat Visitor Info
   * @category RocketChat
   * @author Duda Nogueira <duda.nogueira@gmail.com>
   * @param {string} visitor_token - the visitor token
   */

  const axios = require('axios')

  const RocketChatGetLiveChatVisitorInfo = async () => {
    const globalConfig = await bp.config.getBotpressConfig()
    const botConfig = await bp.config.mergeBotConfig(event.botId, globalConfig)

    const options = {
      method: 'GET',
      url: botConfig['rocketchat_url'] + '/api/v1/livechat/visitor/' + args.visitor_token
    }

    await axios
      .request(options)
      .then(function(response) {
        session.visitor_info = response.data['visitor']
        bp.logger.info('ROCKETCHAT:LIVECHAT VISITOR INFO:GOT ', response)
      })
      .catch(function(error) {
        bp.logger.error('ROCKETCHAT:LIVECHAT VISITOR INFO:ERROR: ', error)
        session.room_info = false
        session.visitor_name = args.default_visitor_name
      })
  }

  return RocketChatGetLiveChatVisitorInfo()