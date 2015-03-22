var main = function(){
	"use strict";

	 var movies = ["the matrix", "lord of the ring"];
	 var games = ["gta v", "counter-strike", "diablo", "LoL"];
	 var books = ["Harry Potter", "Lord of the Ring", "Jurrassic Park"];
	
	var currentUser = {};

	homePage();
	signin(currentUser,homePage1);

	

	//console.log(currentUser);



	listManage(movies, games, books);




/*
var AJAXFetch = function (URL){
		$.ajax({
				url:URL,
				error : function () {},dataType: "json",
				success: function (data) {},type: "post"
		});
};
var JSONFetch =function (URL){
    $.getJSON(URL, function (data) {});
};*/


	/*$.ajax({
		url:"/getLoginUser.json",
		error : function () {
					$("#profile").empty();
					$("#profile").text("error ajax call");
		},dataType: "json",
		success: function (data) {
					$("#profile").empty();
					console.log('data:'+data); 
					if(data === '{}'){
						$('#profile').append('<a id="signupLink" href="/signup.show">signup</a>');
					}else{
						var user = JSON.parse(data);
						console.log('user:'+ user); 
						$("#profile").append("<p> welcome "+user+"</p>");
					} 
		},type: "post"
	});
*/

};

var signin = function(currentUser, callback) {
	
	var signtemp = {"username": "", "password": ""};

	$(".btn.btn-success").on("click", function () {
		signtemp.username = $(".form-group .username").val();
		signtemp.password = $(".form-group .password").val();
		//console.log(signin);

		$.post("signIn", signtemp, function (response) {
			
			currentUser = response;
			console.log("We posted and the server responded!");
			console.log(currentUser);

			callback(currentUser);
			
		});
		
	});

};

var homePage1 = function(currentUser) {
	// var $div,
	// $content,
	// $p;

	if (!jQuery.isEmptyObject(currentUser)) {

		$(".jumbotron").empty();
		$div = $("<div>").attr("class", "container");
		$content = $("<h1>").text("Welcome " + currentUser.username + "!");
		
		$div.append($content);
		$(".jumbotron").append($div);

	}

	//console.log(currentUser);

};

var homePage = function() {
	var $form,
	$div,
	$input,
	$button,
	$content,
	$p;

	$form = $("<form>").attr("class", "navbar-form navbar-right");
	$div = $("<div>").attr("class", "form-group");
	$input = $("<input>").attr("type", "text").attr("placeholder", "Email").attr("class", "username");
	$form.append($div.append($input));

	$div = $("<div>").attr("class", "form-group");
	$input = $("<input>").attr("type", "password").attr("placeholder", "Password").attr("class", "password");
	$form.append($div.append($input));

	$button = $("<button>").attr("type", "button").attr("class", "btn btn-success").text("Sign In");
	$form.append($button);
	$("div.navbar-collapse.collapse").append($form);

	$div = $("<div>").attr("class", "container");
	$content = $("<h1>").text("Welcome to Cinder!");
	$p = $("<p>").text("A social site for the socially awkward.  Meet others with common interest!");
	$div.append($content).append($p);
	$p = $("<p>").append($("<a>").attr("class", "btn btn-primary btn-lg").attr("href", "/public/signup.html").attr("role", "button").text
		("Sign Up"));
	$div.append($p);
	$(".jumbotron").append($div);

};

