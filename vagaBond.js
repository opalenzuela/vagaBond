/**
 * vagaBond
 * 
 * Esta función enlaza un objeto con un formulario, de modo que los valores
 * contenidos en el objeto se manifiestan en los respectivos campos del 
 * formulario, al mismo tiempo que los cambios realizados sobre cada campo
 * se propagan al objeto.
 * 
 * @author Oriol Palenzuela
 * @param objname	Nombre del objeto
 * @param {member} 	Nombre del miembro del objeto, usado para recursividad
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
