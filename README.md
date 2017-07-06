# React Image Clipper

A responsive image clipper tool for React. 



## run demo
```
npm start 
server on: http://localhost:3000
```

## Usage

Include the main js module, e.g.:

```js
import ReactClipper from 'react-clipper'
```
## follow by
https://github.com/DominicTobias/react-image-crop

## Props

```jsx
<ReactClipper />
```

All crop values are in percentages, and are relative to the image. All crop params are optional.

```jsx
var crop = {
  x: 20,
  y: 10,
  width: 30,
  height: 10
}

<ReactCrop crop={crop} />
```

If you want a fixed aspect you only need to specify a width *or* a height:

 ```jsx
var crop = {
  width: 30,
  aspect: 16/9
}
```

..Or you can omit both and only specify the aspect.

Please note that the values will be adjusted if the cropping area is outside of the image boundaries.

### clipWidth (optional)

The width of clip image, as px of the clipped image width.

### clipHeight (optional)

The height of clip image, as px of the clipped image height.

#### minWidth (optional)

A minimum crop width, as a percentage of the image width.

#### minHeight (optional)

A minimum crop height, as a percentage of the image height.

#### maxWidth (optional)

A maximum crop width, as a percentage of the image width.

#### maxHeight (optional)

A maximum crop height, as a percentage of the image height.

#### keepSelection (optional)

If true is passed then selection can't be disabled if the user clicks outside the selection area.

#### disabled (optional)

If true then the user cannot modify or draw a new crop. A class of `ReactCrop--disabled` is also added to the container for user styling.

#### onChange(crop, pixelCrop) (optional)

A callback which happens for every change of the crop (i.e. many times as you are dragging/resizing). Passes the current crop state object, as well as a pixel-converted crop for your convenience. This callback is not called on the load even if the crop was adjusted.

*Note* that when setting state in a callback you must also ensure that you set the new crop state, otherwise your component will re-render with whatever crop state was initially set.

#### onComplete(crop, pixelCrop) (optional)

A callback which happens after a resize, drag, or nudge. Passes the current crop state object, as well as a pixel-converted crop for your convenience.

*Note* that when setting state in a callback you must also ensure that you set the new crop state, otherwise your component will re-render with whatever crop state was initially set.

#### onImageLoaded(crop, image, pixelCrop) (optional)

A callback which happens when the image is loaded. Passes the current crop state object and the image DOM element, as well as a pixel-converted crop for your convenience. If the crop was adjusted during the load, this callback gives you the adjusted crop.

*Note* that when setting state in a callback you must also ensure that you set the new crop state, otherwise your component will re-render with whatever crop state was initially set.

#### onAspectRatioChange(crop, pixelCrop) (optional)

A callback which happens when the new aspect ratio is passed to the component. Passes the current crop state object, as well as a pixel-converted crop for your convenience.

*Note* that when setting state in a callback you must also ensure that you set the new crop state, otherwise your component will re-render with whatever crop state was initially set.

#### onDragStart() (optional)

A callback which happens when a user starts dragging or resizing. It is convenient to manipulate elements outside this component.

#### onDragEnd() (optional)

A callback which happens when a user releases the cursor or touch after dragging or resizing.

#### crossorigin (optional)

Allows setting the crossorigin attribute used for the img tags.

## Developing
To develop run `npm run build`, this will recompile your JS and CSS on changes.
