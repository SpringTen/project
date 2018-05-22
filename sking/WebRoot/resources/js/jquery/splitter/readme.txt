jQuery Splitter Plugin
http://methvin.com/splitter/

The documentation below is for version 1.5.1; see the release notes for the changes from previous versions.
Download version 1.5.1
Demos
Minimal vertical splitter: Demonstrates minimal code/markup needed to create a splitter. All the styles are included in the HTML file for this example.
Vertical splitter: Vertical splitter with fixed height and fluid width.
Horizontal splitter: Horizontal splitter with fixed height and width.
Another vertical splitter: Vertical splitter with skinny splitbar and custom cursor.
3-Pane splitter: Shows how to nest a horizontal splitter inside a vertical splitter.
3-Column splitter: Nests vertical splitters to obtain a 3-column effect.
4-pane splitter: Nests multiple splitters to get one vertical pane and three horizontal ones.
Docking splitter: Splitter that allows the user to double-click the splitbar to "dock" it.
Still Needs Fixin'
IE6: 3-pane and 3-column demos don't resize to smaller window height.
Safari: Text is sometimes selected in nested splitters during a outline resize
Report your own: dave . methvin  a t  gmail.com.
Getting Started
Here's a quick tour on using the plugin. Markup for a vertical splitter looks like this:
 <div id="MySplitter">
   <div> Left content goes here </div>
   <div> Right content goes here </div>
 </div> 
Define a few style rules to define the splitter size and make sure the splitbar is visible:
#MySplitter {
	height: 200px;
	width: 500px;
	border: 5px solid #aaa;
}
#MySplitter div {
	overflow: auto;
}
.vsplitbar {
	width: 5px;
	background: #aaa;
}
The top-level div has two child divs for the left and right panes. (In a horizontal splitter, the first pane is the top and the second is the bottom.) The plugin dynamically adds a splitbar that goes between the panes. To create the splitter, put a line of code in a .ready() handler to select the MySplitter div in a jQuery object and pass it to the splitter plugin:
 $().ready(function(){
   $("#MySplitter").splitter();
 });
Congratulations, there's a vertical splitter in your document!
Moving the splitbar
Users can move the splitbar in three ways:
Hover the mouse over the splitbar. Click and drag the splitbar to move it.
Define an HTML accessKey, e.g. $().splitter({splitbarKey: "I"}) the user can press to select/move the splitbar.
Press Tab until the splitbar is selected, then use the arrow keys to move it.
Browsers don't provide a consistent way to use access keys. For the example in Internet Explorer and Firefox, press Alt-Shift-I to select the splitbar; use the arrow keys to move the splitbar and the tab key to deselect. On Opera, press Shift-Esc (or Shift followed by Esc) to get a menu of access keys, then press the I key alone to select the splitbar; use the arrow keys to move the splitbar and the Esc key to deselect. On Safari...use the mouse because Safari doesn't implement accessKey.
Splitter options and markup can modify splitter behavior, such as the style of the splitbar and whether the splitbar dynamically follows the mouse. By setting size limits on the two panes, you can prevent the splitter from making one of the panes too big or small.
To move the splitbar position programmatically, trigger the splitter's resize event and pass it an array with a single number that indicates the new splitbar position, in pixels from the top/left edge:
 $("#MySplitter").trigger("resize", [ 200 ]);
Or, you can use a syntax similar to jQuery UI plugins:
 $("#MySplitter").splitter("resize", 200);
