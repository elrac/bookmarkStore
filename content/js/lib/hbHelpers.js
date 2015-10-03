define(function () {

	console.log("loading helpers");

	/*
	* Adds #equal funtionality to handlebars.
	* Example:
	* {{#equal type "pie"}}
	* <div>pie</div>
	* {{/equal}}
	* This will display <div>pie</div> if the value of type is pie
	*/
	var equal = function(lvalue, rvalue, options) {
		if (arguments.length < 3)
		   throw new Error("Handlebars Helper equal needs 2 parameters");
		if( lvalue!=rvalue ) {
		   return options.inverse(this);
		} else {
		   return options.fn(this);
		}
	};

	return function(hb){
		hb.registerHelper('equal', equal);
	};
});
