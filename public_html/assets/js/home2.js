//	browser detection
function browser() {
	this.init();
}
browser.prototype = {
	_browser: null,
	_version: null,
	_os: null,
	init: function () {
		this._browser = this._search_string(this._data_browser) || "An unknown browser";
		this._version = this._search_version(navigator.userAgent)
			|| this._search_sersion(navigator.appVersion)
			|| "an unknown version";
		this._os = this._search_string(this._data_os) || "an unknown OS";
		if (window.ActiveXObject || "ActiveXObject" in window) {
			this._browser = "Explorer";
			if (!(window.ActiveXObject) && "ActiveXObject" in window) {
				this._version = 11.0;
			}
		}
	},
	_search_string: function (data) {
		for (var i = 0; i < data.length; i++) {
			var data_string = data[i].string;
			var data_prop = data[i].prop;
			this.version_search_string = data[i].version_search || data[i].identity;
			if (data_string) {
				if (data_string.indexOf(data[i].substring) != -1)
					return data[i].identity;
			}
			else if (data_prop)
				return data[i].identity;
		}
	},
	_search_version: function (data_string) {
		var index = data_string.indexOf(this.version_search_string);
		if (index == -1) return;
		return parseFloat(data_string.substring(index + this.version_search_string.length + 1));
	},
	_data_browser: [
		{ 	string: navigator.userAgent,
			substring: "OmniWeb",
			version_search: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			substring: "Apple",
			identity: "Safari"
		},
		{
			prop: window.opera,
			identity: "Opera"
		},
		{
			string: navigator.vendor,
			substring: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			substring: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			substring: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.userAgent,
			substring: "Chrome",
			identity: "Chrome"
		},
		{
			string: navigator.vendor,
			substring: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			substring: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			substring: "MSIE",
			identity: "Explorer",
			version_search: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			substring: "Mozilla",
			identity: "Netscape",
			version_search: "Mozilla"
		}
	],
	_data_os : [
		{
			string: navigator.platform,
			substring: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			substring: "Mac",
			identity: "Mac"
		},
		{
			string: navigator.platform,
			substring: "Linux",
			identity: "Linux"
		}
	],
	get_name: function() {
		return this._browser;
	},
	get_version: function() {
		return this._version;
	},
	get_os: function() {
		return this._os;
	},

	is_ie: function() {
		return this._browser == "Explorer";
	},
	is_mozilla: function() {
		return this._browser == "Firefox";
	},
	is_opera: function() {
		return this._browser == "Opera";
	},
	is_safari: function() {
		return this._browser == "Safari";
	},
	is_chrome: function() {
		return this._browser == "Chrome";
	}
}
browser = new browser();

