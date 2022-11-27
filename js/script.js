$(document).ready(function(){

    console.log();

    $( "#lien1" ).click(function(e) {
    console.log('oui');
    e.preventDefault();
    fullpage_api.moveTo(2, 1);
    
    });

    $( "#lien2" ).click(function(e) {
    console.log('oui');
    e.preventDefault();
    fullpage_api.moveTo(3, 2);
    
    });

    $( "#lien3" ).click(function(e) {
    
    e.preventDefault();
    fullpage_api.silentMoveTo(4);
    
    });

    $( "#lien4" ).click(function(e) {
    console.log('oui');
    e.preventDefault();
    fullpage_api.silentMoveTo(1);
    
    });


//initialising fullpage.js in the jQuery way
$('#fullpage').fullpage({
    anchors: ['firstPage', 'secondPage', '3rdPage', '4thpage', 'lastPage'],
    navigation: true,
    slidesNavigation: true,
});


});


var deleteLog = false;

//adding the params info into the page
function addToLog(callbackName, params){
    var callbackData = '<h4>' + callbackName + '</h4>';
    Object.keys(params).forEach(function(key){
        var content =  params[key];


        if(content !== null && typeof content === 'object'){
            content = JSON.stringify(content);
        }
        callbackData += '<p><b>' + key + '</b>: ' + content + '</p>';

    });
    callbackData += '<br />';

    // document.getElementById('callbacksDiv').innerHTML += callbackData;

   
}

//fullpage initialisation
var myFullpage = new fullpage('#fullpage', {
    anchors: ['firstPage', 'secondPage', '3rdPage', '4thpage', 'lastPage'],
    menu: '#menu',
    slidesNavigation: true,
    lazyLoad: true,
    credits: {enabled: false},

    beforeLeave: function(origin, destination, direction, trigger){
        var params = {
            origin: origin,
            destination:destination,
            direction: direction,
            trigger: trigger
        };

        //clearing the logging in the screen
        if(deleteLog){
            document.getElementById('callbacksDiv').innerHTML = '';
        }

        addToLog('beforeLeave', params);

        // console.log("--- beforeLeave ---");
        // console.log(params);
    },
    onLeave: function(origin, destination, direction, trigger){
        var params = {
            origin: origin,
            destination:destination,
            direction: direction,
            trigger: trigger
        };

        addToLog('onLeave', params);

        // console.log("--- onLeave ---");
        // console.log(params);
    },
    onSlideLeave: function(section, origin, destination, direction, trigger){
        var params = {
            section: section,
            origin: origin,
            destination: destination,
            direction: direction,
            trigger: trigger
        };

        //clearing the logging in the screen
        if(deleteLog){
            document.getElementById('callbacksDiv').innerHTML = '';
        }

        addToLog('onSlideLeave', params);


        // console.log(destination.isLast);

        if (destination.isLast == true) {
            console.log('dernière slide!');
        }


        // console.log("--- onSlideLeave ---");
        // console.log(params);
    },
    afterRender: function(){
        addToLog('afterRender', {});
        console.log("afterRender");
    },
    afterResize: function(width, height){
        addToLog('afterResize', {
            width: width,
            height: height
        });

        // console.log("afterResize");
        // console.log(params);
    },
    afterSlideLoad: function(section, origin, destination, direction, trigger){
        var params = {
            section: section,
            origin: origin,
            destination: destination,
            direction: direction,
            trigger: trigger
        };

        addToLog('afterSlideLoad', params);

        if (destination.isLast == true){
            console.log('denière slide!')
        }

        // console.log("--- afterSlideLoad ---");
        // console.log(params);
        // console.log("----------------");

        deleteLog = true;
    },
    afterLoad: function(origin, destination, direction, trigger){
        var params = {
            
            origin: origin,
            destination: destination,
            direction: direction, 
            trigger: trigger
        };
        addToLog('afterLoad', params);

        // console.log(destination.isLast);

        if (destination.isLast == true){
            console.log('denière page!')
        }

        // console.log("--- afterLoad ---");
        // console.log(this);
        // console.log('===============');

        deleteLog = true;
    },

    onScrollOverflow: function(section, slide, position, direction){
        var params = {
            section: section,
            slide: slide,
            position: position,
            direction: direction
        };

        // console.log("--- onScrollOverflow ---");
        // console.log(params);
        
        if(deleteLog){
            document.getElementById('callbacksDiv').innerHTML = '';
        }

        addToLog('onScrollOverflow', params);
        deleteLog = true;
    }
});