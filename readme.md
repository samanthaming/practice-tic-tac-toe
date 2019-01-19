# Tic Tac Toe

Versions:

- Using data to create cell (no component)
- Using component to create cell

## Create Bus (my notes)

1. Sending Event (Child)

_HTML_

```html
<!-- Parent Component -->
<Child v-on:click="emitMethod" />
```

```javascript
methods: {
  emitMethod () {
    // use "this"
    this.$emit('event-name', payLoad);
  }
}
```

2. Receiving Event (Parent)

_HTML_

```html
<div v-on:event-name="receiveMethod">
</div>
```

```javascript
methods: {
  receiveMethod(payload) {
  }
}
```

### Alternate: Central Bus Article

[Medium: EventBus to communicate between Vue Components](https://medium.com/@andrejsabrickis/https-medium-com-andrejsabrickis-create-simple-eventbus-to-communicate-between-vue-js-components-cdc11cd59860)

1. Create Central Bus

```javascript
const bus = new Vue();
```

2. Sending Event

_HTML_

```html
<div v-on:click="emitMethod">
</div>
```

```javascript
// Child Component

methods: {
  emitMethod () {
      bus.$emit('event-name', payLoad);
  }
}
```

3. Receiving

```javascript
// Parent Component

mounted () {
  bus.$on('event-name', function (payLoad) {
    // ...
  });
}
```

## Listen to `props` changes with `watch`

[stack overflow](https://stackoverflow.com/questions/44584292/vuejs-2-0-how-to-listen-for-props-changes)

1. Trigger on Parent

_HTML_

```html
<button v-on:click="restart">Restart</button>

<Child :some-prop="parentValue" />
```

```javascript
restart() {
  this.parentValue = 'parent';
}
```

2. Check for change in Child

```javascript
props: ['someProp'],
data() {
  return {
    child: 'baby',
  }
}
watch: {
   someProp()  {
     this.child = 'wahhh'
   }
}
```

**Note** The parameter in `watch`

```javascript
watch: {
  someProp(newValue, oldValue) {
    // newValue -> true ???
    // oldValue -> 'parent'
  }
}
```
