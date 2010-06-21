var mk = new Object();

//Creates a dom object from specification. Avoid calling this directly.
//
//Parameters:
//type: string containing tag to create (for example, "div", "p")
//properties: associative array of properties to set on new element
//children: array of children to add to element; see mk.addChildren()
//
//Return:
//  Returns a DOM element
mk.mk = function(type,properties,children) {
    var elem = document.createElement(type);
    mk.addProperties(elem, properties);
    mk.addChildren(elem, children);
    return elem;
};

//Adds children to an element.
//
//Parameters:
//elem: the element to modify
//children: can be any of:
//  (a) DOM element (added directly)
//  (b) String (added as a text node)
//  (c) Array of any allowed type (added recursively over the list)
//  (d) Function of any allowed type (added recursively)
//      Any of these can be nested arbitrarily deep.
//
//Return:
//  Nothing is returned, elem is modified in place.
mk.addChildren = function(elem, children) {
    if (typeof children == "function")
        mk.addChildren(elem, children());
    else if (typeof children == "string")
        elem.appendChild(document.createTextNode(children));
    else if (children instanceof Array)
        for (var i=0; i<children.length; i++){mk.addChildren(elem,children[i])}
    else
        elem.appendChild(children);
};

//Add properties to an object (probably a DOM element)
//
//Parameters:
//elem: Object to add properties to (usually a DOM element)
//properties: Object containing properties to add, the value of each property
//  can be either of:
//  (a) any non object: Property with that name is set to that value
//  (b) object: recursively added to property with that name, for example:
//      {style:{color:"red", backgroundColor:"blue"}, id:"myelement"}
//
//Returns:
//  Nothing is returned, modified in place
mk.addProperties = function(elem, properties) {
    for (var item in properties) {
        if (typeof properties[item] == "object")
            mk.addProperties(elem[item], properties[item]);
        else
            elem[item] = properties[item];
    }
};
