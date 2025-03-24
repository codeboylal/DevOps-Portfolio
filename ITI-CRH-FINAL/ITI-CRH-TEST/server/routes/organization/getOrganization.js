const express = require('express');
const { getOrganizationData } = require('../../controllers/organization/getOrganization.controller');

const getOrganizationRouter = express.Router();

getOrganizationRouter.get('/data', getOrganizationData);


module.exports = getOrganizationRouter;