Moving the splitbar through code is still restricted by size and position constraints set by the options or stylesheet rules.
Using outlined motion for the splitbar
By default, the splitter resizes the two panes in real time as the mouse drags the splitbar. If the content in one or both of the panes is complex, this may result in flickering or ugly visual artifacts. (Generally, this is much more noticeable on vertical splitters than on horizontal ones.) The plugin offers an outlined splitbar option, where the mouse moves a "ghosted" copy of the splitbar and does not resize the panes until the mouse button is released. To use this option, define the property outline: true in the splitter options.
Setting the initial splitbar position
By default, the splitter gives the two panes equal sizes. You can set the initial position either in a style or directly in the splitter options. For example, sizeTop: true for a horizontal splitter says to use the height of the top pane (from the style sheet or an inline style) as its initial height. Pass a number instead of a boolean, such as sizeLeft: 200 to give the initial width/height of the pane in pixels. To make one of the panes initially invisible, set its size to 0, e.g. sizeLeft: 0 will put the splitbar at the left side of the splitter and the left pane will not be visible.
Specifying the size of one pane also tells the splitter to hold that pane at its current size when the splitter container is resized; any change will be made to the other pane. However, that pane may still have to be resized to honor min/max height constraints defined for the other pane.
Resizing the splitter container
The splitter plugin supports resizing the container after it is created, but it must be notified of a change via a resize event so that it can resize the panes. Internet Explorer does this automatically, but most other browsers do not. In the example above, #MySplitter is defined to be a 400x300 pixel fixed width. To resize it to 400x400 pixels in Javascript, you could use this code:
 $("#MySplitter").css("height", "400px").trigger("resize");
The most common need for a resize is when the user changes the size of the browser's window, so the plugin makes that case simple. Just pass the property resizeToWidth: true in the splitter plugin options. Then you can create a semi-fluid splitter container by setting a minimum and maximum size for the container. This change to the style for #MySplitter would allow its width to vary between 300 and 600 pixels, based on the size of the parent container:
 #MySplitter { min-width: 300px; max-width: 600px; height: 300px; }
