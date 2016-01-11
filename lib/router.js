Router.configure({
	layoutTemplate: 'layout'
});

Router.map(function(){
    this.route('/',{
        path: '/',
        template: 'map'
    });
    
    this.route('/directions',{
	    path: '/directions',
	    template: 'directions'
    });
    
    this.route('/reactive',{
	    path: '/reactive',
	    template: 'reactive'
    });
});