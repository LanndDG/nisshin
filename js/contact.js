var submit_flag = false;
$(function(){
	//	次へボタン
	$('#formSubmit #is_submit').on('click',function(){
		submit_flag = true;
		var is_input = true;
		$('.required_item').each(function(){
			var elm_name = $(this).get(0).tagName;
			var elm_type = $(this).attr('type');
			if(
				    (elm_name == 'INPUT' && (elm_type == 'text' || elm_type == 'email'))
				 || (elm_name == 'input' && (elm_type == 'text' || elm_type == 'email'))
				 || elm_name == 'TEXTAREA' || elm_name == 'textarea'
			) {
				if($(this).val() == '') {
					$(this).parents('td').children('.required_text').remove();
					$('<span class="required_text">※必須項目です</span>').appendTo($(this).parents('td'));
					is_input = false;
				} else {
					$(this).parents('td').children('.required_text').remove();
				}
			//	同意ボタンがある場合のチェック
			} else if($(this).attr('id') == 'is_agree') {
				if(! $(this).is(':checked')) {
					$(this).parents('.agree_check').children('.required_text').remove();
					$('<span class="required_text">※ご同意いただけない場合は送信ができません</span>').appendTo($(this).parents('.agree_check'));
					is_input = false;
				} else {
					$(this).parents('.agree_check').children('.required_text').remove();
				}
			}
		});
		if(is_input) {
			return;
		} else {
			submit_flag = false;
			var target = '#section_01';
			var speed  = Math.abs(parseInt($(target).offset().top, 10) - parseInt($(window).scrollTop(), 10)) / 3.5;
			var effect = 'swing';
			var offset = {scrollTop : $(target).offset().top};
			//	ヘッダー追従ON
			if(header_fixed_flg) {
				var offset = {scrollTop:$(target).offset().top - (parseInt($('#header').outerHeight(), 10) + 50)};
			//	ヘッダー追従OFF
			} else {
				var offset = {scrollTop : $(target).offset().top};
			}
			$('html,body').animate(offset,speed/2,effect);
			return false;
		}
	});
});
