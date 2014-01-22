JsLoader
===

A little script that loads asynchronously other scripts then executes a callback function. If an array of files is given they are loaded in the same order as their order in the array.

Quick user guide
---

In order to use it just add **jsLoader.js** to your page. You can use the **loadFiles** method:

Synthax: 
~~~
jsLoader.loadFiles({string|array} files, {function} callback, [{boolean} debug]);
~~~


### Sample codes:

- Load a single file:

~~~
JsLoader.loadFiles(
    'localJsFile.js',
    function() {
        addMessage('1. Loaded a single file (localJsFile.js) and executed a callback');
    }
);
~~~

- Load more files and set the debug mode to on:

~~~
JsLoader.loadFiles(
    ['localJsFile.js', 'anotherLocalJsFile.js'],
    function() {
        addMessage('2. Loaded more files (localJsFile.js and anotherLocalJsFile.js) and executed a callback');
    },
    true
);
~~~

- Load more files, do a callback for one file, then do a final callback:

~~~
JsLoader.loadFiles(
    [
        {src: 'localJsFile.js', callback: function() {console.log('callback: loaded localJsFile.js')}},
        'anotherLocalJsFile.js'
    ],
    function() {
        addMessage('3. Loaded more files (localJsFile.js and anotherLocalJsFile.js), executed a callback after the 1st one was loaded (see console), then executed a callback after all files were loaded');
    },
    true
);
~~~

- You can use an object as the parameter for the function:

~~~
JsLoader.loadFiles(
    {
        files: [
            {src: 'localJsFile.js', callback: function() {console.log('callback: loaded localJsFile.js...')}},
            {src: 'anotherLocalJsFile.js', callback: function() {console.log('callback: ... and loaded anotherLocalJsFile.js')}}
        ],
        callback: function() {
            addMessage('4. Loaded more files (localJsFile.js and anotherLocalJsFile.js), did a callback after each one, then did a final callback');
        },
        debug: true
    }
);
~~~


Demo
---

You can see some exapmples in action if you download and open the demo.html file.
