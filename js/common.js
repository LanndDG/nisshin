//	マスタ変数
var header_fixed_flg = true;	//	ヘッダー追従を行う
var nav_scroll_top = 0;
var top_pc_padding = false;
var top_sp_padding = false;
var lower_pc_padding = false;
var lower_sp_padding = false;
var is_hash = location.hash;


jQuery(document).ready(function($){
	/*	ページスクロール処理	*********************************************************************/
	$('.page_scroll').click(function(){
		return page_scroll(this);
	});
	function page_scroll(tg){
		var target = $(tg).attr('href');
		var speed  = Math.abs(parseInt($(target).offset().top, 10) - parseInt($(window).scrollTop(), 10)) / 3.5;
		var effect = ($(tg).data('scroll-effect')?$(tg).data('scroll-effect'):'');
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

	//	スマホ時のみ電話番号へのリンクを有効にする
	var is_sp = ((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1) || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0);
	if(! is_sp) {
		$('a.telephone_sp_on').on('click.telephone_on',function(){
			return false;
		});
		$('a.telephone_sp_on').each(function(){
			$(this).css({
				'cursor': 'text',
				'color': $(this).css('color'),
				'text-decoration':'none',
				'opacity': '1.0'
			});
		});
		$('a.telephone_sp_on').each(function(){
			$('img', this).css({
				'opacity': '1.0'
			});
		});
	}





	/*	スマホナビ	*********************************************************************/
	//スクロール禁止用関数
	function no_scroll(){
		nav_scroll_top = $(window).scrollTop();
		var this_top = '-'+nav_scroll_top+'px';
		$('#wrapper').css({ "position":"fixed","top":this_top,"left":"0","width":"100%"});
	}

	//スクロール復活用関数
	function return_scroll(){
		$('#wrapper').css({ "position":"","top":"","left":"","width":""});
		$(window).scrollTop(nav_scroll_top);
	}

	//	スマホナビの動的処理を実行する
	var open_move = {'right':'0'};
	$('#navi_open').on('click',function(){
		function navi_open(){
			$('#nav').stop().show().animate(open_move,400);
			$('#glay_layer').stop().fadeIn(400);
		}
		no_scroll();
		setTimeout(function(){
			navi_open();
		}, 100);
		return false;
	});
	//	スマホナビクリック時にスクロールを有効にする
	$('#header #nav ul li a.page_scroll').click(function(){
		if(parseInt(window.innerWidth, 10) > 767) {
		} else {
			return_scroll();
			$('#glay_layer, #header #nav #navi_close a').trigger('click');
		}
		return page_scroll(this);
	});

	var close_move = {'right':'-100%'};
	$('#glay_layer, #header #nav #navi_close a').on('click touch',function(){
		$('#nav').stop().animate(close_move,400,function(){
			$(this).stop().hide();
		});
		$('#glay_layer').fadeOut(400);
		return_scroll();
		return false;
	});
	$(window).on('resize',function(){
		if(parseInt(window.innerWidth, 10) > 767) {
			$('#nav').css('right','0').css('display','block');
			$('#glay_layer').hide();
			return_scroll();
		} else {
			$('#nav').css('right','-100%');
			$(this).stop().css('opacity',10).hide();
			$('#glay_layer').hide();
		}
	}).trigger('resize');







	/*	ヘッダー追従	*********************************************************************/
	if(header_fixed_flg) {

		/****** 前提関数 ******/
		//	ヘッダー追従を有効にするクラスを付与#header要素に付与
		//	CSS3アニメーション
		function header_is_fixed_callback() {
			return $('body').addClass('is_header_fixed');
		}
		//	追従の実処理
		function floatMenu() {
			// 表示のタイミングとなる位置を取得する
			var offsetTop  = $('#section_01').offset().top;
			if ($(window).scrollTop() > offsetTop) {
				$('#header').addClass('is_opacity_0');
				//	アニメーション実行
				window.setTimeout(header_is_fixed_callback,1);
				//	解除
			} else {
				$('body').removeClass('is_header_fixed');
				$('#header').removeClass('is_opacity_0');
			}
		}
		//	コンテンツにヘッダーの高さ分パディングを付与する関数
		function addHeaderPadding() {
			var cont_p_t = parseInt($('#header').outerHeight(), 10);
			$('#contents').css('padding-top', (cont_p_t) + 'px');
		}
		//	コンテンツのパディングを外す関数
		function removeHeaderPadding() {
			$('#contents').css('padding-top', '');
		}
		//	ヘッダーのCSSを調整する関数		@param (bool)reset
		function adjustHeaderCss(reset) {
			$('#header').css('width','');
			if(! reset) {
				var this_body_wid = parseInt($('body').outerWidth(), 10);
//				$('#header').css('width',this_body_wid+'px');
			}
		}

		/****** 前提処理 ******/
		//※CSSファイル側でスタイルシートを適用する場合はこのクラスを指定して記述すること(バッティン対策)
		$('#header').addClass('header_fixed_on');


		/****** 実処理の実行 ******/
		//	TOP
		if($('body').hasClass('is_index')) {
			//	ページ読み込み時に関数を適用・即実行をし初期化とする
			$(window).scroll(floatMenu).trigger('scroll');

		//	下層
		} else {
//			$('body').addClass('is_header_fixed');	//	下層ページは無条件で実行
//	ページ読み込み時に関数を適用・即実行をし初期化とする
$(window).scroll(floatMenu).trigger('scroll');
		}


		/****** 実処理の挙動 ******/
		//	ヘッダーの高さ分だけコンテンツパディングを埋める
		$(window).on('resize',function(){

			//	TOP
			if($('body').hasClass('is_index')) {
				//	PC
				if(parseInt(window.innerWidth, 10) > 767) {
					//	pcTOP
					if(top_pc_padding) {
						addHeaderPadding();
					} else {
						removeHeaderPadding();
					}
					//	header cssの調整
					adjustHeaderCss(false);

				//	SP
				} else {
					//	spTOP
					if(top_sp_padding) {
						addHeaderPadding();
					} else {
						removeHeaderPadding();
					}
					//	header cssの調整をリセット
					adjustHeaderCss(true);
				}

			//	下層
			} else {
				//	PC
				if(parseInt(window.innerWidth, 10) > 767) {
					//	pc下層
					if(lower_pc_padding) {
						addHeaderPadding();
					} else {
						removeHeaderPadding();
					}
					//	header cssの調整
					adjustHeaderCss(false);

				//	SP
				} else {
					//	sp下層
					if(lower_sp_padding) {
						addHeaderPadding();
					} else {
						removeHeaderPadding();
					}
					//	header cssの調整をリセット
					adjustHeaderCss(true);
				}
			}

		}).trigger('resize');




		/****** ヘッダー追従による弊害を除去するための処理 ******/
		//	URLにハッシュパラメータが付けられてる時にヘッダー分スクロールする
		function scrollHash() {
			if(is_hash) {
				var target = is_hash;
				var speed  = 100;
				var effect = '';
				var offset = {scrollTop : $(target).offset().top};
				//	ヘッダー追従ON
				if(header_fixed_flg) {
					var offset = {scrollTop:$(target).offset().top - (parseInt($('#header').outerHeight(), 10) + 20)};
				//	ヘッダー追従OFF
				} else {
					var offset = {scrollTop : $(target).offset().top};
				}
				$('html,body').animate(offset,speed/2,effect);
				return false;
			}
		}		scrollHash();
	}





	/*	スマホ時に横並びになっている同一テーブルを一つに統一する (THなどの横幅感覚の統一)	*********************************************************************/
	if(($('.spMoveTable table').length)){
		if(($('.spMoveTable table.table2').length)){
			$('.spMoveTable table.table1 tbody tr').addClass('tr1');
			$('.spMoveTable table.table2 tbody tr').addClass('tr2');

			$(window).on('resize',function(){
				//	PC
				if(parseInt(window.innerWidth, 10) > 767) {

					$('.spMoveTable').each(function(index){
						$('.spMoveTable:eq('+index+') table.table1 tbody .tr2').appendTo('.spMoveTable:eq('+index+') table.table2 tbody');
					})

				//	SP
				} else {

					$('.spMoveTable').each(function(index){
						$('.spMoveTable:eq('+index+') table.table2 tbody .tr2').appendTo('.spMoveTable:eq('+index+') table.table1 tbody');
					})

				}
			}).trigger('resize');

		}
	}





});
