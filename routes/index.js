var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quizz',errors:[] });
});

router.param('quizId',quizController.load);
router.param('commentId',commentController.load);


router.get('/login',sessionController.new);
router.post('/login',sessionController.create);
router.get('/logout', sessionController.destroy);

router.get('/quizzes', quizController.index);
router.get('/quizzes/:quizId(\\d+)',quizController.show);
router.get('/quizzes/:quizId(\\d+)/answer',quizController.answer);
router.get('/author',function(req, res) {res.render('author',{errors:[]});});
router.get('/quizzes/new', sessionController.loginRequired,quizController.new);
router.post('/quizzes/create', sessionController.loginRequired,quizController.create);
router.get('/quizzes/:quizId(\\d+)/edit', sessionController.loginRequired, quizController.edit);
router.put('/quizzes/:quizId(\\d+)', sessionController.loginRequired, quizController.update);
router.delete('/quizzes/:quizId(\\d+)', sessionController.loginRequired, quizController.destroy);

router.get('/quizzes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizzes/:quizId(\\d+)/comments', commentController.create);
router.get('/quizzes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.loginRequired, commentController.publish);

module.exports = router;
