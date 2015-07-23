var models = require('../models/models.js');

exports.load = function(req, res, next, quizId){
	models.Quiz.find({where : {	
				id:Number(quizId)},
				include:[{model : models.Comment}]
			}).then(function(quiz){
		if(quiz){
			req.quiz = quiz;
			next();
		} else {
			next(new Error('No existe quizId=' +quizId));
		}
	}).catch(function(error){
		next(error);
	});
}


exports.index = function(req, res){
	
	var search = req.query.search;
	console.log("Recibe:"+search);
	if (search !== undefined){
		search = search.replace(/[^a-zA-Z0-9@ ]/g,"");
		console.log("Devuelve:"+search);
		search = search.replace(" ","%");
		console.log("Devuelve:"+search);
		search = "%"+search+"%";
		console.log("Devuelve:"+search);
		models.Quiz.findAll({where:["pregunta like ?",search]}).then(function(quizzes){
			res.render('quizzes/index.ejs',{quizzes : quizzes,errors:[]});
		}).catch(function(error){next(error)});
	} else{
		models.Quiz.findAll().then(function(quizzes){
			res.render('quizzes/index.ejs',{quizzes : quizzes,errors:[]});
		}).catch(function(error){next(error)});
	}
}

exports.show = function(req, res){
	models.Quiz.findAll().then(function(quiz){
		console.log('Esto es lo que vale quiz:'+quiz);
		res.render('quizzes/show',{quiz:req.quiz,errors:[]});
	});	
};

exports.answer = function(req, res){
	models.Quiz.findAll().then(function(quiz){
		var resultado = 'Incorrecto';
		if(req.query.respuesta === req.quiz.respuesta){
			resultado = 'Correcto';
		} 
		res.render('quizzes/answer',{title:'Quiz',quiz:req.quiz,respuesta:resultado,errors:[]});
	});
};

exports.new = function(req, res){
	var quiz = models.Quiz.build({
		pregunta:"Pregunta", 
		respuesta:"Respuesta",
		tema:"Tema"
	});

	res.render('quizzes/new', {quiz:quiz, errors:[]});
};

exports.create = function (req, res){
	var quiz = models.Quiz.build(req.body.quiz);
	quiz.validate().then(function(err){
		if (err){
			res.render('quizzes/new', {quiz: quiz, errors: err.errors});
		}else{
			quiz.save({fields:["pregunta","respuesta","tema"]}).then(function(){
				res.redirect('/quizzes');
			});
		}
	})
};

exports.edit = function(req, res){
	var quiz = req.quiz;

	res.render('quizzes/edit', {quiz:quiz,errors:[]});
};

exports.update = function(req, res){
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
	req.quiz.tema = req.body.quiz.tema;

	var err = req.quiz.validate().then(function(err){
		if (err){
			res.render('quizzes/edit',{quiz: req.quiz, errors:err.errors});
		} else {
			req.quiz.save({fields:["pregunta","respuesta","tema"]}).then(function(){
				res.redirect('/quizzes');
			});
		}
	})
};

exports.destroy = function(req, res){
	req.quiz.destroy().then(function(){
		res.redirect('/quizzes');
	}).catch(function(error){
		next(error)
	});
};