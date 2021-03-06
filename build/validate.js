/**
 * Todo:
 * - Overrule default 'type' attribute
 * - 
 */

(function($) {
    $.fn.validate = function(settings, callback) {
        var $this = this,
            $inputs = $('input, select, textarea', $this),
            defaults = {
                eclass : 'error',
                wrapper : '',
                addClass : true
            },
            groupname = false,
            errors = {};

        // Check if settings could be callback
        if(typeof settings === 'function') {
            callback = settings;
            settings = {};
        }

        $.extend(defaults, settings);

        function getType($el){
            var t = typeof $el.attr('type') === 'undefined' ? 'text' : $el.attr('type');

            if($el.is('textarea')){
                t = 'textarea';
            }

            if($el.is('select')){
                t = 'select';
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
            if($el.attr('required') || _parent($el).hasClass('required')){
                return true;
            }

            return false;
        }

        function _parent($el){
            if($el.parent(defaults.wrapper).length){
                return $el.parent(defaults.wrapper);
            }

            return $el;
        }

        // The switch case so we can check each specific type
        // + Radio
        // + checkbox
        // + textarea
        // + submit
        // - text
        // + email
        // - number
        // + hidden
        // - select

        // Check for required attribute
        function validateField($el, callback){
            var type = getType($el),
                name = $el.attr('name'),
                val = $el.val(),
                valid = true,
                error = [];

            switch (type) {
                case 'radio':
                case 'checkbox':

                    if(name === groupname) {
                        break;
                    }

                    if(isChecked($el)) {
                        groupname = name;
                        delete errors[name];
                    } else {
                        error += 'required';
                    }

                    break;
                    return

                case 'textarea':
                case 'select':
                    if(val === '') {
                        error += 'required';
                    }
                    break;

                case 'email':
                    if(isRequired($el) && val === '') {
                        error += 'required';
                    }

                    if(!isEmail(val)) {
                        error += 'invalid';
                    }
                    break;

                case 'submit':
                case 'hidden':
                    return;
                    break;

                default:
                    if(isRequired($el) && val === '') {
                        error += 'required';
                    }
                    break;
            }

            if(error.length){
                errors[name] = error;
                valid = false;
            }

            callback(valid);
        }

        $inputs.each(function(key){
            var $el = $(this);

            _parent($el).removeClass(defaults.eclass);

            validateField($el, function(valid){
                if(!valid && defaults.addClass){
                    _parent($el).addClass(defaults.eclass);
                }
            });
        });

        if(typeof callback !== 'undefined'){
            callback(errors);
        }
    };
}(jQuery));