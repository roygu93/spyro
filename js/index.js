$(document).ready(function(){
    $('.hr').on('mousedown', function(e){
        var $dragable = $('#bottomSection'),
            startHeight = $dragable.height(),
            pY = e.pageY;

        //NOT SURE IF I NEED THIS
        // $(document).on('mouseup', function(e){
        //     $(document).off('mouseup').off('mousemove');
        // });

        $(document).on('mouseup', function(me){
            var my = (me.pageY - pY);

            var newHeight = startHeight - my;
            var bottomsTop = pY + my;

            $dragable.css({
                height: newHeight,
                top: bottomsTop
            });

            $(".sidebarBottom").css({
                height: newHeight
            });

            $("#bottomSection.content").css({
                height: newHeight
            });

        });
                
    });


});