  /**
   * Test Rocket.Chat Configuration
   * @title A Simple Config Test
   * @category RocketChat
   * @author Duda Nogueira <duda.nogueira@rocket.chat>
   */
  const myAction = async (name, value) => {
    const globalConfig = await bp.config.getBotpressConfig()
    if (globalConfig['rocketchat_url']) {
      bp.logger.info('ROCKETCHAT:CONFIG:FOUND GLOBAL ', globalConfig)
    } else {
      bp.logger.info('ROCKETCHAT:CONFIG: TRYING LOCAL ', globalConfig)
    }
    const botConfig = await bp.config.mergeBotConfig(event.botId, globalConfig)

    if (botConfig['rocketchat_url']) {
      bp.logger.info('ROCKETCHAT:CONFIG:USING CONFIG ', globalConfig)
      session.has_rocketchat = true
    }else{
      session.has_rocketchat = false
    }
  }

  return myAction(args.name, args.value)