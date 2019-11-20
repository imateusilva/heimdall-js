<h1 align="center">Heimdall</h1>
<p align="center">
  Heimdall is a simple and light-weight package that implements the Observer Pattern
</p>

## Installation
```sh
$ npm install heimdall-js
```
or
```sh
$ yarn add heimdall-js
```
## Usage
#### Notify all
You can notify all registered observers in a subject:
```javascript
import Heimdall from 'heimdall-js';

// First param is just the observer name (used to create the context)
const keyboardListener = Heimdall.subject('keyboard', (notify) => {
    function handleKeypress({ key }) {
        notify({ key });
    }

    document.addEventListener('keypress', handleKeypress);
});

keyboardListener.subscribe((data) => console.log(data));
```
#### Notify specific observers
But if you want to notify only one or more specific observers... Yes, you can do it!

In this case, you will need to add a name to your observers, like on the last code line:
```javascript
import Heimdall from 'heimdall-js';

const keyboardListener = Heimdall.subject('keyboard', (notify) => {
    function handleKeypress({ key }) {
        notify({ key }, 'observer1'); // Notify only one observer
        // or...
        // notify({ key }, ['observer1', 'observer2']); // Notify multiple observers
    }

    document.addEventListener('keypress', handleKeypress);
});

// Set the observer name as the first param
keyboardListener.subscribe('observer1', (data) => console.log(data));
```

#### Unsubscribe observers
If you want to unsubscribe a single observer you'll need to name him, but, you can run the `ubsubscribeAll` method to remove all observers (named or not).

```javascript
import Heimdall from 'heimdall-js';

const keyboardListener = Heimdall.subject('keyboard', (notify) => {
    function handleKeypress({ key }) {
        notify({ key });
    }

    document.addEventListener('keypress', handleKeypress);
});

keyboardListener.subscribe((data) => console.log(data));
keyboardListener.subscribe('observer2', (data) => console.log(data));

keyboardListener.unsubscribe('observer2');
keyboardListener.unsubscribeAll();
```

# That's all folks!
Simple like everything should be!
