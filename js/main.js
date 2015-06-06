/**
 * Module Description
 *
 * @author Author Name
 * @date 2013-01-01
 */

require([

], function () {
	'use strict';
	
	var form = document.getElementById('generator');
	
	var png = document.getElementById('lower-third-container');
	
    var fonts = ['Rajdhani-Regular', 'Rajdhani-Semibold'];
    
    var images = [
	    'img/lower-third-template.png',
	    'img/icon-twitter.png'
    ];
    
    var options = {
		textOffsetX: 400,
		twitterGroupOffsetX: 40,
		twitterOffsetX: 10,
		textColorTop: '#ffffff',
		textColorBottom: '#385060'
    };
	
	var stage = new Kinetic.Stage({
        container: 'canvas-container',
        width: 1920,
        height: 1080
    });
    
    function loadFonts() {
	    fonts.forEach(function(key) {
			var div = document.createElement('div');
		    div.setAttribute('style', "font-family:'" + key + "'");
		    div.innerHTML = '&nbsp;';
		    document.body.appendChild(div);
	    });
    }
    
	function slug (value) {    
		var rExps=[
			{re:/[\xC0-\xC6]/g, ch:'A'},
			{re:/[\xE0-\xE6]/g, ch:'a'},
			{re:/[\xC8-\xCB]/g, ch:'E'},
			{re:/[\xE8-\xEB]/g, ch:'e'},
			{re:/[\xCC-\xCF]/g, ch:'I'},
			{re:/[\xEC-\xEF]/g, ch:'i'},
			{re:/[\xD2-\xD6]/g, ch:'O'},
			{re:/[\xF2-\xF6]/g, ch:'o'},
			{re:/[\xD9-\xDC]/g, ch:'U'},
			{re:/[\xF9-\xFC]/g, ch:'u'},
			{re:/[\xC7-\xE7]/g, ch:'c'},
			{re:/[\xD1]/g, ch:'N'},
			{re:/[\xF1]/g, ch:'n'}
		];
		for( var i = 0, len = rExps.length; i < len; i++ ) {
			value = value.replace(rExps[i].re, rExps[i].ch);
		}
		return value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/\-{2,}/g,'-');
	}
	
	function getUrlVars() {
		var vars = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
			vars[key] = decodeURI(value);
		});
		return vars;
	}
	
	function updateFieldValues() {
		var vars = getUrlVars();				
		if(Object.keys(vars).length > 0) {
			Object.keys(vars).forEach(function(key) {
				document.getElementById(key).value = vars[key];
			});
		}
	}
    
	function generate(e) {
				
		e.preventDefault();
		
		stage.destroyChildren();
		
		var layer = new Kinetic.Layer(),
			guestName = document.getElementById('guest-name').value,
			guestTwitter = document.getElementById('guest-twitter').value,
			guestTitle = document.getElementById('guest-title').value;
			
		var url = window.location.href;
			
		history.replaceState(null, '', '?guest-name=' + guestName + '&guest-twitter=' + guestTwitter + '&guest-title=' + guestTitle);
		
		stage.add(layer);
		
		var backgroundImage = new Image();
		
		backgroundImage.crossOrigin = 'anonymous';
		backgroundImage.src = 'img/lower-third-template.png';
		
		backgroundImage.onload = function() {
			
			var backgroundImageObject = new Kinetic.Image({
				x: 0,
				y: 0,
				width: stage.attrs.width,
				height: stage.attrs.height,
				image: backgroundImage
			});
			
			layer.add(backgroundImageObject);
			layer.draw();
			
			var guestNameObject = new Kinetic.Text({
				x: options.textOffsetX,
				y: 868,
				text: guestName,
				fontSize: 90,
				fontFamily: 'Rajdhani-Semibold',
				fill: options.textColorTop
			});

			var guestTitleObject = new Kinetic.Text({
				x: options.textOffsetX,
				y: 976,
				text: guestTitle,
				fontSize: 45,
				fontFamily: 'Rajdhani-Semibold',
				fill: options.textColorBottom
			});
			
			layer.add(guestNameObject);
			layer.add(guestTitleObject);
			layer.draw();

			var guestNameWidth = guestNameObject.getWidth();
			
			var twitterGroup = new Kinetic.Group({
				x: options.textOffsetX + guestNameWidth + options.twitterGroupOffsetX,
				y: 900,
			});
			
			var twitterImage = new Image();

			twitterImage.crossOrigin = 'anonymous';
			twitterImage.src = 'img/icon-twitter.png';
			
			twitterImage.onload = function() {
				
				if( guestTwitter.length > 0 ) {
					
					var twitterImageObject = new Kinetic.Image({
						x: 0,
						y: -8,
						width: twitterImage.naturalWidth,
						height: twitterImage.naturalHeight,
						image: twitterImage
					});	
									
					var guestTwitterObject = new Kinetic.Text({
						x: twitterImage.naturalWidth + options.twitterOffsetX,
						y: -8,
						text: guestTwitter,
						fontSize: 60,
						fontFamily: 'Rajdhani-Regular',
						fill: options.textColorTop
					});
					
					twitterGroup.add(twitterImageObject);
					twitterGroup.add(guestTwitterObject);
					layer.add(twitterGroup);
					layer.draw();
					
				}
				
				stage.toDataURL({
					callback: function(dataUrl) {
						var a = document.createElement('a');
						var img = document.createElement('img');
						
						png.innerHTML = '';
						a.href = dataUrl;
						a.setAttribute('download', slug(guestName) + '-lower-third.png');
						
						img.src = dataUrl;
						
						a.appendChild(img);
						png.appendChild(a);
						
            		}
				});

			};
			
		};
		
		return false;
		
	}
	
	function init() {
		
		loadFonts();
		updateFieldValues();
		form.addEventListener('submit', generate);
		
	}

	init();

});
