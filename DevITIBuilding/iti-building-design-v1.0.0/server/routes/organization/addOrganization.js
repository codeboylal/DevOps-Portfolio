const express = require('express');
const { addOrganizationController } = require('../../controllers/organization/addOrganization.controller');

const addOrganizationRouter = express.Router();

addOrganizationRouter.post('/data', addOrganizationController);


module.exports = addOrganizationRouter;
