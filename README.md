jquery-imageformat
==================

> This plugin let's you dynamically assign different urls to lazy loaded images dependent on screen resolution

Basic Usage
-----------

Define image-urls for different formats:
```html
<img class="lazy" 
  data-src-large="images/1200px-ESO-VLT-Laser-phot-33a-07.jpg"
  data-src-medium="images/640px-ESO-VLT-Laser-phot-33a-07.jpg" 
  data-src-small="images/218px-ESO-VLT-Laser-phot-33a-07.jpg"/>
```

You may choose from the following predefined resolutions:
<table>
  <tr>
    <th>small</th>
    <th>medium</th>
    <th>large</th>
    <th>big</th>
  </tr>
  <tr>
    <td>320x520</td>
    <td>768x1024</td>
    <td>1680x1050</td>
    <td>1920x1050</td>
  </tr>
</table>

Call the plugin-method on the element:
```js
$(function() {
  $('img.lazy').imageformat();
});
```

Advanced Usage
--------------

### Using a custom attribute

```js
$(function() {
  $('img.lazy').imageformat({
    attribute: 'data-original'
  }).lazyload();
});
```

### Register a custom format

```js
$.fn.imageformat.setImageFormat('my-format', 1280, 990);
```


### Options

#### options.attribute
Type: `String`
Default value: `src`

Name of the attribute the client format's corresponding url is copied to.
