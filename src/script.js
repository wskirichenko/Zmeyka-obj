window.onload = function () {
	var tField = document.getElementsByClassName('choice'),
		 field = document.getElementById('matrix'),
		 formSelection = document.getElementsByClassName('selectField')[0],
		 typeField = 0;

	tField[0].addEventListener("click", function() {
		game.sizeCol = 10;
		game.sizeRow = 10;
		typeField = 0;
		game.startGame(game.sizeCol, game.sizeRow, typeField);
		console.log(game);
	});

	tField[1].addEventListener("click", function() {
		game.sizeCol = 20;
		game.sizeRow = 20;
		typeField = 1;
		game.startGame(game.sizeCol, game.sizeRow, typeField);
	});

	tField[2].addEventListener("click", function() {
		game.sizeCol = 30;
		game.sizeRow = 30;
		typeField = 2;
		game.startGame(game.sizeCol, game.sizeRow, typeField);
	});

// Основной объект -------------------------------------------------
	var Zmeyka = function (){
		this.sizeCol = 1;		// Размер поля по горизонтали
		this.sizeRow = 1;		// Размер поля по вертикали
		this.col = 1;			// Координита змейки по горизонтали
		this.row = 1;			// Координита змейки по вертикали
		this.sizeField = 1;	// Размер поля 
		this.targRow = 1;		// Координита цели по вертикали
		this.targCol = 1;		// Координита цели по горизонтали
		this.countLR  = 0;
		this.countUpD = 0;
		this.mainCount = 0;
		this.result = 0;
		return this;
	};

// Функция обработки нажатия клавиш управления
	document.onkeydown = function(kodkey) {
		if (kodkey.key == "d") {
			game.countLR += 1;
			game.move(game.countLR, game.countUpD, game.row, game.col);
		};
		if (kodkey.key == "a") {
			game.countLR -= 1;
			game.move(game.countLR, game.countUpD, game.row, game.col);
		};
		if (kodkey.key == "w") {
			game.countUpD -= 1;
			game.move(game.countLR, game.countUpD, game.row, game.col);
		};
		if (kodkey.key == "s") {
			game.countUpD += 1;
			game.move(game.countLR, game.countUpD, game.row, game.col);
		};
	};

// Изменение сетки grid в соответствии с выбранным размером поля
	function selType (tip) {
		if (tip == 0) {
			field.style.gridTemplateColumns = '10% 10% 10% 10% 10% 10% 10% 10% 10% 10%';
			field.style.gridTemplateRows = '8vh 8vh 8vh 8vh 8vh 8vh 8vh 8vh 8vh 8vh';
			field.style.width = '800px';
		};
		if (tip == 1) {
			field.style.gridTemplateColumns = '5% 5% 5% 5% 5% 5% 5% 5% 5% 5% 5% 5% 5% 5% 5% 5% 5% 5% 5% 5%';
			field.style.gridTemplateRows = '4vh 4vh 4vh 4vh 4vh 4vh 4vh 4vh 4vh 4vh 4vh 4vh 4vh 4vh 4vh 4vh 4vh 4vh 4vh 4vh';
			field.style.width = '800px';
		};
		if (tip == 2) {
			field.style.gridTemplateColumns = '3% 3% 3% 3% 3% 3% 3% 3% 3% 3% 3% 3% 3% 3% 3% 3% 3% 3% 3% 3% 3% 3% 3% 3% 3% 3% 3% 3% 3% 3%';
			field.style.gridTemplateRows = '3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh ';
			field.style.width = '1200px';
		};
	};

// Функция генерации случайных целых чисел в пределах max - min
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	};	

// Начало игры: создаём поле, устанавливаем змейку и цель
	Zmeyka.prototype.startGame = function (scol, srow, tip) {
		game.countLR = 0;
		game.countUpD = 0;
		game.createField(scol, srow, tip);
		game.col = getRandomInt(1, scol);
		game.row = getRandomInt(1, srow);
		game.setCell(game.row, game.col, true);
		game.targRow = getRandomInt(1, srow),
		game.targCol = getRandomInt(1, scol);
		game.getTarget(game.targRow, game.targCol);
	};

	Zmeyka.prototype.createField = function (col, row, tip) {
		var div;
		field.style.display = 'grid';
		formSelection.style.display = 'none';
		game.sizeField = col * row;
		for (var i = 0; i < game.sizeField; i++) {
			div = document.createElement('div');
			div.className = 'cell';
			matrix.appendChild(div); // Добавляем внутрь (div id="matrix") новый div
		};
		selType(tip);
	
		this.result = 0;
		return this;
	};

	Zmeyka.prototype.getElement = function (row, col) {
		return document.getElementById('matrix').children[(row - 1)*game.sizeRow + col - 1];
	};

	Zmeyka.prototype.setCell = function (row, col, val) {
		var z = game.getElement(row, col);
		if (val === true) {
			z.classList.add('on');		// Добавляю новый клас 'on'
		} else {
			z.className = 'cell';
		}
	};

	Zmeyka.prototype.getTarget = function (targRow, targCol) {
		ztarget = game.getElement(targRow, targCol);
		ztarget.classList.add('targ');
	};

// Движение змейки
// TODO  ---- Функцию необходимо переделать чтобы небыло
	Zmeyka.prototype.move = function (c, c2, row, col) {
		for (var i = 1; i <= game.sizeCol; i++) {
			for (var j = 1; j <= game.sizeRow; j++) {
				game.setCell(i, j, false);
			};	
		};	
		game.gameOver(row + c2, col + c);
		game.setCell(row + c2,	col + c,	true);
		game.getTarget(game.targRow, game.targCol);
		game.comeTarget(row + c2, col + c, game.targRow, game.targCol);
	};

	Zmeyka.prototype.gameOver = function (row, col) {
		if (((row > game.sizeRow) || (row < 1)) || ((col > game.sizeCol) || (col < 1))) {
			alert('Вы проиграли, вы набрали: '+ game.mainCount +' очков');
			field.style.display = 'none';
			formSelection.style.display = 'grid';
			game.mainCount = 0;
			document.getElementById('main-count').innerHTML = game.mainCount;
		};
	};

// Если змейка достигла цели 
	Zmeyka.prototype.comeTarget = function (row, col, targRow, targCol) {
		if ((row == targRow) && (col == targCol)){
			game.countGame();
			alert('Цель достигнута, у Вас теперь ' + game.mainCount + ' очков');
		};
	};

	Zmeyka.prototype.countGame = function () {
		game.startGame(game.sizeCol, game.sizeRow, typeField);
		game.mainCount += 1;
		document.getElementById('main-count').innerHTML = game.mainCount;
	}

	var game = new Zmeyka();

}
	