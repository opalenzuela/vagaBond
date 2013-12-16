'use strict';
/**
 * vagaBond
 * 
 * This function uses an object with a form, so that the values contained in 
 * the object are manifested in the respective fields of the form, while the 
 * changes made to each field are propagated to object.
 * 
 * @author Oriol Palenzuela
 * @param objname	Object name
 * @param {member} 	Object member name (optional) for recursive calls
 */
uMVC=function(objname,member){
	var t = window[objname];
	if (member && t[member]) t = t[member];
	for (var e in t) { 
		if (typeof(t[e])==="object") {
			uMVC(objname, e);
		} else {
			var o = jQuery("[name="+e+"]").val(t[e]);
			jQuery("[name="+e+"]").data("objname",objname);
			jQuery("[name="+e+"]").data("member",member);
			jQuery("[name="+e+"]").on("change",function(){				
				var o = window[jQuery(this).data("objname")];
				var m = jQuery(this).data("member");
				var t = jQuery(this);
				var v = jQuery(this).val();
				if (t[0].type == "checkbox") {
					v = ""+t[0].checked;
				}
				if (m) {
					o[m][jQuery(this).attr("name")] = v;
				}else {
					o[jQuery(this).attr("name")] = v;
				}
			});
			o.change();
		}
	} 		
};


/**
 * VagaBond lib
 * author: Oriol Palenzuela 
 * 
 * VagaBond provides an interface to navigate between pages while
 * preserving the data between them.
 * 
 * To implement VagaBond feature:
 * 1. Add the following line in EACH html file. <script src="vagabond.js"></script>
 * 2. Once the page is loaded/initialized, call "vagabond.init();"
 * 3. On each inter-page link, use "vagabond.travelTo('page.html')"
 * 
 * Note that:
 *  - if there is an object with id='vbbc', it will be used as breadcrumb display
 *  - vagabond.goBack() will jump to the preceeding page
 *  - vagabond.goBack(2) will jump to the second page in history
 *  - Data is the global variable container that will be kept while navigating
 */


var Data;

var vagabond = {
	printBreadCrumb: function (containerID) {
		var d = document.getElementById(containerID),
			i = 0,
			html = "<a href=\"javascript:document.location='index.html';\">HOME</a> ";
		if (d) {
			d.style.textAlign = "center";
			for (i = 1; i < localStorage.indexV ; i++ ){
				html = html + " | <a href=\"javascript:vagabond.goBack(" + i + ");\">" + localStorage["vb-" + i + "-title"] + "</a>";
			}
			d.innerHTML = html;
		} else {
			console.error("Breadcrumb object was not found");
		}
	},
	travelTo: function (place) {
		var pos = parseInt(localStorage["indexV"],0);
		if (pos >= 0) {
			pos = pos + 1;
			console.log("Traveling to "+place + " [" + pos + "]");
			localStorage["vb-" + pos+ "-page"] = place;
			localStorage["vb-" + pos+ "-data"] = JSON.stringify(Data);
			localStorage["indexV"] = pos;
			window.location.replace(place);
		}else {
			console.error("Invalid position "  + pos);
		}
	},
	goBack: function (num) {
		var pos = parseInt(localStorage["indexV"]), place;
		
		if (num) {
			if (num<pos){
				pos = num+1;
				place = localStorage["vb-" + num+ "-page"];
			}
		} else {
			place = localStorage["vb-" + pos+ "-page"];	
		}
		if (pos<=1) {
			return;
		}
		
		if (place) {
			console.log("Returning to  " + place + " [" + pos + "]");
			var previousObject = localStorage["vb-" + pos + "-data"];
			Data = eval(previousObject);
			localStorage.removeItem("vb-" + pos + "-page");
			localStorage.removeItem("vb-" + pos + "-data");
			localStorage.removeItem("vb-" + pos + "-title");
			pos = pos - 1;
			localStorage.indexV = pos;
			window.location.replace(place);
		} else {
			console.error("No place to go!! :_(");
		}
	},
	reset: function () {
		var i = 0;
		for (i = localStorage.indexV; i > 0; i--) {
			localStorage.removeItem("vb-" + i + "-page");
			localStorage.removeItem("vb-" + i + "-data");	
			localStorage.removeItem("vb-" + i + "-title");
		}
	},
	init: function () {
		this.printBreadCrumb('vbbc');
		if (!localStorage.indexV || localStorage.indexV < 1){
			localStorage["indexV"]=0;
		} else {
			localStorage["vb-" + localStorage.indexV + "-title"] = document.title;			
			if (localStorage.indexV>1) {
				
			//	localStorage.indexV++;
			//	this.goBack();
			}
		}
	}
};

vagabond.init();
