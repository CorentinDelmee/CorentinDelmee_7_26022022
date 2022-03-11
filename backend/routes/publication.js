const express = require('express');
const router = express.Router();

//const auth = require('../middleware/auth');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const publicationCtrl = require('../controllers/publication');


router.post('/', auth, multer, publicationCtrl.createPublication);
router.get('/',  publicationCtrl.getAllPublication);
router.put('/:id', auth, multer, publicationCtrl.modifyPublication);
router.delete('/:id', auth, publicationCtrl.deletePublication);


module.exports = router;