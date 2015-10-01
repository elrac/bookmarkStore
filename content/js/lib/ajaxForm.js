define(["jquery","form2js"],
  function($,form2js){
    console.log('ajax form called');
    var setupForm = function(selector){
      console.log('loading form selector',selector);

      $(document).on('submit',selector,function(event){
        event.preventDefault();
        var formData = form2js(this);
        $form = $(this);
        var url = $(this).attr('action');
        var method = $(this).attr('method');

        var beforeSubmitEvent = jQuery.Event( "beforeAjaxSubmit" );
        $form.trigger(beforeSubmitEvent,[formData]);
        if(!beforeSubmitEvent.isDefaultPrevented()){
            var settings = {
              accepts:'json',
              contentType: "application/json; charset=utf-8",
              data : JSON.stringify(formData),
              method:'POST'
            };

            if(url){settings.url = url}
            if(method){settings.method = method}

            var prom = $.ajax(settings);

            prom
            .done(function(data, status, jqXHR ){
              $form.trigger('ajaxSubmitSucess',[data,status,jqXHR]);
            })
            .fail(function(jqXHR, textStatus, errorThrown){
              $form.trigger('ajaxSubmitFail',[jqXHR,textStatus,errorThrown]);
            });
        }
      });
    };

    setupForm('.ajax-form');

    return {
      setupForm:setupForm
    };

})
