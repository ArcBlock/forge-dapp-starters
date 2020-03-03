---
title: 'Raw Test'
path: '/demo/raw'
layout: 'page'
---

## Raw HTML {.section}

The following raw HTML code:

```html
<strong style="color:red">List Description</strong>
<ul>
  <li>Plain List Item</li>
  <li><a href="#">Link List Item</a></li>
</ul>
```

Will render as:

<strong style="color:red">List Description</strong>
<ul>
  <li>Plain List Item</li>
  <li><a href="#">Link List Item</a></li>
</ul>

And you can customize HTML tags with valid attributes, the following markdown:

```html
<p style="text-align: center; color: blue; font-size: 24px; padding: 10px; border: 1px solid red;">
  This text will be blue and display center aligned
<p>
```

Will render as:

<p style="text-align: center; color: blue; font-size: 24px; padding: 10px; border: 1px solid red;">
  This text will be blue and display center aligned
<p>

<p style="color:red;">Due to limitations with <strong>gatsby</strong></p>

The following markdown:

```html
<img src="./images/logo.jpg" style="width: 200px; height: auto;" />
```

Will just render without the style:

<img src="./images/logo.jpg" style="width: 200px !important; height: auto;" />

## Raw Scripts {.section}

Write inline javascript:

```html
<script>
for (var i = 0; i < 3; i++) {
  console.log('this is a test');
}
</script>
```

Will render (please open console) to inspect the output message.

<script>
for (var i = 0; i < 3; i++) {
  console.log('this is a test');
}
</script>

You can use embed 3rd party widgets easily, take helpdesk as example:

```html
<script>
	window.fwSettings={
	'widget_id':47000003856
	};
	!function(){if("function"!=typeof window.FreshworksWidget){var n=function(){n.q.push(arguments)};n.q=[],window.FreshworksWidget=n}}()
</script>
<script type='text/javascript' src='https://widget.freshworks.com/widgets/47000003856.js' async defer></script>
```

<script>
	window.fwSettings={
	'widget_id':47000003856
	};
	!function(){if("function"!=typeof window.FreshworksWidget){var n=function(){n.q.push(arguments)};n.q=[],window.FreshworksWidget=n}}()
</script>
<script type='text/javascript' src='https://widget.freshworks.com/widgets/47000003856.js' async defer></script>

You can checkout the bottom right corner of the page to see the button to popup helpdesk form.
