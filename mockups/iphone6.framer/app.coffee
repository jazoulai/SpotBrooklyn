SBK = Framer.Importer.load "imported/mockup_iphone_6"

# Include Hammer.js for user events

HammerEvents =
	
	Tap: "tap"
	DoubleTap: "doubletap"
	Hold: "hold"
	Touch: "touch"
	Release: "release"
	Gesture: "gesture"

	Swipe: "swipe"
	SwipeUp: "swipeup"
	SwipeDown: "swipedown"
	SwipeLeft: "swipeleft"
	SwipeRight: "swiperight"
	
	Transform: "transform"
	TransformStart: "transformstart"
	TransformEnd: "transformend"

	Rotate: "rotate"

	Pinch: "pinch"
	PinchIn: "pinchin"
	PinchOut: "pinchout"
	
	Drag: "drag"
	DragStart: "dragstart"
	DragEnd: "dragend"

# Add the Hammer events to the base Framer events
window.Events = _.extend Events, HammerEvents

# Patch the on method on layers to listen to Hammer events
class HammerLayer extends Framer.Layer
	
	on: (eventName, f) ->
		
		if eventName in _.values(HammerEvents)
			@ignoreEvents = false			
			hammer = Hammer(@_element).on eventName, f
		
		else
			super eventName, f

# Replace the default Layer with the HammerLayer
window.Layer = HammerLayer

# end Hammer.js init


mapContainer = new Layer
	x: 0
	y: 0
	width: 750
	height: 515


map = new Layer
	width: 750
	height: 515
	image: "images/sbk_z16_v1.jpg"
	superLayer: mapContainer
	
map.center()

map.on Events.Tap, ->
	print "Drag!"

###

# init some vars to save relevant properties
savecurrentx = map.x
savecurrenty = map.y
savecurrentscale = map.scale

# two vars for the reset animation (doubletap)
resetx = map.x
resety = map.y



map.on Events.Drag, ->
	map.animateStop()
	map.x = savecurrentx + event.gesture.deltaX
	map.y = savecurrenty + event.gesture.deltaY
	map.html = "X:#{utils.round(map.x,0)} Y:#{utils.round(map.y,0)}"

map.on Events.Pinch, ->
	map.animateStop()
	
	if map.scale > .8
			map.scale = savecurrentscale + event.gesture.scale - 1
		else
			map.scale = .81
	map.html = "scale: #{utils.round(map.scale,1)} rotation: #{utils.round(map.rotation,1)}"
	
# on release - independent of the gesture - save all relevant properites	
map.on 'release', ->
	savecurrentx = map.x
	savecurrenty = map.y
	savecurrentscale = map.scale
	savecurrentrotation = map.rotation
	map.html = "pinch to zoom"
###