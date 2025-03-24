const express = require("express");


const { TriggerWebhooks } = require("../../controllers/webhooks/trigger.controller");
const { InboxWebhook } = require("../../controllers/webhooks/inbox.controller");

const webhooksRouter = express.Router();

webhooksRouter.post("/trigger", TriggerWebhooks);

webhooksRouter.post("/inbox", InboxWebhook);

module.exports = webhooksRouter;