//	mozilla extension
if (document.implementation.hasFeature("XPath", "3.0")) {
	XMLDocument.prototype.selectNodes = function(cXPathString, xNode) {
		if (!xNode) { xNode = this; }
		var oNSResolver = this.createNSResolver(this.documentElement)
		var aItems = this.evaluate(cXPathString, xNode, oNSResolver, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
		var aResult = [];
		for (var i = 0; i < aItems.snapshotLength; i++) {
			aResult[i] =  aItems.snapshotItem(i);
		}
		return aResult;
	}
	XMLDocument.prototype.selectSingleNode = function(cXPathString, xNode) {
		if (!xNode) { xNode = this; }

		var xItems = this.selectNodes(cXPathString, xNode);
		if (xItems.length > 0) {
			return xItems[0];
		} else {
			return null;
		}
	}

	Element.prototype.selectNodes = function(cXPathString) {
		if (this.ownerDocument.selectNodes) {
			return this.ownerDocument.selectNodes(cXPathString, this);
		} else {
			throw "For XML Elements Only";
		}
	}

	Element.prototype.selectSingleNode = function(cXPathString) {
		if (this.ownerDocument.selectSingleNode) {
			return this.ownerDocument.selectSingleNode(cXPathString, this);
		} else {
			throw "For XML Elements Only";
		}
	}
}


function clone(obj) {
	var result;
	if (typeof obj != "object") {
		result = obj;
	} else {
		result = new Object();
		for (var i in obj) {
			result[i] = clone(obj[i]);
		}
	}
	return result;
}

function extend(source, destination) {
	for (var i in destination.prototype) {
		if (source.prototype[i] === undefined) {
			source.prototype[i] = clone(destination.prototype[i]);
		}
	}
}

//	basic xmlhttp class (the real workhorse)
function xmlhttp_basic() {
	this.init();
}
xmlhttp_basic.prototype = {
	xmlhttp: null,
	abort: function() {
		return this.xmlhttp.abort();
	},
	init: function() {
	},
	get_all_response_headers: function() {
		return this.xmlhttp.getAllResponseHeaders();
	},
	get_ready_state: function() {
		return this.xmlhttp.readyState;
	},
	get_response_header: function(header) {
		return this.xmlhttp.getResponseHeader(header);
	},
	get_response_text: function() {
		return this.xmlhttp.responseText;
	},
	get_response_xml: function() {
		return this.xmlhttp.responseXML;
	},
	get_status: function() {
		return this.xmlhttp.status;
	},
	open: function(method, url, async, user, password) {
		if (user !== undefined) {
			return this.xmlhttp.open(method, url, async, user, password);
		} else {
			return this.xmlhttp.open(method, url, async);
		}
	},
	send: function(data) {
		return this.xmlhttp.send(data);
	},
	set_onreadystatechange: function(onreadystatechange) {
		this.xmlhttp.onreadystatechange = onreadystatechange;
	},
	set_request_header: function(header, value) {
		return this.xmlhttp.setRequestHeader(header, value);
	}
}

//	implementation of the xmlhttp for ie
function xmlhttp_ie() {
	this.init();
}
xmlhttp_ie.prototype = {
	base: xmlhttp_basic.prototype,
	init: function() {
		try {
			this.xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (e) {
		}
	}
}
extend(xmlhttp_ie, xmlhttp_basic);


//	implementation of the xmlhttp for mozilla
function xmlhttp_mozilla() {
	this.init();
}
xmlhttp_mozilla.prototype = {
	base: xmlhttp_basic.prototype,
	init: function() {
		try {
			this.xmlhttp = new XMLHttpRequest();
		} catch (e) {
		}
	}
}
extend(xmlhttp_mozilla, xmlhttp_basic);

//	implementation of the xmlhttp for opera
function xmlhttp_opera() {
	this.init();
}
xmlhttp_opera.prototype = {
	base: xmlhttp_basic.prototype,
	init: function() {
		try {
			this.xmlhttp = new XMLHttpRequest();
		} catch (e) {
		}
	}
}
extend(xmlhttp_opera, xmlhttp_basic);



function https(number_of_objects) { this.init(number_of_objects); };

https.prototype = {
	https: [], // array of xml_http_request instances
	init: function(number_of_objects) {
		if (number_of_objects) {
			for (var i = 0; i < number_of_objects; i++) {
				this.add_new_object();
			}
		}
	},

	get_free_object_index: function() {
		for (var i = 0; i < this.https.length; i++) {
			if (!this.https[i].is_busy()) {
				return i;
			}
		}
		this.add_new_object();	//	all objects are busy now, new object is required
		return this.https.length - 1;
	},

	add_new_object: function() {
		this.https.push(new xml_http_request("automatically created object #" + this.https.length, this));
	},

	get_object: function(params) {
		if (!params.type) {
			params.type = "text2js";
		}
		if (!params.method) {
			params.method = "post";
		}
		if (!params.arguments) {
			params.arguments = [];
		}
		if (!/^(text|xml2js|xml|xslt|text2js)$/.test(params.type)) {
			alert("Unsupported object_name: " + params.type);
			return;
		}
		if (!/^(get|post)$/i.test(params.method)) {
			alert("Unsupported method: " + params.method);
		}
		var object_index = this.get_free_object_index();
		var url = params.url;
		var data = this.get_data(params.parameters, params.query);
		this.https[object_index].top_arguments = [ ];
		if (params.arguments) {
			this.https[object_index].top_arguments = params.arguments;
		}
		this.https[object_index].name = params.name;
		return this.https[object_index].get_object({type: params.type, url: url, method: params.method, data: data, login: params.login, password: params.password, callback: params.callback, callback_object: params.callback_object});
	},

	abort: function(names) {
		if (names && typeof names != "object") {
			names = [ names ];
		}
		for (var i = 0; i < this.https.length; i++) {
			if (this.https[i].is_busy() && (!names || (names && array_search(this.https[i].name, names) !== false))) {
				this.https[i].abort();
			}
		}
	},

	get_data: function(parameters, query) {
		if (parameters == undefined) {
			parameters = {};
		}
		var data = generate_post_query(parameters);
		if (query) {
			data = data + "&" + query;
		}
		return data;
	},

	get_number_of_busy_objects: function() {
		var result = 0;
		for (var i = 0; i < this.https.length; i++) {
			if (this.https[i].is_busy()) {
				result++;
			}
		}
		return result;
	},

	update_indicator: function() {
		if (this.indicator) {
			var number_of_busy_objects = this.get_number_of_busy_objects();
			if (number_of_busy_objects) {
				this.indicator.title = language.requests_in_progress + " " + number_of_busy_objects;
				this.indicator.alt = number_of_busy_objects;
				this.indicator.style.visibility = "visible";
			} else {
				this.indicator.style.visibility = "hidden";
			}
		}
	}

};

var https = new https();

//	main ajax class
function xml_http_request(object_name, parent) { this.set_object_name(object_name); this.set_parent(parent); this.init(); };
xml_http_request.prototype = {
	xmlhttp: null,
	xml: null,
	busy: false,
	current_url: "",
	object_name: "",
	parent: null,	//	points to the objects container, may be null
	question_mark: "&",	//	set question_mark to "&" if you use mod_rewrites, otherwise it shoud be "?"

	set_object_name: function(object_name) {
		if (object_name == "" || object_name == undefined || object_name == null) {
			object_name = "anonymous";
		}
		this.object_name = object_name;
	},

	set_parent: function(parent) {
		if (parent) {
			this.parent = parent;
		}
	},

	check_busy: function() {
		if (this.busy) {
			alert("DEBUG: the object " + this.object_name + " is busy now with " + this.current_url);
		}
	},

	is_busy: function() {
		return this.busy;
	},

	set_busy: function(url) {
		this.busy = true;
		this.current_url = url;
		this.update_indicator();
	},

	clear_busy: function() {
		this.busy = false;
		this.update_indicator();
	},

	update_indicator: function() {
		if (this.parent) {
			this.parent.update_indicator();
		}
	},

	init: function() {
		this.check_busy();
		this.clear_busy();
		if (this.xmlhttp) {
			delete this.xmlhttp;
		}
		if (browser.is_opera()) {
			this.xmlhttp = new xmlhttp_opera();
		} else if (browser.is_ie()) {
			this.xmlhttp = new xmlhttp_ie();
		} else if (browser.is_mozilla() || browser.is_safari() || browser.is_chrome()) {
			this.xmlhttp = new xmlhttp_mozilla();
		} else {
			alert("your browser is not supported");
		}
	},

	abort: function() {
		this.clear_busy();
		if (this.xmlhttp) {
			this.xmlhttp.abort();
		}
	},

	node2array: function (node) {
		if (node == undefined || node == null) node = this.xml;
		var child_node;
		var has_text = false;
		for (var i = 0; i < node.childNodes.length; i++) {
			var child_node = node.childNodes[i];
			if (child_node.nodeType == 3) has_text = true;
		}
		if (has_text || node.childNodes.length == 0) {
			if (node.hasChildNodes && node.firstChild) value = node.firstChild.nodeValue;
			else value = "";
			return value;
		}
		var result = new Array();
		for (var i = 0; i < node.childNodes.length; i++) {
			var child_node = node.childNodes[i];
			var map = new Object();
			for (var j = 0; j < child_node.childNodes.length; j++) {
				var sub_child_node = child_node.childNodes[j];
				map[sub_child_node.nodeName] = this.node2array(sub_child_node);
			}
			result[result.length] = map;
		}
		return result;
	},

	callback: function(params) {
		var top_arguments = this.top_arguments;
		var callback_arguments = [];
		var callback_arguments_string = [];
		if (params.exception) {
			callback_arguments[0] = false;
		} else if (params.type == "text") {
			callback_arguments[0] = this.xmlhttp.get_response_text();
		} else if (params.type == "xml2js") {
			callback_arguments[0] = this.node2array(this.xmlhttp.get_response_xml().documentElement);
		} else if (params.type == "xml") {
			callback_arguments[0] = this.xmlhttp.get_response_xml();
		} else if (params.type == "xslt") {
			callback_arguments[0] = xslt_from_xml(this.xmlhttp.get_response_xml());
		} else if (params.type == "text2js") {
			try {
				eval("callback_arguments[0] = " + this.xmlhttp.get_response_text());
			} catch(e) {
				alert(e + "\n\nSource code is:\n\n" + this.xmlhttp.get_response_text());
				return;
			}
		} else {
			alert("There's an error in javascript code!\nUnknown type: " + type);
			return;
		}
		if (!params.callback) {
			return callback_arguments[0];
		}

		for (var i = 0; i < top_arguments.length; i++) {
			callback_arguments[callback_arguments.length] = top_arguments[i];
		}
		for (var i = 0; i < callback_arguments.length; i++) {
			callback_arguments_string[callback_arguments_string.length] = "callback_arguments[" + i + "]";
		}
		this.clear_busy();
		if (!params.callback_object) {
			eval("params.callback(" + callback_arguments_string.join(", ") + ")");
		} else {
			eval("params.callback_object['" + params.callback + "'](" + callback_arguments_string.join(", ") + ")");
		}
	},

	get_object: function(params) {
		this.init();
		this.set_busy(params.url);
		if (params.data === "" || params.data === undefined) {
			params.data = null;
		}
		params.method = params.method.toUpperCase();
		if (params.method == "GET" && params.data !== null) {
			if (params.url.search(/\?/) == -1) {
				params.url = params.url + this.question_mark;
			} else {
				params.url = params.url + "&";
			}
			params.url = params.url + params.data;
			params.data = null;
		} else if (params.method == "POST" && params.data === null) {
			params.method = "GET";	//	411 Content-Length required problem workaround
		}
		if (!params.callback) {
			this.xmlhttp.open(params.method, params.url, false, params.login, params.password);
			this.xmlhttp.set_request_header("Content-type", "application/x-www-form-urlencoded");
			this.xmlhttp.send(params.data);
			this.clear_busy();
			if (this.xmlhttp.get_ready_state() == 4 && this.xmlhttp.get_status() == 200)
				return this.callback(params);
			else
	 			return null;
		} else {
			this.xmlhttp.open(params.method, params.url, true, params.login, params.password);
			this.xmlhttp.set_request_header("Content-type", "application/x-www-form-urlencoded");
			var th = this;
			this.xmlhttp.set_onreadystatechange(function() {
				var ready = false;
				var error = false;
				try {
					if (th.xmlhttp.get_ready_state() == 4 && th.xmlhttp.get_status() == 200) {
						ready = true;
					}
				} catch (e) {
//					alert(e);
					error = e;
				}
				if (ready) { th.callback(params); }
				else if (error) { params.exception = error; th.callback(params); }
			});
			this.xmlhttp.send(params.data);
		}
	}
}

function generate_post_query(par) {
	var pairs = [];
	var pair_name;
	for (var name in par) {
		if (par.hasOwnProperty(name)) {
			var encoded_name = encodeURIComponent(name);
			var type = typeof par[name];
			if (type == "string" || type == "number") {
				pairs.push(encoded_name + "=" + encodeURIComponent(par[name]));
			} else {
				for (var i = 0; i < par[name].length; i++) {
					pairs.push(encoded_name + "=" + encodeURIComponent(par[name][i]));
				}
			}
		}
	}
	return pairs.join("&");
}

function text2js(text) {
	try {
		eval("var result = " + text);
		return result;
	} catch (e) {
		alert(e + "\n\nSource code is:\n\n" + text);
		return false;
	}
}

/**
 * @param exclude_border boolean - if true then border won't be treated as part of the obj
 */
function get_dimensions(obj, exclude_border) {
	var result = { "left": 0, "right" : 0, "top": 0, "bottom" : 0, "width" : obj.offsetWidth, "height" : obj.offsetHeight };
	if (exclude_border) {
		result.width = obj.clientWidth;
		result.height = obj.clientHeight;
	}
	if (obj.offsetParent) {
		result.left += obj.clientLeft;
		result.top += obj.clientTop;
		while (obj.offsetParent) {
			result.left += obj.offsetLeft;
			result.top += obj.offsetTop;
			obj = obj.offsetParent;
		}
	} else {
		if (obj.x) {
			result.left += obj.x;
		}
		if (obj.y) {
			result.top += obj.y;
		}
	}
	result.right = result.left + result.width;
	result.bottom = result.top + result.height;
	return result;
}

function trim(string) {
	string = string.replace(/^\s+/gi, "");
	string = string.replace(/\s+$/gi, "");
	return string;
}
function get_cookies() {
	var cookies_array = document.cookie.split(";");
	var cookies = {};
	for (var i = 0; i < cookies_array.length; i++) {
		var cookie_params = cookies_array[i].split("=");
		cookies[trim(cookie_params[0])] = unescape(cookie_params[1]);
	}
	return cookies;
}

function set_cookie(name, value, expires, path, domain, secure) {
	var cookie = name + "=" + escape(value);
	if (expires !== undefined) {
		cookie += ";expires=" + expires.toUTCString();
	}
	if (path !== undefined) {
		cookie += ";path=" + path;
	}
	if (domain !== undefined) {
		cookie += ";domain=" + domain;
	}
	if (secure) {
		cookie += ";secure";
	}
	document.cookie = cookie;
}

function get_cookie(name) {
	return get_cookies()[name];
}

function array_search(needle, haystack, strict) {
	for (var i = 0; i < haystack.length; i++) {
		if (strict && (needle == haystack[i]) || !strict && (needle == haystack[i])) {
			return i;
		}
	}
	return false;
}

function add_event_listener(el, evname, func) {
	if (el.attachEvent) { // IE
		el.attachEvent("on" + evname, func);
	} else if (el.addEventListener) { // Gecko / W3C
		el.addEventListener(evname, func, true);
	} else {
		el["on" + evname] = func;
	}
}

function remove_event_listener(el, evname, func) {
	if (el.detachEvent) { // IE
		el.detachEvent("on" + evname, func);
	} else if (el.removeEventListener) { // Gecko / W3C
		el.removeEventListener(evname, func, true);
	} else {
		el["on" + evname] = null;
	}
}

function ps() {
      window.location.href="http://www.shinysearch.com";
}

var current_menu = false;
var current_submenu = false;
function is_parent(possible_parent, child) {
	var parent = child.parentNode;
	while (parent) {
		if (parent == possible_parent) {
			return true;
		}
		parent = parent.parentNode;
	}
}
function show_menu(menu_name, link) {
	var new_menu = document.getElementById("menu_" + menu_name);
	if (new_menu != current_menu) {
		if (current_menu) {
			current_menu.style.display = "none";
		}
		new_menu.style.display = "block";
		current_menu = new_menu;
	}
}
function hide_menu(menu_name, link) {
	var new_menu = document.getElementById("menu_" + menu_name);
	if (new_menu == current_menu) {
		current_menu.style.display = "none";
		if (current_submenu) {
			current_submenu.style.display = "none";
		}
		current_menu = false;
		current_submenu = false;
	}
}
function show_submenu(submenu_name, link) {
	var new_submenu = document.getElementById("menu_" + submenu_name);
	if (new_submenu != current_submenu) {
		if (current_submenu) {
			current_submenu.style.display = "none";
		}
		new_submenu.style.display = "block";
		current_submenu = new_submenu;
	}
}

function t1bimg_stretch() {
	var img = document.createElement("img");
	img.src = tbimg_src;
	img.style.position = "absolute";
	img.style.left = "0px";
	img.style.top = "0px";
	img.style.zIndex = -1;
	img.style.visibility = "hidden";
	img.alt = "";
	img.id = "t1bimg";
	var img_already_loaded = img.width && img.height;
	if (!img_already_loaded) {	//	in IE if the same image is used for body background, then it is considered loaded and onload event doesn't fire
		add_event_listener(img, "load", t1bimg_load);
	}

	var div = document.createElement("div");
	div.style.position = "absolute";
	var table = document.getElementById("AutoNumber1");
	var dimensions = get_dimensions(table, true);
	div.style.left = dimensions.left + "px";
	div.style.top = dimensions.top + "px";
	div.style.width = dimensions.width + "px";
	div.style.height = dimensions.height + "px";
	div.style.overflow = "hidden";
	div.style.zIndex = 10;

	div.appendChild(img);
	document.body.appendChild(div);
	if (img_already_loaded) {
		t1bimg_load();
	}
}
function t1bimg_load() {
	var img = document.getElementById("t1bimg");
	remove_event_listener(img, "load", t1bimg_load);
	var img_original_width = parseInt(img.width);
	var img_original_height = parseInt(img.height);

	var table = document.getElementById("AutoNumber1");
	var dimensions = get_dimensions(table);

	if (t1imgalign_x == "repeat" || t1imgalign_y == "repeat") {	//	one is "stretch", another one is "repeat"
		var div = img.parentNode;
		if (t1imgalign_x == "repeat") {
			img.width = img_original_width;
			img.height = dimensions.height;
			img.style.left = "0px";
			img.style.top = "0px";
			img.style.visibility = "visible";
			var number_of_images = Math.ceil(dimensions.width / img_original_width);
			for (var i = 1; i < number_of_images; i++) {
				var new_img = img.cloneNode(true);
				new_img.style.left = img_original_width * i + "px";
				new_img.style.top = "0px";
				div.appendChild(new_img);
			}
		} else {
			img.width = dimensions.width;
			img.height = img_original_height;
			img.style.left = "0px";
			img.style.top = "0px";
			img.style.visibility = "visible";
			var number_of_images = Math.ceil(dimensions.height / img_original_height);
			for (var i = 1; i < number_of_images; i++) {
				var new_img = img.cloneNode(true);
				new_img.style.left = "0px";
				new_img.style.top = img_original_height * i + "px";
				div.appendChild(new_img);
			}
		}
	} else {	//	none is "repeat"
		var img_x_offset = 0;
		var img_y_offset = 0;
		if (t1imgalign_x != "stretch") {
			if (t1imgalign_x == "center") {
				img_x_offset = Math.round((dimensions.width - img_original_width) / 2);
			} else {	//	percentage value
				if (t1imgalign_x > 100) {
					t1imgalign_x = 100;
				}
				img_x_offset = Math.round((dimensions.width - img_original_width) * t1imgalign_x / 100);
			}
		}

		if (t1imgalign_y != "stretch") {
			if (t1imgalign_y == "center") {
				img_y_offset = Math.round((dimensions.height - img_original_height) / 2);
			} else {	//	percentage value
				if (t1imgalign_y > 100) {
					t1imgalign_y = 100;
				}
				img_y_offset = Math.round((dimensions.height - img_original_height) * t1imgalign_y / 100);
			}
		}

		img.style.left = img_x_offset + "px";
		img.style.top = img_y_offset + "px";

		if (t1imgalign_x == "stretch") {
			img.width = dimensions.width;
		} else {
			img.width = img_original_width;
		}
		if (t1imgalign_y == "stretch") {
			img.height = dimensions.height;
		} else {
			img.height = img_original_height;
		}
		img.style.visibility = "visible";
	}
}

function fc() {
	var x = document.getElementsByName('q');
	x[0].focus();
	//	lines below make browser rerender logo image if there is one
	var logo_img = document.getElementById("logo_img");
	if (logo_img) {
		var tempText = document.createTextNode("");
		logo_img.parentNode.insertBefore(tempText, logo_img.nextSibling);
		logo_img.parentNode.removeChild(tempText);
	}
}

function fc2() {
	//	lines below make browser rerender logo image if there is one
	var logo_img = document.getElementById("logo_img");
	if (logo_img) {
		var tempText = document.createTextNode("");
		logo_img.parentNode.insertBefore(tempText, logo_img.nextSibling);
		logo_img.parentNode.removeChild(tempText);
	}
}

function ie7alert() {
        var ie7messg = "In the Next window \n1, Select the First option (Use this webpage as your only home page)  \n2, Then click the \"Yes\" button  ";
alert(ie7messg);
}
function set_cookie2(c_name,value,expiredays)
{var exdate=new Date();exdate.setDate(exdate.getDate()+expiredays);
document.cookie=c_name+ "=" +escape(value)+
((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}
function set_homepage()
{
try {
pageTracker._trackPageview("/clicked_sethomepage.html");
} catch(err) {}
url = escape(location.href);
hurl = "http://www.shinysearch.com/sethomepage.php?u=" + url + "&img=" + fb_image_name;
var ver=navigator.appVersion ;
var dom=document.getElementById?1:0 ;
var ie7=(ver.indexOf("MSIE 7")>-1 && dom)?1:0;
var ie6=(ver.indexOf("MSIE 6")>-1 && dom)?1:0;
var ie5=(ver.indexOf("MSIE 5")>-1 && dom)?1:0;
var ie8=(ver.indexOf("MSIE 8")>-1 && dom)?1:0;
var ie9=(ver.indexOf("MSIE 9")>-1 && dom)?1:0;
var ie10=(ver.indexOf("MSIE 10")>-1 && dom)?1:0;
set_cookie2('showbtn',"fbs","20");

if (ie6 ||ie7 || ie8 || ie9 || ie5)
{
if (ie7 || ie8 || ie9 || ie10){
ie7alert();
return sethomepageIE7();
}
document.getElementsByTagName('body')[0].style.behavior = 'url(#default#homepage)';
document.getElementsByTagName('body')[0].sethomepage(location.href);
if (!(get_cookie("invited")))
{
url = escape(location.href);
inv_url = "http://invite.shinysearch.com/i2.php?u=" + url + "&img=" + fb_image_name;
//set_cookie2('showbtn',"fbs","1");
location = inv_url;
}
else
{
location.reload(true);
}

}
else
{
location = hurl;
}
}

function calculateBrowserSize(){
	var B=0,A=0;
	if(typeof(window.innerWidth)=="number"){
		window.browserWidth=window.innerWidth;window.browserHeight=window.innerHeight
	} else {
		if (document.documentElement&&(document.documentElement.clientWidth||document.documentElement.clientHeight)) {
			window.browserWidth=document.documentElement.clientWidth;
			window.browserHeight=document.documentElement.clientHeight
		} else {
			if(document.body&&(document.body.clientWidth||document.body.clientHeight)){window.browserWidth=document.body.clientWidth;window.browserHeight=document.body.clientHeight}
		}
	}
}

function sethomepageIE7() {
	calculateBrowserSize();
	var ie7_set_homepage_tip = document.getElementById("ie7_set_homepage_tip");
	ie7_set_homepage_tip.style.left = (window.browserWidth/2) - 565+"px";
	ie7_set_homepage_tip.style.top = (window.browserHeight/2) - 129+"px";
	ie7_set_homepage_tip.style.display = "block";
	var overlay = document.getElementById("overlay");
	overlay.style.display = "block";

	var body = document.getElementsByTagName('body')[0];
	body.style.behavior = 'url(#default#homepage)';
	body.sethomepage(location.href);

	ie7_set_homepage_tip.style.display = "none";
	overlay.style.display = "none";
if (!(get_cookie("invited")))
{
url = escape(location.href);
inv_url = "http://invite.shinysearch.com/i2.php?u=" + url + "&img=" + fb_image_name;
//set_cookie2('showbtn',"fbs","1");
location = inv_url;
}
else
{
location.reload(true);
}
}
function inv_friends()
{
url = escape(location.href);
inv_url = "http://invite.shinysearch.com/i2.php?u=" + url + "&img=" + fb_image_name;
set_cookie2('showbtn',"fbs","2");
try {
pageTracker._trackPageview("/clicked_inv_friends.html");
} catch(err) {}
location = inv_url;
}
function insinv_friends()
{
url = escape(location.href);
inv_url = "http://iminvite.shinysearch.com/imcontact/invite.php?u=" + url + "&img=" + fb_image_name;
set_cookie2('showbtn',"default");
try {
pageTracker._trackPageview("/clicked_insinv.html");
} catch(err) {}
location = inv_url;
}
function fb_share()
{
//u="http://www.shinysearch.com/fb.php?utm_source=FB&utm_medium=FBS&utm_campaign=FBS&img=" + fb_image_name;
u="http://www.shinysearch.com/fb3.php?v=4&utm_source=FB&utm_medium=FBS&utm_campaign=FBS&img";
t="ShinySearch.com";
window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(u)+'='+encodeURIComponent(fb_image_name)+'&t='+encodeURIComponent(t),'sharer','toolbar=0,status=0,width=626,height=436');
//window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(u)+'&t='+encodeURIComponent(t),'sharer','toolbar=0,status=0,width=626,height=436');
//set_cookie2('showbtn',"insinv");
set_cookie2('showbtn',"fbf","1");
try {
pageTracker._trackPageview("/clicked_fbshare.html");
} catch(err) {}
return false;
}
function fb_fan()
{
//set_cookie2('showbtn',"fbs");
set_cookie2('showbtn',"default");
try {
pageTracker._trackPageview("/clicked_fbfan.html");
} catch(err) {}
window.open('http://www.shinysearch.com/fbfan.php','fbfan','toolbar=0,status=0,width=400,height=250');
}

function load_menu() {
	https.get_object({ type: "text", url: "getmenu.php", callback: load_menu_callback });
}
function load_menu_callback(result) {
	document.getElementById("getmenu_container").innerHTML = result;
}
