(function($) {
    $.fn.validate = function(settings) {
        var $this = this,
            defaults = {
                eclass : 'error'
            },
            groupname = false,
            errors = {};

        $.extend(defaults, settings);

        function getType($el){
            var t = typeof $el.attr('type') === 'undefined' ? 'text' : $el.attr('type');

            if($el.is('textarea')){
                t = 'textarea';
            }

            return t;
        }

        function isChecked($box){
            return $box.is(':checked');
        }

        function isEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }

        function isNumber(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }

        function isRequired($el) {
            // Check for required attribute
        }

        // The switch case so we can check each specific type
        // Radio, checkbox, textarea, submit, text, email, number, hidden, select

        // Check for required attribute
        function validateField($el){
            var type = getType($el),
                name = $el.attr('name'),
                val = $el.val();

            switch (type) {
                case 'radio':
                case 'checkbox':

                    if(name === groupname) {
                        break;
                    }

                    if (isChecked($el)) {
                        groupname = name;
                    } else {
                        errors[name] = inputtype;
                    }

                    break;
                    return

                case 'textarea':
                    if (val === '') {
                        errorlist[name] = inputtype;
                    }
                    break;

                case 'submit':
                case 'hidden':
                    return;
                    break;

                default:
                    if (val === '') {
                        errors[name] = inputtype;
                    }
                    break;
            }
        }

        // Loop the items
        $this.each(function(key){
            validateField($(this);
        });
    };
}(jQuery));

/*



$(".steps.active input, .steps.active textarea").each(function(key){

    switch (inputtype) {
        case 'radio':

            if($(this).attr('name') == inputwrap) {
                break;
            }

            if ($(this).is(":checked")) {
               valid = true;
               inputwrap = $(this).attr('name');
               errorlist = {};
            } else {
                valid = false;
                errorlist[name] = inputtype;
            }                        
            break;

        case 'submit':
            return;
            break;

        case 'checkbox':
            return;
            break;

        case 'hidden':
            return;
            break;                            
        
        case 'textarea':
            if ($(this).val() == "") {
                valid = false;
                errorlist[name] = inputtype;
                                              
            } else {
                valid = true;
            }  
            break;

        default:
            if ($(this).val() !== "" || $(this).attr('data-slider-value') !== "") {
                valid = true;
            } else {
                valid = false;
            }                          
            break;
    }

});

$('p.error').remove();

//  if {valid} is true continue
if(valid && $.isEmptyObject(errorlist)){
                       
    if ( $(".steps").last().hasClass("active") ) {
        $('.grid-container.survey form').submit();
    }else {
        currentstep.removeClass('active').fadeOut();
        currentstep.next().addClass('active').fadeIn();
    }                 

} else {   
    $.each(errorlist, function(name, type){
        if ( type == 'textarea') { 
            $('[name="'+name+'"]').parents('.textareawrap').append("<p class='error'>" + required_field + "</p>");

        } else {
            currentstep.append("<p class='error'>" + required_field + "</p>");
        }                            
    });

}