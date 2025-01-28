import express from 'express';
import {authenticated, autherizeRoles} from '../middleware/auth.js';
import { createLayout, editLayout, getLayoutByType } from '../controllers/laypout.controller.js';

const layoutRouters = express.Router();

layoutRouters.post('/upload-layout',authenticated,autherizeRoles('admin'), createLayout);
layoutRouters.put('/edit-layout',authenticated,autherizeRoles('admin'), editLayout);
layoutRouters.get('/get-layout', getLayoutByType);

export default layoutRouters;
