define(["jquery","form2js"],
  function($,form2js){
    console.log('ajax form called');
    var setupForm = function(selector){
      console.log('loading form selector',selector);

      $(document).on('submit',selector,function(event){
        event.preventDefault();
        var formData = form2js(this);
        $form = $(this);
        var url = $form.attr('action');
        var method = $form.data('method');

        var settings = {
          contentType: "application/json",
          data : JSON.stringify(formData),
          method:'POST'
        };

        if(url){settings.url = url}
        if(method){settings.method = method}

        var beforeSubmitEvent = jQuery.Event( "beforeAjaxSubmit" );
        $form.trigger(beforeSubmitEvent,[formData,settings]);
        if(!beforeSubmitEvent.isDefaultPrevented()){

            var prom = $.ajax(settings);

            prom
            .done(function(data, status, jqXHR ){
              console.log('done call',arguments);

              $form.trigger('ajaxSubmitSuccess',[data,formData,status,jqXHR]);
            })
            .fail(function(jqXHR, textStatus, errorThrown){
              $form.trigger('ajaxSubmitFail',[formData,textStatus,errorThrown,jqXHR]);
            });
        }
      });
    };

    setupForm('.ajax-form');

    var setupButton = function(selector){
      $(document).on('click',selector,function(event){
        event.preventDefault();
        $button = $(this);
        var url = $button.data('action');
        var method = $button.data('method');
        var settings = {
          method:'GET'
        };
        if(url){settings.url = url}
        if(method){settings.method = method}

        var beforeSubmitEvent = jQuery.Event( "beforeAjaxSubmit" );
        $button.trigger(beforeSubmitEvent,[settings]);
        if(!beforeSubmitEvent.isDefaultPrevented()){

            var prom = $.ajax(settings);

            prom
            .done(function(data, status, jqXHR ){
              console.log('button call done',arguments);

              $button.trigger('ajaxSubmitSuccess',[data,status,jqXHR]);
            })
            .fail(function(jqXHR, textStatus, errorThrown){
              $button.trigger('ajaxSubmitFail',[textStatus,errorThrown,jqXHR]);
            });
        }
      });
    }

    setupButton('.ajax-button');

    return {
      setupForm:setupForm,
      setupButton:setupButton
    };

})
