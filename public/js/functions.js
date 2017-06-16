$ (document).ready(function(){
	var fadeout="animated infinte fadeOut";
	var shake='animated infinte shake';
	$('main').hide();
	$("h2").click(function(){
		$('#intro').addClass(fadeout);
		setTimeout(()=>{
			$('#intro').remove();	
		},1000);
		$('main').show(5000);
	});
	setInterval(()=>{
		if($('#Pass').val()!==$('#Confirm').val()){
			$('[type="submit"]').attr("disabled","");
			$('#Confirm').focus(function(){
				$(this).css('background-color','red');
			});
			$('#Confirm').blur(function(){
				$(this).css('background-color','red');
				$(this).addClass(shake);
			});		
		}else{
			$('[type="submit"]').removeAttr("disabled");
			$('#Confirm').blur(function(){
				$(this).css('background-color','rgba(0,0,0,0)');
				$(this).removeClass();
			});
			$('#Confirm').focus(function(){
				$(this).css('background-color','rgba(0,0,0,0)');
			});
		}
		var fn=$('#FN').val();
		fn=fn.split(' ');
			if(fn.length==2 || fn.length==3){
				$('[type="submit"]').removeAttr("disabled");
				$('#FN').blur(function(){
						$(this).css('background-color','rgba(0,0,0,0)');
						$(this).removeClass();
				});
			}else{
				$('[type="submit"]').attr("disabled","");
				$('#FN').blur(function(){
					$(this).css('background-color','red');
					$(this).addClass(shake);
				});
			}
	},100);
	$('[type="button"]').click(function() {
		$('main').hide(2000);
   		setTimeout(function() {
   		window.location.href ="signin";
  		}, 2200);
	});
});