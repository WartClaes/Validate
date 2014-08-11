(function($) {
    $.fn.validate = function(settings, callback) {
        var $this = this,
            defaults = {
                eclass : 'error'
            },
            groupname = false,
            errors = {};

        // Check if setting could be callback
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
        function validateField($el, callback){
            var type = getType($el),
                name = $el.attr('name'),
                val = $el.val(),
                valid = true,
                error = '';

            switch (type) {
                case 'radio':
                case 'checkbox':

                    if(name === groupname) {
                        delete errors[name];
                        break;
                    }

                    if (isChecked($el)) {
                        groupname = name;
                    } else {
                        error += 'required';
                        valid = false;
                    }

                    break;
                    return

                case 'textarea':
                    if (val === '') {
                        error += 'required';
                        valid = false;
                    }
                    break;

                case 'email':
                    if (val === '') {
                        error += 'required';
                        valid = false;
                    }

                    if (!isEmail(val)) {
                        error += 'invalid';
                        valid = false;
                    }
                    break;

                case 'submit':
                case 'hidden':
                    return;
                    break;

                default:
                    if (val === '') {
                        error += 'required';
                        valid = false;
                    }
                    break;
            }

            if(error.length){
                errors[name] = error;
            }

            callback(valid);
        }

        // Loop the items
        $this.each(function(key){
            var $el = $(this);
            validateField($el, function(valid){
                console.log(valid);
                if(!valid){
                    $el.addClass(defaults.eclass);
                }
            });
        });

        if(typeof callback !== 'undefined'){
            callback(errors);
        }
    };
}(jQuery));