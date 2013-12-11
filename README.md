jsLoader
===

A little script that loads asynchronously other scripts then executes a callback function. If an array of files is given they are loaded in the same order as their order in the array.

Quick user guide
---

The jsLoader object has 2 methods: *loadFile* and *loadFiles*.

### *loadFile* - loads a single external or local file ###

Synthax: 
~~~
jsLoader.loadFile(filename, callback);
~~~


Sample code:

~~~
jsLoader.loadFile(
    'localJsFile.js',
    function() {
        addMessage('1. localJsFile.js loaded');
    }
);
~~~

### *loadFiles* - loads multiple external or local files ###

Synthax: 
~~~
jsLoader.loadFiles(arrayOfNames, callback);
~~~


Sample code:

~~~
jsLoader.loadFiles(
    ['http://cdnjs.cloudflare.com/ajax/libs/jquery/1.10.2/jquery.js', 'http://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js', 'anotherLocalJsFile.js'],
    function() {
        addMessage('4. jquery.js, jquery-ui.min.js and anotherLocalJsFile.js loaded');
    }
);
~~~


Demo
---

You can see a demo if you open the demo.html file.
