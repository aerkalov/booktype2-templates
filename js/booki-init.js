    $(function() {

        // Nested sortable
        $('ol.sortable').nestedSortable({
            forcePlaceholderSize: true,
            handle: 'div',
            helper: 'clone',
            items: 'li.item',
            opacity: .6,
            placeholder: 'placeholder',
            revert: 250,
            tabSize: 25,
            tolerance: 'pointer',
            toleranceElement: '> div',
            maxLevels: 2,           
            disableNestingClass: 'chapter',
            connectWith: ".hold-target-box",

            isTree: true,
            expandOnHover: 700,
            startCollapsed: true
        });
        $('.disclose').on('click', function() {
            $(this).closest('li').toggleClass('mjs-nestedSortable-collapsed').toggleClass('mjs-nestedSortable-expanded');
        })

        // ToC / Expand/Collapse
        $('#expand').click(function() {
            $('.sortable li.mjs-nestedSortable-collapsed').removeClass('mjs-nestedSortable-collapsed').addClass('mjs-nestedSortable-expanded');
        });
        $('#collapse').click(function() {
            $('.sortable li.mjs-nestedSortable-expanded').removeClass('mjs-nestedSortable-expanded').addClass('mjs-nestedSortable-collapsed');
        });

        // ToC / Dropdowns hover
        $('.sortable li > div').hover(
            function() {
                $(this).parent().find('div.btn-toolbar:first').show();    
            },
            function() {
                $(this).parent().find('div.btn-toolbar:first').hide();
            }
        );
        $('.sortable li .btn-toolbar').hover(
            function() {
                $(this).closest('li.item').find('div:first').toggleClass('hover-effect');
            },
            function() {
                $(this).closest('li.item').find('div:first').toggleClass('hover-effect');
            }
        );

        // ToC / Chapter details switch
        $('#detail-switch').click(function() {
            $('.sortable li').toggleClass('detail-switch')
        });

        // Tab panes
        // right side
        $('.right-tablist li a').click(function() {
            //close left side
            $('.left-tabpane').removeClass('open hold');
            $('body').removeClass('opentabpane-left');
            $('.left-tablist li').removeClass('active');
            // check if the tab is open
            if ($('#right-tabpane').hasClass('open')) {
                // if clicked on active tab, close tab
                if($(this).closest('li').hasClass('active')) {
                    $('.right-tabpane').toggleClass('open');
                    $('.right-tabpane').removeClass('hold');
                    $('.right-tabpane section').hide();
                    $('body').toggleClass('opentabpane-right');
                    $(this).closest('li').toggleClass('active');
                }
                // open but not active, switching content
                else {
                    $(this).closest('ul').find('li').removeClass('active');
                    $(this).parent().toggleClass('active');
                    $('.right-tabpane').removeClass('hold');
                    var target = $(this).attr('id');
                    $('.right-tabpane section').hide();
                    $('.right-tabpane section[source_id="'+target+'"]').show();
                    var is_hold = $(this).attr('id')
                    if (is_hold == 'hold-tab') {
                        $('.right-tabpane').addClass('hold');
                    }
                }
            }   
            // if closed, open tab
            else {
                $('body').toggleClass('opentabpane-right');
                $(this).parent().toggleClass('active');
                $('.right-tabpane').toggleClass('open');
                var target = $(this).attr('id');
                $('.right-tabpane section').hide();
                $('.right-tabpane section[source_id="'+target+'"]').show();
                var is_hold = $(this).attr('id')
                if (is_hold == 'hold-tab') {
                    $('.right-tabpane').addClass('hold');
                }
            }
        });
    
        // left side
        $('.left-tablist li a').click(function() {
            //close right side
            $('.right-tabpane').removeClass('open hold'); 
            $('body').removeClass('opentabpane-right');
            $('.right-tablist li').removeClass('active');
            // check if the tab is open
            if ($('#left-tabpane').hasClass('open')) {
                // if clicked on active tab, close tab
                if($(this).closest('li').hasClass('active')) {
                    $('.left-tabpane').toggleClass('open');
                    $('.left-tabpane').removeClass('hold');
                    $('.left-tabpane section').hide();
                    $('body').toggleClass('opentabpane-left');
                    $(this).closest('li').toggleClass('active');
                }
                // open but not active, switching content
                else {
                    $(this).closest('ul').find('li').removeClass('active');
                    $(this).parent().toggleClass('active');
                    $('.left-tabpane').removeClass('hold');
                    var target = $(this).attr('id');
                    $('.left-tabpane section').hide();
                    $('.left-tabpane section[source_id="'+target+'"]').show();
                    var is_hold = $(this).attr('id')
                    if (is_hold == 'hold-tab') {
                        $('.left-tabpane').addClass('hold');
                    }
                }
            }   
            // if closed, open tab
            else {
                $('body').toggleClass('opentabpane-left');
                $(this).parent().toggleClass('active');
                $('.left-tabpane').toggleClass('open');
                var target = $(this).attr('id');
                $('.left-tabpane section').hide();
                $('.left-tabpane section[source_id="'+target+'"]').show();
                var is_hold = $(this).attr('id')
                if (is_hold == 'hold-tab') {
                    $('.left-tabpane').addClass('hold');
                }
            }
        });

        var holdBtnGroup = "<div class=\"btn-toolbar float-right\">" +  
            "<div class=\"btn-group\">" + 
            "<button id=\"expand\" class=\"btn btn-default btn-xs\" rel=\"tooltip\" data-placement=\"left\" data-original-title=\"Unhold\">" +
            "<i class=\"icon-arrow-left\"><\/i>" +
            "<\/button>" +
            "<button id=\"collapse\" class=\"btn btn-default btn-xs\" data-original-title=\"Delete\">" +
            "<i class=\"icon-trash\"><\/i>" +
            "<\/button>" +
            "<\/div>" +
            "<div class=\"btn-group\">" + 
            "<button id=\"edit\" class=\"btn btn-default btn-xs\">" +
            "EDIT" +
            "<\/button>" +
            "<\/div>" +
            "<\/div>";

        $('.tabpane .hold-chapters li').hover(
            function() {                
                $(this).append(holdBtnGroup);
                $('[rel=tooltip]').tooltip();
            },
            function() {
                $(this).find('div.btn-group').remove();
            }
        );

        // history tab
        var restoreBtn = "<div class=\"restore-btn\">" +
            "<button type=\"button\" id=\"some_id\" class=\"btn btn-default btn-xs\">RESTORE<\/button>" +
            "<\/div>";

        $('.list.history li').click(function() {
            $(this).closest('ul').find('.restore-btn').remove();
            $(this).closest('ul').find('li').removeClass('active');
            $(this).toggleClass('active');
            $(this).find('.list-info').append(restoreBtn);
        });



        // link to chapter
        $('.linktochapter-header i').click(function() {
            $(this).closest('.linktochapter').toggleClass('open');
        });      
        $('.linktochapter .linktochapter-content li a').click(function() {
            $(this).closest('ul').find('li a').removeClass('selected');
            $(this).addClass('selected');
        });
        $('#newLink').on('hide.bs.modal', function () {
            $('.linktochapter').removeClass('open');
            $('.linktochapter .linktochapter-content ul').find('li a').removeClass('selected');
        });  

        // image manager
        $('.image-dropdown-button').click(function(){
            $(this).parent().toggleClass('open');
            return false;
        });
        $('.uploads-grid li').click(function(){
            $(this).closest('.tab-pane').addClass('open-info');
            $(this).parent().parent().find('ul li').removeClass('active');
            $(this).toggleClass('active');
            $('.image-info-container').removeClass('metadata-switch');
            
            var imgsrc = $(this).find('img').attr('src');
            $('.image-preview img').attr('src',imgsrc);
            
            var imgHeight = $('.image-preview img').height();
            var imgMargin = Math.round((226 - imgHeight)/2) + 'px';        
            $('.image-preview img').css('margin-top', imgMargin); 

            var uplGridWidth = $('.tab-pane.active').width();
            var newGridWidth = Math.round(uplGridWidth - 310) + 'px';
            $('.open-info .uploads-grid').css('width', newGridWidth);          
        });

        $('a.closeinfo').click(function(){
            $(this).closest('.tab-pane').removeClass('open-info');
            $(this).parent().removeClass('metadata-switch');
            $('.uploads-grid').css('width', ''); 
        });

        $('.uploads-grid > li').hover(
            function() {
                $(this).addClass('open-image-menu');  
            },
            function() {
                $(this).removeClass('open-image-menu');
                $(this).removeClass('open');
            }
        );

        $('a.metadata-btn').click(function(){
            $(this).parent().toggleClass('metadata-switch');
        });
        $('a.cancel-metadata-btn').click(function(){
            $(this).parent().toggleClass('metadata-switch');
        });


        // cover manager
        $('.coverMessageButton').click(function(){
            $('.coverMessage').toggleClass('open');
        });
        $('.coverThumbnail img').each(function(){
            $(this).hide();
            $(this).load(function(){                
                var coverImgHeight = $(this).height();
                var coverImgMargin = Math.round((184 - coverImgHeight)/2) + 'px';       
                $(this).css('margin-top', coverImgMargin);
                $(this).show();
            }); 
        });

        $('.coverThumbnail').each(function(){
            var coversrc = $(this).find('img').attr('src');
            $(this).find('.coverOptions .btn-group a').attr('href',coversrc);
            var coverfilename = $(this).find('img').attr('src').split('/').pop();
            $(this).find('.coverFileName').html('<strong>File name: </strong>' + coverfilename); 
        });
        

        // Tooltip
        $('[rel=tooltip]').tooltip({container: 'body'});

        // Main menu collapsible
        $('.collapse-navigation a').click(function(){
            $('body').toggleClass('menu-open');
        });

        // Chat Tab
        $('.notification-writer').focus(function(){ 
            $('.tab-content.chat').addClass('typing-active');  
            $('.notification-list').animate({ scrollTop: $('.notification-list').height() }, "slow");
        });
        $('.notification-write-box .cancel-notif').click(function(e){ 
            $('.tab-content.chat').removeClass('typing-active'); 
            $('.notification-writer').val("").removeClass("important");
            return false; 
        });
        $('.notification-important').click(function(e){
            $('.notification-writer').toggleClass('important');
        });

        //$('#compareDialog').modal('show')


        // Table of contents fix (view draft page) 
        $.fn.isOnScreen = function(){
        
            var win = $(window);
            
            var viewport = {
                top : win.scrollTop(),
                left : win.scrollLeft()
            };
            viewport.right = viewport.left + win.width();
            viewport.bottom = viewport.top + win.height();
            
            var bounds = this.offset();
            bounds.right = bounds.left + this.outerWidth();
            bounds.bottom = bounds.top + this.outerHeight();
            
            return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));           
        };
        if ($('footer').isOnScreen()) {
            var footer_position = $('footer').offset().top;
            var viewportHeight = $(window).height();
            var viewportWidth = $(window).width();
            if (viewportWidth > 767) {
                var sidebar_bottom = viewportHeight - footer_position + 30 + 'px';
                $('.toc_sidebar').css('bottom', sidebar_bottom);  
            }
        }
        else {
            $('footer').bind('inview', function (event, visible) {
                if (visible == true) {
                    $('.toc_sidebar').addClass('footer_visible');
                    // element is now visible in the viewport
                } else {
                    $('.toc_sidebar').removeClass('footer_visible');
                    // element has gone out of viewport
                } 
            });
        }
        // end ToC fix

   });