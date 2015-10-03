/*
* Helper class for using handlebars with inbeded templates and partials.
* All handlebars code should be in a <script> tag with type="text/html".
* Partials should also have class="partial"
*
* Template example:
* <script id="menuTemplate" type="text/html">
*
* Partial example:
* <script id="myPartial" class="partial" type="text/html">
*
* This also calls the hbHelpers script to add any helper functions defined there.
*/
define(["jquery", "handlebars","hbHelpers"],
	function($, hb,addHelpers) {

		addHelpers(hb);

		var hbUtil = {};

		/*
		* Sets up the handleBar system, including registaring all partials on the page.
		* A partial can be included on the page by using a script tag with the 'partial'
		* class and an id that is the name of the partial.
		* Example:
		* <script id="myPartial" class="partial" type="text/html">
		*/
		hbUtil.setup = function(){
			$('script.partial').each(function(){
				var $this = $(this);
				hb.registerPartial($this.attr('id'),$this.html());
			});
		}

		/*
		* Prepare a template for display. Primarally used in a promise.then().
		* @param templateSelector A selector for the template to render
		* @param elementSelector The element in which to display the rendered template
		* @returns a function.
		*		This function is the following
		*		@param  The data to display in the template. This can also be a promise that resolves to the data
		* 	@return A promise that will resolve when the content is displayed. Resolves to the model used for display.
		*/
		hbUtil.prepare = function(templateSelector,elementSelector, options){
			if(!options){
				options = {};
			}
			return function(data){

				if(options.dataIndex){
					data = arguments[options.dataIndex];
					console.log('displaying with',data);
				}
				return hbUtil.display(templateSelector,data,elementSelector, options);
			}
		}

		/*
		* Display a partial in a tag.
		* @param templateSelector A selector for the template to render
		* @param data The data to display in the template. This can also be a promise that resolves to the data
		* @param elementSelector The element in which to display the rendered template. This can be a string selector or a jquery object
		* @param options
		*		position: append|prepend|before|after|replace|contents default contents
		*			designates the location where the redered content will be placed
		*			reletive to the selected element
		* @return A promise that will resolve when the content is displayed. Resolves to the model used for display.
		*/
		hbUtil.display = function(templateSelector,data,elementSelector, options){
			if(!options){
				options = {};
			}
			return Promise.resolve(data)
			.then(function(model){
				var raw = $(templateSelector).html();
				var comp = hb.compile(raw);
				var html = comp(model);

				switch(options.position){
					case 'append':
						$(elementSelector).append(html);
						break;
					case 'prepend':
						$(elementSelector).prepend(html);
						break;
					case 'before':
						$(elementSelector).before(html);
						break;
					case 'after':
						$(elementSelector).after(html);
						break;
					case 'replace':
						$(elementSelector).replaceWith(html);
						break;
					case 'contents':
					default:
						$(elementSelector).html(html);
						break;
				}

				return model;
			});
		}

		return hbUtil;
	}
);