The 3-pane splitter demo demonstrates another common case where the splitter container should fill the entire height and width of the browser window. It uses the splitter's anchorToWindow: true option to do this. NOTE: Requires jQuery 1.2 or higher to use the .offset() and .height() methods.
In other exotic cases, you may need to explicitly resize the splitter. Usually these situations are easy to detect because the splitter resizes correctly in IE (which fires resize events automatically) but not in Firefox or other browsers. For example, if the parent container of the splitter changes size at times when the browser window does not resize, perhaps due to some other Javascript-based resizing of the parent container, add the code $("#MySplitter").trigger("resize") after that Javascript code to make the splitter resize.
The splitter plugin automatically sends a resize event to each pane whenever the splitbar is moved or the outer container is resized, so no extra code is needed to support resizing of nested splitter containers. For performance reasons, the splitter plugin caches the size of the padding/border/margin for the splitter container and both panes when the splitter is created. Do not change these values after creating the splitter.
Setting minimum pane sizes
When no size constraint options are specified for either pane, the plugin allows the splitbar to be moved so it totally obscures the content of one of the panes. The size of the two panes in the splitter (and thus the splitbar's range of motion) can be constrained using either CSS min-width properties on the element panes or by the options passed to the plugin when the splitter is created. For CSS properties, use pixel (px) units so the plugin can parse them. The options object values are also numbers assumed to be in pixels.
Styling the splitbar
When the plugin initializes the splitter, it creates the splitbar element that goes between the two panes. It automatically assigns the class vsplitbar to vertical splitters and hsplitbar to horizontal ones. You can change the class name by passing the splitbarClass string to the plugin.
By default, when the mouse is over the splitbar it changes to a two-headed arrow cursor in the direction of motion (e-resize or n-resize). The Skinny Splitbar demo shows how to add a cursor property to the splitbar's stylesheet rule to override this.
Using the docking feature
The splitter has an option that lets the code or user "dock" the splitbar to one side of the splitter, essentially hiding one pane and using the entire splitter area for the other pane. To use this option, specify the dock option when creating the splitter. If you specify dock: true, the splitter will allow the splitbar to be docked only by code.
The other alternative is to pass one of leftDock, rightDock, topDock, bottomDock as a string, which specifies the default docking side.
Options reference
Most options can be controlled either by code or by markup. To specify an option in code, pass its value via a property in the object passed into the plugin when the splitter is created. Dimensions such as initial, minimum and maximum widths can be specified in the stylesheet properties for the splitter container or the two panes.
activeClass
When a splitbar move is in progress, the plugin adds the activeClass class to the splitbar element. By default it is "active". This class name is generally used in a stylesheet to provide special splitbar effects such as a background color change.
anchorToWindow
When you specify anchorToWindow: true, the splitter will adjust its size to fill the remaining height of the browser window. This feature is used in the 3-Pane and 3-Column demos. As with resizeOnWindow, this will also make the splitter resize itself when the window.resize event fires. Note: This option requires you to include the jQuery dimensions plugin.
cookie
The splitter plugin can save and retrieve the last position of the splitbar using cookies. To use this feature, specify the name of a cookie to use via the cookie property. If no cookie property is used or the cookie is missing, the splitbar will initialize to its normal initial state as specified by the sizeLeft/Right/Top/Bottom properties each time the page is loaded.
cookieExpires, cookiePath
When a cookie is given, cookieExpires specifies the number of days before the cookie expires. By default it is 365 days. Similarly, cookiePath specifies the path for the cookie. By default it is document.location.pathname, so that the cookie for the splitter information is only sent to the site when that specific URL is visited.
cursor
By default, the splitter plugin does not use a custom cursor while the mouse is hovering over the splitbar. You can define the cursor property when creating the splitter. Alternatively, you can specify one by adding the cursor CSS property to the vsplitbar or hsplitbar styles, as shown in most of the demos.
minLeft, minRight, minTop, minBottom, maxLeft, maxRight, maxTop, maxBottom
Set these properties (in pixels) to constrain the splitbar's travel and keep a pane from getting too large or small. The values can also be set using the min-height and min-width style values for either of the two panes. If you provide multiple values, make sure that they do not conflict with each other or the size of the parent container. For example, a vertical splitter that is a fixed width of 200 pixels cannot have both minLeft:120 and minRight:120.
outline
Specifies whether the splitter should resize the panes in real time as the splitbar is moved with the mouse. When this is set to true, the plugin moves an "outlined" copy of the splitbar and only resizes the panes when the mouse button is released. The default is false yielding non-outlined motion. If you experience flickering or sluggish resizing, try this option.
pxPerKey
When the keyboard is used to move the splitbar, this number specifies how many pixels the splitbar should move on each keypress. The default is 8 pixels. If the splitbar reaches one of the limits specified for the panes being split, it will move as far it can (e.g, it may move 3 out of the 8 pixels before being stopped).
resizeToWidth
When you specify resizeToWidth: true, the splitter will automatically resize itself whenever the window.resize event fires. This is handy for the common situation where the splitter's size is proportional to the browser window width--for example, it has a fluid 100% width. By default, the splitter will only resize when it is sent a resize event.
sizeLeft, sizeRight, sizeTop, sizeBottom
Define one (and only one) of these properties to set the size of a pane and thus the splitbar's initial position. If the property is set to true, the plugin retrieves the initial size of that pane from the width/height stylesheet rules. You can also set the property to a number representing the initial size of the pane in pixels. When the splitter container is resized, that pane is preferentially held at its current size. If none of these are specified, the splitbar is placed in the center of the splitter area.
splitbarClass
The plugin adds the splitbar element to the splitter container and sets a class name on the element so that it can be referenced in stylesheet rules. By default the class name is "vsplitbar" for vertical splitters and "hsplitbar" for horizontal ones.
splitbarKey
Specifies a key (letter or digit) that can be pressed in combination with Alt-Shift (IE/Firefox) or Shift-Esc (Opera) to select the splitbar. Once it is selected, you can use the arrow keys to move it. Note that some letters are already used for browser-specific menu accelerators and they may conflict. If no splitbarKey is provided, the splitbar can still be selected by tabbing. To disable keyboard splitter operation, set tabIndex: -1 and do not define splitbarKey.
splitVertical, splitHorizontal, type
Determines whether the splitter is split in the horizontal or vertical direction. By default, a vertical splitter is created. You can either set type to the single-character string "v" or "h", or alternately set one of splitVertical or splitHorizontal to true.
tabIndex
The splitbar can be moved by pressing tab until the splitbar is selected, then pressing arrow keys to move the bar. To change the tab order, provide a number for tabIndex (0 to 32000); non-unique tabIndex values are tabbed in HTML source order. The default tabIndex is 0; since focusable elements have tabIndex=0 by default, most will appear in HTML source order as well. To take the splitbar out of the tab order completely, use -1 for tabIndex. (The splitbar can still be selected by keyboard if an accessKey is specified.)