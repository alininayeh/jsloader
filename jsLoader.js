/* Load js files and perform a callback function when loaded */
var jsLoader = {
    'loadFile': function(path, callback) {
        var self = this;

        console.log('loading file: ' + path);

        function isLoaded() {
            if(!window.loadedScripts) {
                window.loadedScripts = {};
            }

            window.loadedScripts[path] = true;
        }

        if(window.loadedScripts && window.loadedScripts[path]) {
            console.log(path + ' is already loaded');
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
            }
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
    'loadFiles': function(files, callback) {
        var self = this;

        var i = 0;

        function loadFile() {
            self.loadFile(files[i], function() {
                var next = files[i + 1];
                i++;

                if(next) {
                    loadFile();
                }
                else {
                    callback();
                }
            });
        }

        loadFile();
    }
}