var listManage = function(movies, games, books) {
	
	var displayMovie = function(movies) {
		movies.forEach(function (movie) {
			var $newLI =$("<li>");
			$newLI.text(movie);
			$(".col-md-4 .movie").append($newLI);
		});
	};

	var displayGames = function(games) {
		games.forEach(function (game) {
			var $newLI =$("<li>");
			$newLI.text(game);
			$(".col-md-4 .game").append($newLI);
		});
	};

	var displayBooks = function(books) {
		books.forEach(function (book) {
			var $newLI =$("<li>");
			$newLI.text(book);
			$(".col-md-4 .book").append($newLI);
		});
	};
	
	displayMovie(movies);
	displayGames(games);
	displayBooks(books);
		

	$("main .tabs a").on("click", function () {
		$("main .content").empty();
		console.log("clicked");
		var $select = $("<select>").attr("id", "single");
		var $input = $("<input>");
		var $button = $("<button>").text("+");

		var $option = $("<option>").attr("value", "Movies").text("Movies");
		var $option1 = $("<option>").attr("value", "Games").text("Games");
		var $option2 = $("<option>").attr("value", "Books").text("Books");
		$select.append($option).append($option1).append($option2);
		$content = $("<div>").append($input).append($button).append($select);
		$("main .content").append($content);

		$button.on("click", function () {
			if ($input.val() != "") {
				if($select.val() === "Movies") {
					console.log("hello");
					movies.push($input.val());
					$input.val("");
					$(".col-md-4 .movie").empty();
					displayMovie(movies)
				} else if ($select.val() === "Games") {
					games.push($input.val());
					$input.val("");
					$(".col-md-4 .game").empty();
					displayGames(games)
				} else if ($select.val() === "Books") {
					books.push($input.val());
					$input.val("");
					$(".col-md-4 .book").empty();
					displayBooks(books)
				}

			}

		});
	});

	// $(".row h2 a span").toArray().forEach(function (element) {
	// 	// create a click handler for this element
	// 	var $element = $(element);

	// 	$(element).on("click", function () {

	// 		var $newLI,
	// 			$input,
	// 			$button,
	// 			$content,
	// 			$form,
	// 			$select,
	// 			$option;

	// 		$(".row h2 a span").removeClass("active");
	// 		$(element).addClass("active");
	// 		$("main .content").empty();

	// 		movies.forEach(function (movie) {
	// 			var $newLI =$("<li>");
	// 			$newLI.text(movie);
	// 			$(".col-md-4 .movie").append($newLI);
	// 		})


	// 		if ($element.parent().is(":nth-child(1)")) {
	// 			console.log("FIRST TAB CLICKED!");
	// 			movies.forEach(function (movie) {
	// 				var $newLI =$("<li>");
	// 				$newLI.text(movie);
	// 				$("main .content").append($newLI);
	// 			})
	// 		} else if ($element.parent().is(":nth-child(2)")) {
	// 			console.log("SECOND TAB CLICKED!");
	// 			games.forEach(function (game) {
	// 				var $newLI =$("<li>");
	// 				$newLI.text(game);
	// 				$("main .content").append($newLI);
	// 			});
	// 		} else if ($element.parent().is(":nth-child(3)")) {
	// 			console.log("THIRD TAB CLICKED!");
	// 			books.forEach(function (book) {

	// 				var $newLI = $("<li>");
	// 				$newLI.text(book);
	// 				$("main .content").append($newLI);
	// 			});
	// 		} else if ($element.parent().is(":nth-child(4)")) {

	// 			$select = $("<select>").attr("id", "single");
	// 			$input = $("<input>");
	// 			$button = $("<button>").text("+");

	// 			$option = $("<option>").attr("value", "Movies").text("Movies");
	// 			var $option1 = $("<option>").attr("value", "Games").text("Games");
	// 			var $option2 = $("<option>").attr("value", "Books").text("Books");
	// 			$select.append($option).append($option1).append($option2);

	// 			$button.on("click", function () {
	// 				if ($input.val() != "") {
	// 					if($select.val() === "Movies") {
	// 						movies.push($input.val());
	// 						$input.val("");
	// 					} else if ($select.val() === "Games") {
	// 						games.push($input.val());
	// 						$input.val("");
	// 					} else if ($select.val() === "Books") {
	// 						books.push($input.val());
	// 						$input.val("");
	// 					}

	// 				}

	// 			});


	// 			$content = $("<div>").append($input).append($button).append($select);
	// 		}

	// 		$("main .content").append($content);
	// 		// return false so we don't follow the link
	// 		return false;
	// 	});
	// });
}

//setInterval(AJAXFetch(),200);};
$(document).ready(main);