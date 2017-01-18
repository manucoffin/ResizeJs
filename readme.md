# ResizeJs

ResizeJs is a Javascript library that allows you to transform Dom elements into draggable and resizable objects.

# Installation

Copy these links in your HTML:
```html
<script src="resize.js"></script>
<link rel="stylesheet" href="resize.css">
```

Then transform any DOM element into a resizable object:
```javascript
ResizeJs.apply(selector);
```

# Example

HTML:
```html
<div id="div-1" class="resizeMe"></div>
<div id="div-2"></div>
<div id="div-3" class="resizeMe"></div>
```
JavaScript:
```javascript
ResizeJs.apply('.resizeMe');
ResizeJs.apply('#div-2');
```
