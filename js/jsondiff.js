function removeAllChildren(node) {
	var child;
	while (child = node.lastChild) {
		node.removeChild(child);
	}
};

function isArray(value) {
	return value && typeof value === "object" && value.constructor === Array;
};

function clickHandler(e) {
    var e = e || window.event;
    if (e.target.nodeName.toUpperCase() === "UL") {
        if (e.target.getAttribute("closed") === "yes")
            e.target.setAttribute("closed", "no");
        else
            e.target.setAttribute("closed", "yes");
    }
};

function typeofReal(value) {
	return isArray(value) ? "array" : typeof value;
}

function compareTree(a, b, name, results) {
	var typeA = typeofReal(a);
	var typeB = typeofReal(b);

	var typeSpanA = document.createElement("span");
	typeSpanA.appendChild(document.createTextNode("(" + typeA + ")"))
	typeSpanA.setAttribute("class", "typeName");

	var typeSpanB = document.createElement("span");
	typeSpanB.appendChild(document.createTextNode("(" + typeB + ")"))
	typeSpanB.setAttribute("class", "typeName");

	var aString = (typeA === "object" || typeA === "array") ? "" : String(a) + " ";
	var bString = (typeB === "object" || typeB === "array") ? "" : String(b) + " ";

	var leafNode = document.createElement("span");
	leafNode.appendChild(document.createTextNode(name));
	if (a === undefined) {
		leafNode.setAttribute("class", "added");
		leafNode.appendChild(document.createTextNode(": " + bString));
		leafNode.appendChild(typeSpanB);
	} else if (b === undefined) {
		leafNode.setAttribute("class", "removed");
		leafNode.appendChild(document.createTextNode(": " + aString));
		leafNode.appendChild(typeSpanA);
	} else if (typeA !== typeB || (typeA !== "object" && typeA !== "array" && a !== b)) {
		leafNode.setAttribute("class", "changed");
		leafNode.appendChild(document.createTextNode(": " + aString));
		leafNode.appendChild(typeSpanA);
		leafNode.appendChild(document.createTextNode(" => " + bString));
		leafNode.appendChild(typeSpanB);
	} else {
		leafNode.appendChild(document.createTextNode(": " + aString));
		leafNode.appendChild(typeSpanA);
	}

	if (typeA === "object" || typeA === "array" || typeB === "object" || typeB === "array") {
		var keys = [];
		for (var i in a) {
			if (a.hasOwnProperty(i)) {
				keys.push(i);
			}
		}
		for (var i in b) {
			if (b.hasOwnProperty(i)) {
				keys.push(i);
			}
		}
		keys.sort();

		var listNode = document.createElement("ul");
		listNode.appendChild(leafNode);

		for (var i = 0; i < keys.length; i++) {
			if (keys[i] === keys[i - 1]) {
				continue;
			}
			var li = document.createElement("li");
			listNode.appendChild(li);

			compareTree(a && a[keys[i]], b && b[keys[i]], keys[i], li);
		}
		results.appendChild(listNode);
	} else {
		results.appendChild(leafNode);
	}
}