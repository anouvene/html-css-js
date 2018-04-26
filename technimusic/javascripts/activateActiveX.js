/*  activateActiveX 1.2
	Copyright 2006 Jason Garber and Tavis Tucker
	This software is licensed under the CC-LGPL <http://creativecommons.org/licenses/LGPL/2.1/>
*/

/*
onDomReady : Runs a specified function when DOM is loaded

@param {String} func : The name of the function to be called
	You may also include parameters to be passed to the function e.g. onDomReady(myFunction(param1,param2));
	This can also be a function literal as in onDomReady(function() { more code to run on page load });

Source : brothercake's domFunction <http://www.brothercake.com/site/resources/scripts/domready/>
	and Dave Rolsky's DOM.Ready <http://www.openjsan.org/doc/a/au/autarch/DOM/Ready/0.14/lib/DOM/Ready.html>
*/

function onDomReady(func) {
	var t = setInterval( function() {
		if ( typeof document.getElementsByTagName != "undefined" && typeof document.getElementById != "undefined" && ( document.getElementsByTagName( "body" )[0] != null || document.body != null ) ) {
			if ( typeof func == "function" ) {
				func();
				clearInterval(t);
			}
		}
	}, 250 );
}


/*
activateActiveX : Activates ActiveX content for Internet Explorer 6.0+ to avoid requiring a user to click before using an object

Source : <http://sixtwothree.org/blog/archives/2006/05/20/activateactivex-12/>
*/

function activateActiveX() {
	if ( !document.getElementsByTagName || !document.body.outerHTML || !document.compatMode ) return false;
	var elems = new Array( "object", "applet" );
	var i = elems.length;
	while ( i-- > 0 ) {
		var objects = document.getElementsByTagName( elems[i] );
		var j = objects.length;
		while ( j-- > 0 ) {
			var params = "";
			var k = objects[j].childNodes.length;
			while ( k-- > 0 ) {
				params += objects[j].childNodes[k].outerHTML;
			}
			objects[j].outerHTML = objects[j].outerHTML.replace( "</" + elems[i].toUpperCase() + ">", params + "</" + elems[i].toUpperCase() + ">" );
		}
	}
}

onDomReady(activateActiveX);