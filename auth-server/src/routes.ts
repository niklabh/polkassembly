import { Router } from 'express';

import { postSubscriptionHook, postAuthorSubscriptionHook } from './controllers/subscriptionHook';
import { upload, uploadController } from './controllers/upload';

const router = Router();

router.get('/healthcheck', (req, res) => {
	res.end('ok');
});

// unused
router.post('/auth/upload-profile-pic', upload.single('file'), uploadController);

router.post('/auth/post/subscription', postSubscriptionHook);
router.post('/auth/post/author/subscription', postAuthorSubscriptionHook);

export default router;
