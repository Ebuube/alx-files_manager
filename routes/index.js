const express = require('express');
const AppController = require('../controllers/AppController');

const router = express.Router();
// Route to the AppController
router.get('/', AppController.getHomepage);
router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);

module.exports = router;
// export default router;
