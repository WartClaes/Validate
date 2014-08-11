var site = {
	settings: {
		debug: false
	},
	log: function(msg, type){
		type = typeof type !== 'undefined' ? type : 'log';
		if(this.settings.debug && console){
			switch(type) {
				case 'warn':
					console.warn(msg);
					break;
				case 'error':
					console.error(msg);
					break;
				default:
					console.log(msg);
			}
		}
	},
	init: function(settings){
		$.extend(this.settings, settings);

        $('input[type=submit').bind('click', function(event){
            event.preventDefault();
            $('input').validate(function(err){
                console.log(err);
            });
        });
	}
};

$(function(){
	site.init({
		debug: true
	});
});
