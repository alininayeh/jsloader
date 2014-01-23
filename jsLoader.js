(function() {
    "use strict";

    /* Load js files and perform a callback function when loaded */
    window.JsLoader = {
        /**
        * Private method for logging if there is a console
        * @param {string} message - The string that needs to be outputted
        * @param {string} type - The method of the console. Can be: assert, clear, count, debug, dir, dirxml, error,
        *                                                           exception, group, groupCollapsed, groupEnd, info, log,
        *                                                           markTimeline, profile, profileEnd, table, time, timeEnd, 
        *                                                           timeStamp, trace, warn
        */
        '_log': function(message, type) {
            var self = this;

            window.console = window.console || {};

            if(!type) {
                type = 'log';
            }

            if(window.console[type]) {
                window.console[type](message);
            }
        },
        /**
        * Private method for the JsLoader object for attaching a <script> tag to the body and loading a file
        * @param {string} path  - The name of the file that needs to be loaded
        * @param {function} callback - The function that is called after the file is loaded
        * @param {boolean} - debug - The debug mode (true if we want to write into the console)
        */
        '_loadFile': function(path, callback, debug) {
            var self = this;

            if(debug) {
                self._log('loading file: ' + path);
            }

            function isLoaded() {
                if(!window.loadedScripts) {
                    window.loadedScripts = {};
                }

                window.loadedScripts[path] = true;

                if(debug) {
                    self._log(path + ' loaded');
                }
            }

            if(window.loadedScripts && window.loadedScripts[path]) {
                if(debug) {
                    self._log(path + ' has already been loaded');
                }

                callback();
                return;
            }

            var script = document.createElement('script');

            if(script.onreadystatechange !== undefined) {
                script.onreadystatechange = function() {
                    if(script.readyState === 'complete' || script.readyState === 'loaded') {
                        isLoaded();
                        callback();
                    }
                };
            }
            else {
                script.onload = function(){
                    isLoaded();
                    callback();
                };
            }


            script.src = path;

            document.body.appendChild(script);
        },
        /**
        * The public method for the JsLoader object
        * @param {string|array} files  - The name of the file that needs to be loaded (ex.: 'path/to/file.js')
                                                or
                                                A list of file names that need to be loaded (ex.: ['path/to/file1.js', 'path/to/file2.js'])
                                                or
                                                A list of file objects that need to be loaded (ex.: [{src: 'path/to/file1.js', callback: function() {...}}, {src: 'path/to/file2.js'}])
                                                or
                                                An object with all parameters (ex.: {files: [array], callback: [requestCallback], debug: [boolean]})
        * @param {function} callback - The function that is called after all files were loaded
        * @param {boolean} - debug - The debug mode (true if we want to write into the console)
        */
        'loadFiles': function(files, callback, debug) {
            var self = this;

            // Check if the parameters are separated or if we have only one options object
            var params = {};

            if(files['files']) {
                params = files;
            }
            else {
                params['files'] = files;
                params['callback'] = callback;
                params['debug'] = debug || false;
            }

            // Cache the params
            var _files = params['files'],
                _callback = params['callback'],
                _debug = params['debug'];

            // Add files to the file list
            var fileList = [], i = 0, n = 0;

            // if there is only one file and it is given as a string
            if(typeof(_files) == 'string') {
                fileList.push(_files);
            }
            // if the files are given as an array
            else {
                n = _files.length;

                for(i = 0; i < n; i++) {
                    // if the file is given as a string
                    if(typeof(_files[i]) == 'string') {
                        fileList.push(_files[i]);
                    }
                    // if the file is given as an object
                    else {
                        fileList.push(_files[i]['src']);
                    }
                }
            }

            // Add callbacks to the callback list
            var callbackList = [];

            // n is the length of the files array, as stated above
            if(n > 0) {
                var noop = function() {};

                for(i = 0; i < n; i++) {
                    if(_files[i]['callback']) {
                        callbackList.push(_files[i]['callback']);
                    }
                    else {
                        callbackList.push(noop);
                    }
                }
            }

            // load files one after each other
            i = 0;

            function loadFile() {
                self._loadFile(
                    fileList[i],
                    function() {
                        if(callbackList.length > 0) {
                            callbackList[i]();
                        }

                        var next = fileList[i + 1];
                        i++;

                        if(next) {
                            loadFile();
                        }
                        else {
                            _callback();
                        }
                    },
                    _debug
                );
            }

            loadFile();
        }
    };
})();