$(document).ready(function(){
        $('.titles').hide();
        $('body').css("background-image","url('../img/intro.jpg')");
        $('footer').hide();
        $('.fly-in-text').hide();
        setTimeout(function(){
            $('.fly-in-text').fadeIn();
            $('.fly-in-text').addClass('animated infinite pulse');    
        },1000);
        setTimeout(function(){
            $('.fly-in-text').fadeOut();
            $('.fly-in-text').removeClass('animated infinite pulse'); 
            $('.titles').fadeIn(6500);
            $('footer').show();  
        },3000);
        var titleWords = ['<br>',
        'Back-End Development',
        '<br>','<br>','<br>','<br>','<br>',
        'Front-End Development',
        '<br>','<br>','Music By','Creator'], i=-1;
        var words=['AUTHENTICATION BASED ON <br> PASSPORTJS',
        'NodeJS','ExpressJS','PassportJS','MongooseJS',
        'MongoDB','HandlebarsJS','HTML5 & CSS3','jQuery',
        'Bootstrap','G-Eazy - Must Be Nice',
        'Jora Khachatryan'], j=-1;
        var icons=['','node','express','passport',
        'mongoose','mongo','handlebars',
        'htmlcss','jqu','boot'],k=-1;
        $('.devicons').fadeOut();
    var interval=setInterval(function(){
    	
        $('#title1').fadeOut(function(){
            $(this).html(titleWords[i=(i+1)%words.length]).fadeIn();
        });
        $('#title2').fadeOut(function(){
            $(this).html(words[j=(j+1)%words.length]).fadeIn();
        });
        setTimeout(function(){
        	$('#'+icons[k=(k+1)]).fadeIn();
    	},600);
        setTimeout(function(){
        	$('#'+icons[k]).fadeOut(2000);
        },4500);
       // 2 seconds
    }, 6500);
    setTimeout(function(){
    	clearInterval(interval);
    },83000)
    setTimeout(function(){
    	$('#title1').remove();
    	$('#title2').remove();
    	$( "#greatings" ).css('transform','translateX(50%)');
    	$(".devicons").fadeIn();
    },85000);
    
});