requirejs(['jquery','handlebarsUtil','ajaxHelper'],
function($,hb){
  hb.setup();
  $('#newBookmarkForm').on('ajaxSubmitSuccess',function(event,data,postData,status){
    postData.bookmark_id = data.id;
    console.log(postData,data);
    hb.display('#listItem',postData,'#bookmarkList',{position:'prepend'});
  });

  $.get('/bookmarks',hb.prepare('#bookmarksListTemplate','#bookmarkList'));

  $(document).on('ajaxSubmitSuccess','.bookmarkDeleteButton',function(){
        $(this).closest('li').remove();
  });

  $(document).on('ajaxSubmitSuccess','.showEdit',function(event,data){
    hb.display('#bookmarkUpdateFormTemplate',data,$(this),{position:'replace'});
  });

  $(document).on('click',".cancelEditButton",function(){
    var $this = $(this);
    hb.display("#editButtonPartial",
      {bookmark_id:$this.data('id')},
      $this.closest('.updateBookmarkFormContainer'),
      {position:'replace'});
  });

});
