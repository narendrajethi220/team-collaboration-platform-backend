import {Router} from 'express';

import v1Router from './v1/v1.router.js';

const indexRouter = Router();

indexRouter.use('/v1',v1Router);

export default indexRouter;