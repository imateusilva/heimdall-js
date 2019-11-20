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
##### Notify all
You can notify all registered observers in a subject:
```javascript
import Heimdall from 'heimdall-js';

const keyboardListener = Heimdall.subject('keyboard', (notify) => {
    function handleKeypress({ key }) {
        notify({ key });
    }

    document.addEventListener('keypress', handleKeypress);
});

keyboardListener.subscribe((data) => console.log(data));
```
##### Notify specific observers
But if you want to notify only one or more specific observers, you can do something like this:
```javascript
import Heimdall from 'heimdall-js';

const keyboardListener = Heimdall.subject('keyboard', (notify) => {
    function handleKeypress({ key }) {
        notify({ key }, 'observer1'); // String
        // notify({ key }, ['observer1', 'observer2']); // You can use an array as wel
    }

    document.addEventListener('keypress', handleKeypress);
});

// Set the observer name as the first param
keyboardListener.subscribe('observer1', (data) => console.log(data));
```
