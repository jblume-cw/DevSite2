/*! Built with IMPACT - impactjs.com */

(function(window) {
    "use strict";
    Number.prototype.map = function(istart, istop, ostart, ostop) {
        return ostart + (ostop - ostart) * ((this - istart) / (istop - istart));
    };
    Number.prototype.limit = function(min, max) {
        return Math.min(max, Math.max(min, this));
    };
    Number.prototype.round = function(precision) {
        precision = Math.pow(10, precision || 0);
        return Math.round(this * precision) / precision;
    };
    Number.prototype.floor = function() {
        return Math.floor(this);
    };
    Number.prototype.ceil = function() {
        return Math.ceil(this);
    };
    Number.prototype.toInt = function() {
        return (this | 0);
    };
    Number.prototype.toRad = function() {
        return (this / 180) * Math.PI;
    };
    Number.prototype.toDeg = function() {
        return (this * 180) / Math.PI;
    };
    Array.prototype.erase = function(item) {
        for (var i = this.length; i--;) {
            if (this[i] === item) {
                this.splice(i, 1);
            }
        }
        return this;
    };
    Array.prototype.random = function() {
        return this[Math.floor(Math.random() * this.length)];
    };
    Function.prototype.bind = Function.prototype.bind || function(oThis) {
        if (typeof this !== "function") {
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }
        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function() {},
            fBound = function() {
                return fToBind.apply((this instanceof fNOP && oThis ? this : oThis), aArgs.concat(Array.prototype.slice.call(arguments)));
            };
        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();
        return fBound;
    };
    window.ig = {
        game: null,
        debug: null,
        version: '1.21',
        global: window,
        modules: {},
        resources: [],
        ready: false,
        baked: false,
        nocache: '',
        ua: {},
        prefix: (window.ImpactPrefix || ''),
        lib: 'lib/',
        _current: null,
        _loadQueue: [],
        _waitForOnload: 0,
        $: function(selector) {
            return selector.charAt(0) == '#' ? document.getElementById(selector.substr(1)) : document.getElementsByTagName(selector);
        },
        $new: function(name) {
            return document.createElement(name);
        },
        copy: function(object) {
            if (!object || typeof(object) != 'object' || object instanceof HTMLElement || object instanceof ig.Class) {
                return object;
            } else if (object instanceof Array) {
                var c = [];
                for (var i = 0, l = object.length; i < l; i++) {
                    c[i] = ig.copy(object[i]);
                }
                return c;
            } else {
                var c = {};
                for (var i in object) {
                    c[i] = ig.copy(object[i]);
                }
                return c;
            }
        },
        merge: function(original, extended) {
            for (var key in extended) {
                var ext = extended[key];
                if (typeof(ext) != 'object' || ext instanceof HTMLElement || ext instanceof ig.Class) {
                    original[key] = ext;
                } else {
                    if (!original[key] || typeof(original[key]) != 'object') {
                        original[key] = (ext instanceof Array) ? [] : {};
                    }
                    ig.merge(original[key], ext);
                }
            }
            return original;
        },
        ksort: function(obj) {
            if (!obj || typeof(obj) != 'object') {
                return [];
            }
            var keys = [],
                values = [];
            for (var i in obj) {
                keys.push(i);
            }
            keys.sort();
            for (var i = 0; i < keys.length; i++) {
                values.push(obj[keys[i]]);
            }
            return values;
        },
        setVendorAttribute: function(el, attr, val) {
            var uc = attr.charAt(0).toUpperCase() + attr.substr(1);
            el[attr] = el['ms' + uc] = el['moz' + uc] = el['webkit' + uc] = el['o' + uc] = val;
        },
        getVendorAttribute: function(el, attr) {
            var uc = attr.charAt(0).toUpperCase() + attr.substr(1);
            return el[attr] || el['ms' + uc] || el['moz' + uc] || el['webkit' + uc] || el['o' + uc];
        },
        normalizeVendorAttribute: function(el, attr) {
            var prefixedVal = ig.getVendorAttribute(el, attr);
            if (!el[attr] && prefixedVal) {
                el[attr] = prefixedVal;
            }
        },
        getImagePixels: function(image, x, y, width, height) {
            var canvas = ig.$new('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            var ctx = canvas.getContext('2d');
            var ratio = ig.getVendorAttribute(ctx, 'backingStorePixelRatio') || 1;
            ig.normalizeVendorAttribute(ctx, 'getImageDataHD');
            var realWidth = image.width / ratio,
                realHeight = image.height / ratio;
            canvas.width = Math.ceil(realWidth);
            canvas.height = Math.ceil(realHeight);
            ctx.drawImage(image, 0, 0, realWidth, realHeight);
            return (ratio === 1) ? ctx.getImageData(x, y, width, height) : ctx.getImageDataHD(x, y, width, height);
        },
        module: function(name) {
            if (ig._current) {
                throw ("Module '" + ig._current.name + "' defines nothing");
            }
            if (ig.modules[name] && ig.modules[name].body) {
                throw ("Module '" + name + "' is already defined");
            }
            ig._current = {
                name: name,
                requires: [],
                loaded: false,
                body: null
            };
            ig.modules[name] = ig._current;
            ig._loadQueue.push(ig._current);
            return ig;
        },
        requires: function() {
            ig._current.requires = Array.prototype.slice.call(arguments);
            return ig;
        },
        defines: function(body) {
            ig._current.body = body;
            ig._current = null;
            ig._initDOMReady();
        },
        addResource: function(resource) {
            ig.resources.push(resource);
        },
        setNocache: function(set) {
            ig.nocache = set ? '?' + Date.now() : '';
        },
        log: function() {},
        assert: function(condition, msg) {},
        show: function(name, number) {},
        mark: function(msg, color) {},
        _loadScript: function(name, requiredFrom) {
            ig.modules[name] = {
                name: name,
                requires: [],
                loaded: false,
                body: null
            };
            ig._waitForOnload++;
            var path = ig.prefix + ig.lib + name.replace(/\./g, '/') + '.js' + ig.nocache;
            var script = ig.$new('script');
            script.type = 'text/javascript';
            script.src = path;
            script.onload = function() {
                ig._waitForOnload--;
                ig._execModules();
            };
            script.onerror = function() {
                throw ('Failed to load module ' + name + ' at ' + path + ' ' + 'required from ' + requiredFrom);
            };
            ig.$('head')[0].appendChild(script);
        },
        _execModules: function() {
            var modulesLoaded = false;
            for (var i = 0; i < ig._loadQueue.length; i++) {
                var m = ig._loadQueue[i];
                var dependenciesLoaded = true;
                for (var j = 0; j < m.requires.length; j++) {
                    var name = m.requires[j];
                    if (!ig.modules[name]) {
                        dependenciesLoaded = false;
                        ig._loadScript(name, m.name);
                    } else if (!ig.modules[name].loaded) {
                        dependenciesLoaded = false;
                    }
                }
                if (dependenciesLoaded && m.body) {
                    ig._loadQueue.splice(i, 1);
                    m.loaded = true;
                    m.body();
                    modulesLoaded = true;
                    i--;
                }
            }
            if (modulesLoaded) {
                ig._execModules();
            } else if (!ig.baked && ig._waitForOnload == 0 && ig._loadQueue.length != 0) {
                var unresolved = [];
                for (var i = 0; i < ig._loadQueue.length; i++) {
                    var unloaded = [];
                    var requires = ig._loadQueue[i].requires;
                    for (var j = 0; j < requires.length; j++) {
                        var m = ig.modules[requires[j]];
                        if (!m || !m.loaded) {
                            unloaded.push(requires[j]);
                        }
                    }
                    unresolved.push(ig._loadQueue[i].name + ' (requires: ' + unloaded.join(', ') + ')');
                }
                throw ('Unresolved (circular?) dependencies. ' + "Most likely there's a name/path mismatch for one of the listed modules:\n" +
                    unresolved.join('\n'));
            }
        },
        _DOMReady: function() {
            if (!ig.modules['dom.ready'].loaded) {
                if (!document.body) {
                    return setTimeout(ig._DOMReady, 13);
                }
                ig.modules['dom.ready'].loaded = true;
                ig._waitForOnload--;
                ig._execModules();
            }
            return 0;
        },
        _boot: function() {
            if (document.location.href.match(/\?nocache/)) {
                ig.setNocache(true);
            }
            ig.ua.pixelRatio = window.devicePixelRatio || 1;
            ig.ua.viewport = {
                width: window.innerWidth,
                height: window.innerHeight
            };
            ig.ua.screen = {
                width: window.screen.availWidth * ig.ua.pixelRatio,
                height: window.screen.availHeight * ig.ua.pixelRatio
            };
            ig.ua.iPhone = /iPhone/i.test(navigator.userAgent);
            ig.ua.iPhone4 = (ig.ua.iPhone && ig.ua.pixelRatio == 2);
            ig.ua.iPad = /iPad/i.test(navigator.userAgent);
            ig.ua.android = /android/i.test(navigator.userAgent);
            ig.ua.iOS = ig.ua.iPhone || ig.ua.iPad;
            ig.ua.mobile = ig.ua.iOS || ig.ua.android;
        },
        _initDOMReady: function() {
            if (ig.modules['dom.ready']) {
                ig._execModules();
                return;
            }
            ig._boot();
            ig.modules['dom.ready'] = {
                requires: [],
                loaded: false,
                body: null
            };
            ig._waitForOnload++;
            if (document.readyState === 'complete') {
                ig._DOMReady();
            } else {
                document.addEventListener('DOMContentLoaded', ig._DOMReady, false);
                window.addEventListener('load', ig._DOMReady, false);
            }
        }
    };
    ig.normalizeVendorAttribute(window, 'requestAnimationFrame');
    if (window.requestAnimationFrame) {
        var next = 1,
            anims = {};
        window.ig.setAnimation = function(callback, element) {
            var current = next++;
            anims[current] = true;
            var animate = function() {
                if (!anims[current]) {
                    return;
                }
                window.requestAnimationFrame(animate, element);
                callback();
            };
            window.requestAnimationFrame(animate, element);
            return current;
        };
        window.ig.clearAnimation = function(id) {
            delete anims[id];
        };
    } else {
        window.ig.setAnimation = function(callback, element) {
            return window.setInterval(callback, 1000 / 60);
        };
        window.ig.clearAnimation = function(id) {
            window.clearInterval(id);
        };
    }
    var initializing = false,
        fnTest = /xyz/.test(function() {
            xyz;
        }) ? /\bparent\b/ : /.*/;
    window.ig.Class = function() {};
    var inject = function(prop) {
        var proto = this.prototype;
        var parent = {};
        for (var name in prop) {
            if (typeof(prop[name]) == "function" && typeof(proto[name]) == "function" && fnTest.test(prop[name])) {
                parent[name] = proto[name];
                proto[name] = (function(name, fn) {
                    return function() {
                        var tmp = this.parent;
                        this.parent = parent[name];
                        var ret = fn.apply(this, arguments);
                        this.parent = tmp;
                        return ret;
                    };
                })(name, prop[name]);
            } else {
                proto[name] = prop[name];
            }
        }
    };
    window.ig.Class.extend = function(prop) {
        var parent = this.prototype;
        initializing = true;
        var prototype = new this();
        initializing = false;
        for (var name in prop) {
            if (typeof(prop[name]) == "function" && typeof(parent[name]) == "function" && fnTest.test(prop[name])) {
                prototype[name] = (function(name, fn) {
                    return function() {
                        var tmp = this.parent;
                        this.parent = parent[name];
                        var ret = fn.apply(this, arguments);
                        this.parent = tmp;
                        return ret;
                    };
                })(name, prop[name]);
            } else {
                prototype[name] = prop[name];
            }
        }

        function Class() {
            if (!initializing) {
                if (this.staticInstantiate) {
                    var obj = this.staticInstantiate.apply(this, arguments);
                    if (obj) {
                        return obj;
                    }
                }
                for (var p in this) {
                    if (typeof(this[p]) == 'object') {
                        this[p] = ig.copy(this[p]);
                    }
                }
                if (this.init) {
                    this.init.apply(this, arguments);
                }
            }
            return this;
        }
        Class.prototype = prototype;
        Class.prototype.constructor = Class;
        Class.extend = window.ig.Class.extend;
        Class.inject = inject;
        return Class;
    };
})(window);

// lib/impact/image.js
ig.baked = true;
ig.module('impact.image').defines(function() {
    "use strict";
    ig.Image = ig.Class.extend({
        data: null,
        width: 0,
        height: 0,
        loaded: false,
        failed: false,
        loadCallback: null,
        path: '',
        staticInstantiate: function(path) {
            return ig.Image.cache[path] || null;
        },
        init: function(path) {
            this.path = path;
            this.load();
        },
        load: function(loadCallback) {
            if (this.loaded) {
                if (loadCallback) {
                    loadCallback(this.path, true);
                }
                return;
            } else if (!this.loaded && ig.ready) {
                this.loadCallback = loadCallback || null;
                this.data = new Image();
                this.data.onload = this.onload.bind(this);
                this.data.onerror = this.onerror.bind(this);
                this.data.src = ig.prefix + this.path + ig.nocache;
            } else {
                ig.addResource(this);
            }
            ig.Image.cache[this.path] = this;
        },
        reload: function() {
            this.loaded = false;
            this.data = new Image();
            this.data.onload = this.onload.bind(this);
            this.data.src = this.path + '?' + Date.now();
        },
        onload: function(event) {
            this.width = this.data.width;
            this.height = this.data.height;
            this.loaded = true;
            if (ig.system.scale != 1) {
                this.resize(ig.system.scale);
            }
            if (this.loadCallback) {
                this.loadCallback(this.path, true);
            }
        },
        onerror: function(event) {
            this.failed = true;
            if (this.loadCallback) {
                this.loadCallback(this.path, false);
            }
        },
        resize: function(scale) {
            var origPixels = ig.getImagePixels(this.data, 0, 0, this.width, this.height);
            var widthScaled = this.width * scale;
            var heightScaled = this.height * scale;
            var scaled = ig.$new('canvas');
            scaled.width = widthScaled;
            scaled.height = heightScaled;
            var scaledCtx = scaled.getContext('2d');
            var scaledPixels = scaledCtx.getImageData(0, 0, widthScaled, heightScaled);
            for (var y = 0; y < heightScaled; y++) {
                for (var x = 0; x < widthScaled; x++) {
                    var index = (Math.floor(y / scale) * this.width + Math.floor(x / scale)) * 4;
                    var indexScaled = (y * widthScaled + x) * 4;
                    scaledPixels.data[indexScaled] = origPixels.data[index];
                    scaledPixels.data[indexScaled + 1] = origPixels.data[index + 1];
                    scaledPixels.data[indexScaled + 2] = origPixels.data[index + 2];
                    scaledPixels.data[indexScaled + 3] = origPixels.data[index + 3];
                }
            }
            scaledCtx.putImageData(scaledPixels, 0, 0);
            this.data = scaled;
        },
        draw: function(targetX, targetY, sourceX, sourceY, width, height) {
            if (!this.loaded) {
                return;
            }
            var scale = ig.system.scale;
            sourceX = sourceX ? sourceX * scale : 0;
            sourceY = sourceY ? sourceY * scale : 0;
            width = (width ? width : this.width) * scale;
            height = (height ? height : this.height) * scale;
            ig.system.context.drawImage(this.data, sourceX, sourceY, width, height, ig.system.getDrawPos(targetX), ig.system.getDrawPos(targetY), width, height);
            ig.Image.drawCount++;
        },
        drawTile: function(targetX, targetY, tile, tileWidth, tileHeight, flipX, flipY) {
            tileHeight = tileHeight ? tileHeight : tileWidth;
            if (!this.loaded || tileWidth > this.width || tileHeight > this.height) {
                return;
            }
            var scale = ig.system.scale;
            var tileWidthScaled = Math.floor(tileWidth * scale);
            var tileHeightScaled = Math.floor(tileHeight * scale);
            var scaleX = flipX ? -1 : 1;
            var scaleY = flipY ? -1 : 1;
            if (flipX || flipY) {
                ig.system.context.save();
                ig.system.context.scale(scaleX, scaleY);
            }
            ig.system.context.drawImage(this.data, (Math.floor(tile * tileWidth) % this.width) * scale, (Math.floor(tile * tileWidth / this.width) * tileHeight) * scale, tileWidthScaled, tileHeightScaled, ig.system.getDrawPos(targetX) * scaleX - (flipX ? tileWidthScaled : 0), ig.system.getDrawPos(targetY) * scaleY - (flipY ? tileHeightScaled : 0), tileWidthScaled, tileHeightScaled);
            if (flipX || flipY) {
                ig.system.context.restore();
            }
            ig.Image.drawCount++;
        }
    });
    ig.Image.drawCount = 0;
    ig.Image.cache = {};
    ig.Image.reloadCache = function() {
        for (var path in ig.Image.cache) {
            ig.Image.cache[path].reload();
        }
    };
});

// lib/impact/font.js
ig.baked = true;
ig.module('impact.font').requires('impact.image').defines(function() {
    "use strict";
    ig.Font = ig.Image.extend({
        widthMap: [],
        indices: [],
        firstChar: 32,
        alpha: 1,
        letterSpacing: 1,
        lineSpacing: 0,
        onload: function(ev) {
            this._loadMetrics(this.data);
            this.parent(ev);
        },
        widthForString: function(text) {
            if (text.indexOf('\n') !== -1) {
                var lines = text.split('\n');
                var width = 0;
                for (var i = 0; i < lines.length; i++) {
                    width = Math.max(width, this._widthForLine(lines[i]));
                }
                return width;
            } else {
                return this._widthForLine(text);
            }
        },
        _widthForLine: function(text) {
            var width = 0;
            for (var i = 0; i < text.length; i++) {
                width += this.widthMap[text.charCodeAt(i) - this.firstChar] + this.letterSpacing;
            }
            return width;
        },
        heightForString: function(text) {
            return text.split('\n').length * (this.height + this.lineSpacing);
        },
        draw: function(text, x, y, align) {
            if (typeof(text) != 'string') {
                text = text.toString();
            }
            if (text.indexOf('\n') !== -1) {
                var lines = text.split('\n');
                var lineHeight = this.height + this.lineSpacing;
                for (var i = 0; i < lines.length; i++) {
                    this.draw(lines[i], x, y + i * lineHeight, align);
                }
                return;
            }
            if (align == ig.Font.ALIGN.RIGHT || align == ig.Font.ALIGN.CENTER) {
                var width = this._widthForLine(text);
                x -= align == ig.Font.ALIGN.CENTER ? width / 2 : width;
            }
            if (this.alpha !== 1) {
                ig.system.context.globalAlpha = this.alpha;
            }
            for (var i = 0; i < text.length; i++) {
                var c = text.charCodeAt(i);
                x += this._drawChar(c - this.firstChar, x, y);
            }
            if (this.alpha !== 1) {
                ig.system.context.globalAlpha = 1;
            }
            ig.Image.drawCount += text.length;
        },
        _drawChar: function(c, targetX, targetY) {
            if (!this.loaded || c < 0 || c >= this.indices.length) {
                return 0;
            }
            var scale = ig.system.scale;
            var charX = this.indices[c] * scale;
            var charY = 0;
            var charWidth = this.widthMap[c] * scale;
            var charHeight = (this.height - 2) * scale;
            ig.system.context.drawImage(this.data, charX, charY, charWidth, charHeight, ig.system.getDrawPos(targetX), ig.system.getDrawPos(targetY), charWidth, charHeight);
            return this.widthMap[c] + this.letterSpacing;
        },
        _loadMetrics: function(image) {
            this.height = image.height - 1;
            this.widthMap = [];
            this.indices = [];
            var px = ig.getImagePixels(image, 0, image.height - 1, image.width, 1);
            var currentChar = 0;
            var currentWidth = 0;
            for (var x = 0; x < image.width; x++) {
                var index = x * 4 + 3;
                if (px.data[index] > 127) {
                    currentWidth++;
                } else if (px.data[index] == 0 && currentWidth) {
                    this.widthMap.push(currentWidth);
                    this.indices.push(x - currentWidth);
                    currentChar++;
                    currentWidth = 0;
                }
            }
            this.widthMap.push(currentWidth);
            this.indices.push(x - currentWidth);
        }
    });
    ig.Font.ALIGN = {
        LEFT: 0,
        RIGHT: 1,
        CENTER: 2
    };
});

// lib/impact/sound.js
ig.baked = true;
ig.module('impact.sound').defines(function() {
    "use strict";
    ig.SoundManager = ig.Class.extend({
        clips: {},
        volume: 1,
        format: null,
        init: function() {
            if (!ig.Sound.enabled || !window.Audio) {
                ig.Sound.enabled = false;
                return;
            }
            var probe = new Audio();
            for (var i = 0; i < ig.Sound.use.length; i++) {
                var format = ig.Sound.use[i];
                if (probe.canPlayType(format.mime)) {
                    this.format = format;
                    break;
                }
            }
            if (!this.format) {
                ig.Sound.enabled = false;
            }
        },
        load: function(path, multiChannel, loadCallback) {
            var realPath = ig.prefix + path.replace(/[^\.]+$/, this.format.ext) + ig.nocache;
            if (this.clips[path]) {
                if (multiChannel && this.clips[path].length < ig.Sound.channels) {
                    for (var i = this.clips[path].length; i < ig.Sound.channels; i++) {
                        var a = new Audio(realPath);
                        a.load();
                        this.clips[path].push(a);
                    }
                }
                return this.clips[path][0];
            }
            var clip = new Audio(realPath);
            if (loadCallback) {
                clip.addEventListener('canplaythrough', function cb(ev) {
                    clip.removeEventListener('canplaythrough', cb, false);
                    loadCallback(path, true, ev);
                }, false);
                clip.addEventListener('error', function(ev) {
                    loadCallback(path, false, ev);
                }, false);
            }
            clip.preload = 'auto';
            clip.load();
            this.clips[path] = [clip];
            if (multiChannel) {
                for (var i = 1; i < ig.Sound.channels; i++) {
                    var a = new Audio(realPath);
                    a.load();
                    this.clips[path].push(a);
                }
            }
            return clip;
        },
        get: function(path) {
            var channels = this.clips[path];
            for (var i = 0, clip; clip = channels[i++];) {
                if (clip.paused || clip.ended) {
                    if (clip.ended) {
                        clip.currentTime = 0;
                    }
                    return clip;
                }
            }
            channels[0].pause();
            channels[0].currentTime = 0;
            return channels[0];
        }
    });
    ig.Music = ig.Class.extend({
        tracks: [],
        namedTracks: {},
        currentTrack: null,
        currentIndex: 0,
        random: false,
        _volume: 1,
        _loop: false,
        _fadeInterval: 0,
        _fadeTimer: null,
        _endedCallbackBound: null,
        init: function() {
            this._endedCallbackBound = this._endedCallback.bind(this);
            if (Object.defineProperty) {
                Object.defineProperty(this, "volume", {
                    get: this.getVolume.bind(this),
                    set: this.setVolume.bind(this)
                });
                Object.defineProperty(this, "loop", {
                    get: this.getLooping.bind(this),
                    set: this.setLooping.bind(this)
                });
            } else if (this.__defineGetter__) {
                this.__defineGetter__('volume', this.getVolume.bind(this));
                this.__defineSetter__('volume', this.setVolume.bind(this));
                this.__defineGetter__('loop', this.getLooping.bind(this));
                this.__defineSetter__('loop', this.setLooping.bind(this));
            }
        },
        disableMasterLoop: function() {
            this.masterLoop = false;
        },
        add: function(music, name) {
            if (!ig.Sound.enabled) {
                return;
            }
            this.masterLoop = true;
            var path = music instanceof ig.Sound ? music.path : music;
            var track = ig.soundManager.load(path, false);
            track.loop = this._loop;
            track.volume = this._volume;
            track.addEventListener('ended', this._endedCallbackBound, false);
            this.tracks.push(track);
            if (name) {
                this.namedTracks[name] = track;
            }
            if (!this.currentTrack) {
                this.currentTrack = track;
            }
        },
        next: function() {
            if (!this.tracks.length) {
                return;
            }
            this.stop();
            this.currentIndex = this.random ? Math.floor(Math.random() * this.tracks.length) : (this.currentIndex + 1) % this.tracks.length;
            this.currentTrack = this.tracks[this.currentIndex];
            if (this.masterLoop === false && this.currentIndex == 0) {
                this.stop();
            } else {
                this.play();
            }
        },
        pause: function() {
            if (!this.currentTrack) {
                return;
            }
            this.currentTrack.pause();
        },
        stop: function() {
            if (!this.currentTrack) {
                return;
            }
            this.currentTrack.pause();
            this.currentTrack.currentTime = 0;
        },
        play: function(name) {
            if (name && this.namedTracks[name]) {
                var newTrack = this.namedTracks[name];
                if (newTrack != this.currentTrack) {
                    this.stop();
                    this.currentTrack = newTrack;
                }
            } else if (!this.currentTrack) {
                return;
            }
            this.currentTrack.play();
        },
        getLooping: function() {
            return this._loop;
        },
        setLooping: function(l) {
            this._loop = l;
            for (var i in this.tracks) {
                this.tracks[i].loop = l;
            }
        },
        getVolume: function() {
            return this._volume;
        },
        setVolume: function(v) {
            this._volume = v.limit(0, 1);
            for (var i in this.tracks) {
                this.tracks[i].volume = this._volume;
            }
        },
        fadeOut: function(time) {
            if (!this.currentTrack) {
                return;
            }
            clearInterval(this._fadeInterval);
            this.fadeTimer = new ig.Timer(time);
            this._fadeInterval = setInterval(this._fadeStep.bind(this), 50);
        },
        _fadeStep: function() {
            var v = this.fadeTimer.delta().map(-this.fadeTimer.target, 0, 1, 0).limit(0, 1) * this._volume;
            if (v <= 0.01) {
                this.stop();
                this.currentTrack.volume = this._volume;
                clearInterval(this._fadeInterval);
            } else {
                this.currentTrack.volume = v;
            }
        },
        _endedCallback: function() {
            if (this._loop) {
                this.play();
            } else {
                this.next();
            }
        }
    });
    ig.Sound = ig.Class.extend({
        path: '',
        volume: 1,
        currentClip: null,
        multiChannel: true,
        init: function(path, multiChannel) {
            this.path = path;
            this.multiChannel = (multiChannel !== false);
            this.load();
        },
        load: function(loadCallback) {
            if (!ig.Sound.enabled) {
                if (loadCallback) {
                    loadCallback(this.path, true);
                }
                return;
            }
            if (ig.ready) {
                ig.soundManager.load(this.path, this.multiChannel, loadCallback);
            } else {
                ig.addResource(this);
            }
        },
        play: function() {
            if (!ig.Sound.enabled) {
                return;
            }
            this.currentClip = ig.soundManager.get(this.path);
            this.currentClip.volume = ig.soundManager.volume * this.volume;
            this.currentClip.play();
        },
        stop: function() {
            if (this.currentClip) {
                this.currentClip.pause();
                this.currentClip.currentTime = 0;
            }
        }
    });
    ig.Sound.FORMAT = {
        MP3: {
            ext: 'mp3',
            mime: 'audio/mpeg'
        },
        M4A: {
            ext: 'm4a',
            mime: 'audio/mp4; codecs=mp4a'
        },
        OGG: {
            ext: 'ogg',
            mime: 'audio/ogg; codecs=vorbis'
        },
        WEBM: {
            ext: 'webm',
            mime: 'audio/webm; codecs=vorbis'
        },
        CAF: {
            ext: 'caf',
            mime: 'audio/x-caf'
        }
    };
    ig.Sound.use = [ig.Sound.FORMAT.OGG, ig.Sound.FORMAT.MP3];
    ig.Sound.channels = 4;
    ig.Sound.enabled = true;
});

// lib/impact/loader.js
ig.baked = true;
ig.module('impact.loader').requires('impact.image', 'impact.font', 'impact.sound').defines(function() {
    "use strict";
    ig.Loader = ig.Class.extend({
        resources: [],
        gameClass: null,
        status: 0,
        done: false,
        _unloaded: [],
        _drawStatus: 0,
        _intervalId: 0,
        _loadCallbackBound: null,
        init: function(gameClass, resources) {
            this.gameClass = gameClass;
            this.resources = resources;
            this._loadCallbackBound = this._loadCallback.bind(this);
            for (var i = 0; i < this.resources.length; i++) {
                this._unloaded.push(this.resources[i].path);
            }
        },
        load: function() {
            ig.system.clear('#000');
            if (!this.resources.length) {
                this.end();
                return;
            }
            for (var i = 0; i < this.resources.length; i++) {
                this.loadResource(this.resources[i]);
            }
            this._intervalId = setInterval(this.draw.bind(this), 16);
        },
        loadResource: function(res) {
            res.load(this._loadCallbackBound);
        },
        end: function() {
            if (this.done) {
                return;
            }
            this.done = true;
            clearInterval(this._intervalId);
            ig.system.setGame(this.gameClass);
        },
        draw: function() {
            this._drawStatus += (this.status - this._drawStatus) / 5;
            var s = ig.system.scale;
            var w = ig.system.width * 0.6;
            var h = ig.system.height * 0.1;
            var x = ig.system.width * 0.5 - w / 2;
            var y = ig.system.height * 0.5 - h / 2;
            ig.system.context.fillStyle = '#000';
            ig.system.context.fillRect(0, 0, 480, 320);
            ig.system.context.fillStyle = '#fff';
            ig.system.context.fillRect(x * s, y * s, w * s, h * s);
            ig.system.context.fillStyle = '#000';
            ig.system.context.fillRect(x * s + s, y * s + s, w * s - s - s, h * s - s - s);
            ig.system.context.fillStyle = '#fff';
            ig.system.context.fillRect(x * s, y * s, w * s * this._drawStatus, h * s);
        },
        _loadCallback: function(path, status) {
            if (status) {
                this._unloaded.erase(path);
            } else {
                throw ('Failed to load resource: ' + path);
            }
            this.status = 1 - (this._unloaded.length / this.resources.length);
            if (this._unloaded.length == 0) {
                setTimeout(this.end.bind(this), 250);
            }
        }
    });
});

// lib/impact/timer.js
ig.baked = true;
ig.module('impact.timer').defines(function() {
    "use strict";
    ig.Timer = ig.Class.extend({
        target: 0,
        base: 0,
        last: 0,
        pausedAt: 0,
        init: function(seconds) {
            this.base = ig.Timer.time;
            this.last = ig.Timer.time;
            this.target = seconds || 0;
        },
        set: function(seconds) {
            this.target = seconds || 0;
            this.base = ig.Timer.time;
            this.pausedAt = 0;
        },
        reset: function() {
            this.base = ig.Timer.time;
            this.pausedAt = 0;
        },
        tick: function() {
            var delta = ig.Timer.time - this.last;
            this.last = ig.Timer.time;
            return (this.pausedAt ? 0 : delta);
        },
        delta: function() {
            return (this.pausedAt || ig.Timer.time) - this.base - this.target;
        },
        pause: function() {
            if (!this.pausedAt) {
                this.pausedAt = ig.Timer.time;
            }
        },
        unpause: function() {
            if (this.pausedAt) {
                this.base += ig.Timer.time - this.pausedAt;
                this.pausedAt = 0;
            }
        }
    });
    ig.Timer._last = 0;
    ig.Timer.time = Number.MIN_VALUE;
    ig.Timer.timeScale = 1;
    ig.Timer.maxStep = 0.05;
    ig.Timer.step = function() {
        var current = Date.now();
        var delta = (current - ig.Timer._last) / 1000;
        ig.Timer.time += Math.min(delta, ig.Timer.maxStep) * ig.Timer.timeScale;
        ig.Timer._last = current;
    };
});

// lib/impact/system.js
ig.baked = true;
ig.module('impact.system').requires('impact.timer', 'impact.image').defines(function() {
    "use strict";
    ig.System = ig.Class.extend({
        fps: 30,
        width: 320,
        height: 240,
        realWidth: 320,
        realHeight: 240,
        scale: 1,
        tick: 0,
        animationId: 0,
        newGameClass: null,
        running: false,
        delegate: null,
        clock: null,
        canvas: null,
        context: null,
        init: function(canvasId, fps, width, height, scale) {
            this.fps = fps;
            this.clock = new ig.Timer();
            this.canvas = ig.$(canvasId);
            this.resize(width, height, scale);
            this.context = this.canvas.getContext('2d');
            this.getDrawPos = ig.System.drawMode;
            if (this.scale != 1) {
                ig.System.scaleMode = ig.System.SCALE.CRISP;
            }
            ig.System.scaleMode(this.canvas, this.context);
        },
        resize: function(width, height, scale) {
            this.width = width;
            this.height = height;
            this.scale = scale || this.scale;
            this.realWidth = this.width * this.scale;
            this.realHeight = this.height * this.scale;
            this.canvas.width = this.realWidth;
            this.canvas.height = this.realHeight;
        },
        setGame: function(gameClass) {
            if (this.running) {
                this.newGameClass = gameClass;
            } else {
                this.setGameNow(gameClass);
            }
        },
        setGameNow: function(gameClass) {
            ig.game = new(gameClass)();
            ig.system.setDelegate(ig.game);
        },
        setDelegate: function(object) {
            if (typeof(object.run) == 'function') {
                this.delegate = object;
                this.startRunLoop();
            } else {
                throw ('System.setDelegate: No run() function in object');
            }
        },
        stopRunLoop: function() {
            ig.clearAnimation(this.animationId);
            this.running = false;
        },
        startRunLoop: function() {
            this.stopRunLoop();
            this.animationId = ig.setAnimation(this.run.bind(this), this.canvas);
            this.running = true;
        },
        clear: function(color) {
            this.context.fillStyle = color;
            this.context.fillRect(0, 0, this.realWidth, this.realHeight);
        },
        run: function() {
            ig.Timer.step();
            this.tick = this.clock.tick();
            this.delegate.run();
            ig.input.clearPressed();
            if (this.newGameClass) {
                this.setGameNow(this.newGameClass);
                this.newGameClass = null;
            }
        },
        getDrawPos: null
    });
    ig.System.DRAW = {
        AUTHENTIC: function(p) {
            return Math.round(p) * this.scale;
        },
        SMOOTH: function(p) {
            return Math.round(p * this.scale);
        },
        SUBPIXEL: function(p) {
            return p * this.scale;
        }
    };
    ig.System.drawMode = ig.System.DRAW.SMOOTH;
    ig.System.SCALE = {
        CRISP: function(canvas, context) {
            ig.setVendorAttribute(context, 'imageSmoothingEnabled', false);
            canvas.style.imageRendering = '-moz-crisp-edges';
            canvas.style.imageRendering = '-o-crisp-edges';
            canvas.style.imageRendering = '-webkit-optimize-contrast';
            canvas.style.imageRendering = 'crisp-edges';
            canvas.style.msInterpolationMode = 'nearest-neighbor';
        },
        SMOOTH: function(canvas, context) {
            ig.setVendorAttribute(context, 'imageSmoothingEnabled', true);
            canvas.style.imageRendering = '';
            canvas.style.msInterpolationMode = '';
        }
    };
    ig.System.scaleMode = ig.System.SCALE.SMOOTH;
});

// lib/impact/input.js
ig.baked = true;
ig.module('impact.input').defines(function() {
    "use strict";
    ig.KEY = {
        'MOUSE1': -1,
        'MOUSE2': -3,
        'MWHEEL_UP': -4,
        'MWHEEL_DOWN': -5,
        'BACKSPACE': 8,
        'TAB': 9,
        'ENTER': 13,
        'PAUSE': 19,
        'CAPS': 20,
        'ESC': 27,
        'SPACE': 32,
        'PAGE_UP': 33,
        'PAGE_DOWN': 34,
        'END': 35,
        'HOME': 36,
        'LEFT_ARROW': 37,
        'UP_ARROW': 38,
        'RIGHT_ARROW': 39,
        'DOWN_ARROW': 40,
        'INSERT': 45,
        'DELETE': 46,
        '_0': 48,
        '_1': 49,
        '_2': 50,
        '_3': 51,
        '_4': 52,
        '_5': 53,
        '_6': 54,
        '_7': 55,
        '_8': 56,
        '_9': 57,
        'A': 65,
        'B': 66,
        'C': 67,
        'D': 68,
        'E': 69,
        'F': 70,
        'G': 71,
        'H': 72,
        'I': 73,
        'J': 74,
        'K': 75,
        'L': 76,
        'M': 77,
        'N': 78,
        'O': 79,
        'P': 80,
        'Q': 81,
        'R': 82,
        'S': 83,
        'T': 84,
        'U': 85,
        'V': 86,
        'W': 87,
        'X': 88,
        'Y': 89,
        'Z': 90,
        'NUMPAD_0': 96,
        'NUMPAD_1': 97,
        'NUMPAD_2': 98,
        'NUMPAD_3': 99,
        'NUMPAD_4': 100,
        'NUMPAD_5': 101,
        'NUMPAD_6': 102,
        'NUMPAD_7': 103,
        'NUMPAD_8': 104,
        'NUMPAD_9': 105,
        'MULTIPLY': 106,
        'ADD': 107,
        'SUBSTRACT': 109,
        'DECIMAL': 110,
        'DIVIDE': 111,
        'F1': 112,
        'F2': 113,
        'F3': 114,
        'F4': 115,
        'F5': 116,
        'F6': 117,
        'F7': 118,
        'F8': 119,
        'F9': 120,
        'F10': 121,
        'F11': 122,
        'F12': 123,
        'SHIFT': 16,
        'CTRL': 17,
        'ALT': 18,
        'PLUS': 187,
        'COMMA': 188,
        'MINUS': 189,
        'PERIOD': 190
    };
    ig.Input = ig.Class.extend({
        bindings: {},
        actions: {},
        presses: {},
        locks: {},
        delayedKeyup: {},
        isUsingMouse: false,
        isUsingKeyboard: false,
        isUsingAccelerometer: false,
        mouse: {
            x: 0,
            y: 0
        },
        accel: {
            x: 0,
            y: 0,
            z: 0
        },
        initMouse: function() {
            if (this.isUsingMouse) {
                return;
            }
            this.isUsingMouse = true;
            var mouseWheelBound = this.mousewheel.bind(this);
            ig.system.canvas.addEventListener('mousewheel', mouseWheelBound, false);
            ig.system.canvas.addEventListener('DOMMouseScroll', mouseWheelBound, false);
            ig.system.canvas.addEventListener('contextmenu', this.contextmenu.bind(this), false);
            ig.system.canvas.addEventListener('mousedown', this.keydown.bind(this), false);
            ig.system.canvas.addEventListener('mouseup', this.keyup.bind(this), false);
            ig.system.canvas.addEventListener('mousemove', this.mousemove.bind(this), false);
            ig.system.canvas.addEventListener('touchstart', this.keydown.bind(this), false);
            ig.system.canvas.addEventListener('touchend', this.keyup.bind(this), false);
            ig.system.canvas.addEventListener('touchmove', this.mousemove.bind(this), false);
        },
        initKeyboard: function() {
            if (this.isUsingKeyboard) {
                return;
            }
            this.isUsingKeyboard = true;
            window.addEventListener('keydown', this.keydown.bind(this), false);
            window.addEventListener('keyup', this.keyup.bind(this), false);
        },
        initAccelerometer: function() {
            if (this.isUsingAccelerometer) {
                return;
            }
            window.addEventListener('devicemotion', this.devicemotion.bind(this), false);
        },
        mousewheel: function(event) {
            var delta = event.wheelDelta ? event.wheelDelta : (event.detail * -1);
            var code = delta > 0 ? ig.KEY.MWHEEL_UP : ig.KEY.MWHEEL_DOWN;
            var action = this.bindings[code];
            if (action) {
                this.actions[action] = true;
                this.presses[action] = true;
                this.delayedKeyup[action] = true;
                event.stopPropagation();
                event.preventDefault();
            }
        },
        mousemove: function(event) {
            var internalWidth = parseInt(ig.system.canvas.offsetWidth) || ig.system.realWidth;
            var scale = ig.system.scale * (internalWidth / ig.system.realWidth);
            var pos = {
                left: 0,
                top: 0
            };
            if (ig.system.canvas.getBoundingClientRect) {
                pos = ig.system.canvas.getBoundingClientRect();
            }
            var ev = event.touches ? event.touches[0] : event;
            this.mouse.x = (ev.clientX - pos.left) / scale;
            this.mouse.y = (ev.clientY - pos.top) / scale;
        },
        contextmenu: function(event) {
            if (this.bindings[ig.KEY.MOUSE2]) {
                event.stopPropagation();
                event.preventDefault();
            }
        },
        keydown: function(event) {
            var tag = event.target.tagName;
            if (tag == 'INPUT' || tag == 'TEXTAREA') {
                return;
            }
            var code = event.type == 'keydown' ? event.keyCode : (event.button == 2 ? ig.KEY.MOUSE2 : ig.KEY.MOUSE1);
            if (event.type == 'touchstart' || event.type == 'mousedown') {
                this.mousemove(event);
            }
            var action = this.bindings[code];
            if (action) {
                this.actions[action] = true;
                if (!this.locks[action]) {
                    this.presses[action] = true;
                    this.locks[action] = true;
                }
                event.stopPropagation();
                event.preventDefault();
            }
        },
        keyup: function(event) {
            var tag = event.target.tagName;
            if (tag == 'INPUT' || tag == 'TEXTAREA') {
                return;
            }
            var code = event.type == 'keyup' ? event.keyCode : (event.button == 2 ? ig.KEY.MOUSE2 : ig.KEY.MOUSE1);
            var action = this.bindings[code];
            if (action) {
                this.delayedKeyup[action] = true;
                event.stopPropagation();
                event.preventDefault();
            }
        },
        devicemotion: function(event) {
            this.accel = event.accelerationIncludingGravity;
        },
        bind: function(key, action) {
            if (key < 0) {
                this.initMouse();
            } else if (key > 0) {
                this.initKeyboard();
            }
            this.bindings[key] = action;
        },
        bindTouch: function(selector, action) {
            var element = ig.$(selector);
            var that = this;
            element.addEventListener('touchstart', function(ev) {
                that.touchStart(ev, action);
            }, false);
            element.addEventListener('touchend', function(ev) {
                that.touchEnd(ev, action);
            }, false);
        },
        unbind: function(key) {
            var action = this.bindings[key];
            this.delayedKeyup[action] = true;
            this.bindings[key] = null;
        },
        unbindAll: function() {
            this.bindings = {};
            this.actions = {};
            this.presses = {};
            this.locks = {};
            this.delayedKeyup = {};
        },
        state: function(action) {
            return this.actions[action];
        },
        pressed: function(action) {
            return this.presses[action];
        },
        released: function(action) {
            return this.delayedKeyup[action];
        },
        clearPressed: function() {
            for (var action in this.delayedKeyup) {
                this.actions[action] = false;
                this.locks[action] = false;
            }
            this.delayedKeyup = {};
            this.presses = {};
        },
        touchStart: function(event, action) {
            this.actions[action] = true;
            this.presses[action] = true;
            event.stopPropagation();
            event.preventDefault();
            return false;
        },
        touchEnd: function(event, action) {
            this.delayedKeyup[action] = true;
            event.stopPropagation();
            event.preventDefault();
            return false;
        }
    });
});

// lib/impact/impact.js
ig.baked = true;
ig.module('impact.impact').requires('dom.ready', 'impact.loader', 'impact.system', 'impact.input', 'impact.sound').defines(function() {
    "use strict";
    ig.main = function(canvasId, gameClass, fps, width, height, scale, loaderClass) {
        ig.system = new ig.System(canvasId, fps, width, height, scale || 1);
        ig.input = new ig.Input();
        ig.soundManager = new ig.SoundManager();
        ig.music = new ig.Music();
        ig.ready = true;
        var loader = new(loaderClass || ig.Loader)(gameClass, ig.resources);
        loader.load();
    };
});

// lib/impact/animation.js
ig.baked = true;
ig.module('impact.animation').requires('impact.timer', 'impact.image').defines(function() {
    "use strict";
    ig.AnimationSheet = ig.Class.extend({
        width: 8,
        height: 8,
        image: null,
        init: function(path, width, height) {
            this.width = width;
            this.height = height;
            this.image = new ig.Image(path);
        }
    });
    ig.Animation = ig.Class.extend({
        sheet: null,
        timer: null,
        sequence: [],
        flip: {
            x: false,
            y: false
        },
        pivot: {
            x: 0,
            y: 0
        },
        frame: 0,
        tile: 0,
        loopCount: 0,
        alpha: 1,
        angle: 0,
        totalFrames: 0,
        init: function(sheet, frameTime, sequence, stop) {
            this.sheet = sheet;
            this.pivot = {
                x: sheet.width / 2,
                y: sheet.height / 2
            };
            this.timer = new ig.Timer();
            this.frameTime = frameTime;
            if (typeof(sequence) == "string") {
                var seq = [];
                var p = sequence.indexOf("-");
                var startRange = parseInt(sequence.substring(0, p));
                var endRange = parseInt(sequence.substr(p + 1));
                for (var i = startRange; i <= endRange; i++) {
                    seq.push(i);
                }
                this.sequence = seq;
            } else {
                this.sequence = sequence;
            }
            this.totalFrames = this.sequence.length;
            this.stop = !!stop;
            this.tile = this.sequence[0];
        },
        rewind: function() {
            this.timer.set();
            this.loopCount = 0;
            this.tile = this.sequence[0];
            return this;
        },
        getTotalFrames: function() {
            return this.totalFrames;
        },
        gotoFrame: function(f) {
            this.timer.set(this.frameTime * -f);
            this.update();
        },
        gotoRandomFrame: function() {
            this.gotoFrame(Math.floor(Math.random() * this.sequence.length))
        },
        update: function() {
            var frameTotal = Math.floor(this.timer.delta() / this.frameTime);
            this.loopCount = Math.floor(frameTotal / this.sequence.length);
            if (this.stop && this.loopCount > 0) {
                this.frame = this.sequence.length - 1;
            } else {
                this.frame = frameTotal % this.sequence.length;
            }
            this.tile = this.sequence[this.frame];
        },
        draw: function(targetX, targetY) {
            var bbsize = Math.max(this.sheet.width, this.sheet.height);
            if (targetX > ig.system.width || targetY > ig.system.height || targetX + bbsize < 0 || targetY + bbsize < 0) {
                return;
            }
            if (this.alpha != 1) {
                ig.system.context.globalAlpha = this.alpha;
            }
            if (this.angle == 0) {
                this.sheet.image.drawTile(targetX, targetY, this.tile, this.sheet.width, this.sheet.height, this.flip.x, this.flip.y);
            } else {
                ig.system.context.save();
                ig.system.context.translate(ig.system.getDrawPos(targetX + this.pivot.x), ig.system.getDrawPos(targetY + this.pivot.y));
                ig.system.context.rotate(this.angle);
                this.sheet.image.drawTile(-this.pivot.x, -this.pivot.y, this.tile, this.sheet.width, this.sheet.height, this.flip.x, this.flip.y);
                ig.system.context.restore();
            }
            if (this.alpha != 1) {
                ig.system.context.globalAlpha = 1;
            }
        }
    });
});

// lib/impact/entity.js
ig.baked = true;
ig.module('impact.entity').requires('impact.animation', 'impact.impact').defines(function() {
    "use strict";
    ig.Entity = ig.Class.extend({
        id: 0,
        settings: {},
        size: {
            x: 16,
            y: 16
        },
        offset: {
            x: 0,
            y: 0
        },
        pos: {
            x: 0,
            y: 0
        },
        last: {
            x: 0,
            y: 0
        },
        vel: {
            x: 0,
            y: 0
        },
        accel: {
            x: 0,
            y: 0
        },
        friction: {
            x: 0,
            y: 0
        },
        maxVel: {
            x: 100,
            y: 100
        },
        zIndex: 0,
        gravityFactor: 1,
        standing: false,
        bounciness: 0,
        minBounceVelocity: 40,
        anims: {},
        animSheet: null,
        currentAnim: null,
        health: 10,
        type: 0,
        checkAgainst: 0,
        collides: 0,
        _killed: false,
        slopeStanding: {
            min: (44).toRad(),
            max: (136).toRad()
        },
        init: function(x, y, settings) {
            this.id = ++ig.Entity._lastId;
            this.pos.x = x;
            this.pos.y = y;
            ig.merge(this, settings);
        },
        addAnim: function(name, frameTime, sequence, stop) {
            if (!this.animSheet) {
                throw ('No animSheet to add the animation ' + name + ' to.');
            }
            var a = new ig.Animation(this.animSheet, frameTime, sequence, stop);
            this.anims[name] = a;
            if (!this.currentAnim) {
                this.currentAnim = a;
            }
            return a;
        },
        update: function() {
            this.last.x = this.pos.x;
            this.last.y = this.pos.y;
            this.vel.y += ig.game.gravity * ig.system.tick * this.gravityFactor;
            this.vel.x = this.getNewVelocity(this.vel.x, this.accel.x, this.friction.x, this.maxVel.x);
            this.vel.y = this.getNewVelocity(this.vel.y, this.accel.y, this.friction.y, this.maxVel.y);
            var mx = this.vel.x * ig.system.tick;
            var my = this.vel.y * ig.system.tick;
            var res = ig.game.collisionMap.trace(this.pos.x, this.pos.y, mx, my, this.size.x, this.size.y);
            this.handleMovementTrace(res);
            if (this.currentAnim) {
                this.currentAnim.update();
            }
        },
        getNewVelocity: function(vel, accel, friction, max) {
            if (accel) {
                return (vel + accel * ig.system.tick).limit(-max, max);
            } else if (friction) {
                var delta = friction * ig.system.tick;
                if (vel - delta > 0) {
                    return vel - delta;
                } else if (vel + delta < 0) {
                    return vel + delta;
                } else {
                    return 0;
                }
            }
            return vel.limit(-max, max);
        },
        handleMovementTrace: function(res) {
            this.standing = false;
            if (res.collision.y) {
                if (this.bounciness > 0 && Math.abs(this.vel.y) > this.minBounceVelocity) {
                    this.vel.y *= -this.bounciness;
                } else {
                    if (this.vel.y > 0) {
                        this.standing = true;
                    }
                    this.vel.y = 0;
                }
            }
            if (res.collision.x) {
                if (this.bounciness > 0 && Math.abs(this.vel.x) > this.minBounceVelocity) {
                    this.vel.x *= -this.bounciness;
                } else {
                    this.vel.x = 0;
                }
            }
            if (res.collision.slope) {
                var s = res.collision.slope;
                if (this.bounciness > 0) {
                    var proj = this.vel.x * s.nx + this.vel.y * s.ny;
                    this.vel.x = (this.vel.x - s.nx * proj * 2) * this.bounciness;
                    this.vel.y = (this.vel.y - s.ny * proj * 2) * this.bounciness;
                } else {
                    var lengthSquared = s.x * s.x + s.y * s.y;
                    var dot = (this.vel.x * s.x + this.vel.y * s.y) / lengthSquared;
                    this.vel.x = s.x * dot;
                    this.vel.y = s.y * dot;
                    var angle = Math.atan2(s.x, s.y);
                    if (angle > this.slopeStanding.min && angle < this.slopeStanding.max) {
                        this.standing = true;
                    }
                }
            }
            this.pos = res.pos;
        },
        draw: function() {
            if (this.currentAnim) {
                this.currentAnim.draw(this.pos.x - this.offset.x - ig.game._rscreen.x, this.pos.y - this.offset.y - ig.game._rscreen.y);
            }
        },
        kill: function() {
            ig.game.removeEntity(this);
        },
        receiveDamage: function(amount, from) {
            this.health -= amount;
            if (this.health <= 0) {
                this.kill();
            }
        },
        touches: function(other) {
            return !(this.pos.x >= other.pos.x + other.size.x || this.pos.x + this.size.x <= other.pos.x || this.pos.y >= other.pos.y + other.size.y || this.pos.y + this.size.y <= other.pos.y);
        },
        distanceTo: function(other) {
            var xd = (this.pos.x + this.size.x / 2) - (other.pos.x + other.size.x / 2);
            var yd = (this.pos.y + this.size.y / 2) - (other.pos.y + other.size.y / 2);
            return Math.sqrt(xd * xd + yd * yd);
        },
        angleTo: function(other) {
            return Math.atan2((other.pos.y + other.size.y / 2) - (this.pos.y + this.size.y / 2), (other.pos.x + other.size.x / 2) - (this.pos.x + this.size.x / 2));
        },
        check: function(other) {},
        collideWith: function(other, axis) {},
        ready: function() {}
    });
    ig.Entity._lastId = 0;
    ig.Entity.COLLIDES = {
        NEVER: 0,
        LITE: 1,
        PASSIVE: 2,
        ACTIVE: 4,
        FIXED: 8
    };
    ig.Entity.TYPE = {
        NONE: 0,
        A: 1,
        B: 2,
        BOTH: 3
    };
    ig.Entity.checkPair = function(a, b) {
        if (a.checkAgainst & b.type) {
            a.check(b);
        }
        if (b.checkAgainst & a.type) {
            b.check(a);
        }
        if (a.collides && b.collides && a.collides + b.collides > ig.Entity.COLLIDES.ACTIVE) {
            ig.Entity.solveCollision(a, b);
        }
    };
    ig.Entity.solveCollision = function(a, b) {
        var weak = null;
        if (a.collides == ig.Entity.COLLIDES.LITE || b.collides == ig.Entity.COLLIDES.FIXED) {
            weak = a;
        } else if (b.collides == ig.Entity.COLLIDES.LITE || a.collides == ig.Entity.COLLIDES.FIXED) {
            weak = b;
        }
        if (a.last.x + a.size.x > b.last.x && a.last.x < b.last.x + b.size.x) {
            if (a.last.y < b.last.y) {
                ig.Entity.seperateOnYAxis(a, b, weak);
            } else {
                ig.Entity.seperateOnYAxis(b, a, weak);
            }
            a.collideWith(b, 'y');
            b.collideWith(a, 'y');
        } else if (a.last.y + a.size.y > b.last.y && a.last.y < b.last.y + b.size.y) {
            if (a.last.x < b.last.x) {
                ig.Entity.seperateOnXAxis(a, b, weak);
            } else {
                ig.Entity.seperateOnXAxis(b, a, weak);
            }
            a.collideWith(b, 'x');
            b.collideWith(a, 'x');
        }
    };
    ig.Entity.seperateOnXAxis = function(left, right, weak) {
        var nudge = (left.pos.x + left.size.x - right.pos.x);
        if (weak) {
            var strong = left === weak ? right : left;
            weak.vel.x = -weak.vel.x * weak.bounciness + strong.vel.x;
            var resWeak = ig.game.collisionMap.trace(weak.pos.x, weak.pos.y, weak == left ? -nudge : nudge, 0, weak.size.x, weak.size.y);
            weak.pos.x = resWeak.pos.x;
        } else {
            var v2 = (left.vel.x - right.vel.x) / 2;
            left.vel.x = -v2;
            right.vel.x = v2;
            var resLeft = ig.game.collisionMap.trace(left.pos.x, left.pos.y, -nudge / 2, 0, left.size.x, left.size.y);
            left.pos.x = Math.floor(resLeft.pos.x);
            var resRight = ig.game.collisionMap.trace(right.pos.x, right.pos.y, nudge / 2, 0, right.size.x, right.size.y);
            right.pos.x = Math.ceil(resRight.pos.x);
        }
    };
    ig.Entity.seperateOnYAxis = function(top, bottom, weak) {
        var nudge = (top.pos.y + top.size.y - bottom.pos.y);
        if (weak) {
            var strong = top === weak ? bottom : top;
            weak.vel.y = -weak.vel.y * weak.bounciness + strong.vel.y;
            var nudgeX = 0;
            if (weak == top && Math.abs(weak.vel.y - strong.vel.y) < weak.minBounceVelocity) {
                weak.standing = true;
                nudgeX = strong.vel.x * ig.system.tick;
            }
            var resWeak = ig.game.collisionMap.trace(weak.pos.x, weak.pos.y, nudgeX, weak == top ? -nudge : nudge, weak.size.x, weak.size.y);
            weak.pos.y = resWeak.pos.y;
            weak.pos.x = resWeak.pos.x;
        } else if (ig.game.gravity && (bottom.standing || top.vel.y > 0)) {
            var resTop = ig.game.collisionMap.trace(top.pos.x, top.pos.y, 0, -(top.pos.y + top.size.y - bottom.pos.y), top.size.x, top.size.y);
            top.pos.y = resTop.pos.y;
            if (top.bounciness > 0 && top.vel.y > top.minBounceVelocity) {
                top.vel.y *= -top.bounciness;
            } else {
                top.standing = true;
                top.vel.y = 0;
            }
        } else {
            var v2 = (top.vel.y - bottom.vel.y) / 2;
            top.vel.y = -v2;
            bottom.vel.y = v2;
            var nudgeX = bottom.vel.x * ig.system.tick;
            var resTop = ig.game.collisionMap.trace(top.pos.x, top.pos.y, nudgeX, -nudge / 2, top.size.x, top.size.y);
            top.pos.y = resTop.pos.y;
            var resBottom = ig.game.collisionMap.trace(bottom.pos.x, bottom.pos.y, 0, nudge / 2, bottom.size.x, bottom.size.y);
            bottom.pos.y = resBottom.pos.y;
        }
    };
});

// lib/impact/map.js
ig.baked = true;
ig.module('impact.map').defines(function() {
    "use strict";
    ig.Map = ig.Class.extend({
        tilesize: 8,
        width: 1,
        height: 1,
        data: [
            []
        ],
        name: null,
        init: function(tilesize, data) {
            this.tilesize = tilesize;
            this.data = data;
            this.height = data.length;
            this.width = data[0].length;
        },
        getTile: function(x, y) {
            var tx = Math.floor(x / this.tilesize);
            var ty = Math.floor(y / this.tilesize);
            if ((tx >= 0 && tx < this.width) && (ty >= 0 && ty < this.height)) {
                return this.data[ty][tx];
            } else {
                return 0;
            }
        },
        setTile: function(x, y, tile) {
            var tx = Math.floor(x / this.tilesize);
            var ty = Math.floor(y / this.tilesize);
            if ((tx >= 0 && tx < this.width) && (ty >= 0 && ty < this.height)) {
                this.data[ty][tx] = tile;
            }
        }
    });
});

// lib/impact/collision-map.js
ig.baked = true;
ig.module('impact.collision-map').requires('impact.map').defines(function() {
    "use strict";
    ig.CollisionMap = ig.Map.extend({
        lastSlope: 1,
        tiledef: null,
        init: function(tilesize, data, tiledef) {
            this.parent(tilesize, data);
            this.tiledef = tiledef || ig.CollisionMap.defaultTileDef;
            for (var t in this.tiledef) {
                if (t | 0 > this.lastSlope) {
                    this.lastSlope = t | 0;
                }
            }
        },
        trace: function(x, y, vx, vy, objectWidth, objectHeight) {
            var res = {
                collision: {
                    x: false,
                    y: false,
                    slope: false
                },
                pos: {
                    x: x,
                    y: y
                },
                tile: {
                    x: 0,
                    y: 0
                }
            };
            var steps = Math.ceil(Math.max(Math.abs(vx), Math.abs(vy)) / this.tilesize);
            if (steps > 1) {
                var sx = vx / steps;
                var sy = vy / steps;
                for (var i = 0; i < steps && (sx || sy); i++) {
                    this._traceStep(res, x, y, sx, sy, objectWidth, objectHeight, vx, vy, i);
                    x = res.pos.x;
                    y = res.pos.y;
                    if (res.collision.x) {
                        sx = 0;
                        vx = 0;
                    }
                    if (res.collision.y) {
                        sy = 0;
                        vy = 0;
                    }
                    if (res.collision.slope) {
                        break;
                    }
                }
            } else {
                this._traceStep(res, x, y, vx, vy, objectWidth, objectHeight, vx, vy, 0);
            }
            return res;
        },
        _traceStep: function(res, x, y, vx, vy, width, height, rvx, rvy, step) {
            res.pos.x += vx;
            res.pos.y += vy;
            var t = 0;
            if (vx) {
                var pxOffsetX = (vx > 0 ? width : 0);
                var tileOffsetX = (vx < 0 ? this.tilesize : 0);
                var firstTileY = Math.max(Math.floor(y / this.tilesize), 0);
                var lastTileY = Math.min(Math.ceil((y + height) / this.tilesize), this.height);
                var tileX = Math.floor((res.pos.x + pxOffsetX) / this.tilesize);
                var prevTileX = Math.floor((x + pxOffsetX) / this.tilesize);
                if (step > 0 || tileX == prevTileX || prevTileX < 0 || prevTileX >= this.width) {
                    prevTileX = -1;
                }
                if (tileX >= 0 && tileX < this.width) {
                    for (var tileY = firstTileY; tileY < lastTileY; tileY++) {
                        if (prevTileX != -1) {
                            t = this.data[tileY][prevTileX];
                            if (t > 1 && t <= this.lastSlope && this._checkTileDef(res, t, x, y, rvx, rvy, width, height, prevTileX, tileY)) {
                                break;
                            }
                        }
                        t = this.data[tileY][tileX];
                        if (t == 1 || t > this.lastSlope || (t > 1 && this._checkTileDef(res, t, x, y, rvx, rvy, width, height, tileX, tileY))) {
                            if (t > 1 && t <= this.lastSlope && res.collision.slope) {
                                break;
                            }
                            res.collision.x = true;
                            res.tile.x = t;
                            x = res.pos.x = tileX * this.tilesize - pxOffsetX + tileOffsetX;
                            rvx = 0;
                            break;
                        }
                    }
                }
            }
            if (vy) {
                var pxOffsetY = (vy > 0 ? height : 0);
                var tileOffsetY = (vy < 0 ? this.tilesize : 0);
                var firstTileX = Math.max(Math.floor(res.pos.x / this.tilesize), 0);
                var lastTileX = Math.min(Math.ceil((res.pos.x + width) / this.tilesize), this.width);
                var tileY = Math.floor((res.pos.y + pxOffsetY) / this.tilesize);
                var prevTileY = Math.floor((y + pxOffsetY) / this.tilesize);
                if (step > 0 || tileY == prevTileY || prevTileY < 0 || prevTileY >= this.height) {
                    prevTileY = -1;
                }
                if (tileY >= 0 && tileY < this.height) {
                    for (var tileX = firstTileX; tileX < lastTileX; tileX++) {
                        if (prevTileY != -1) {
                            t = this.data[prevTileY][tileX];
                            if (t > 1 && t <= this.lastSlope && this._checkTileDef(res, t, x, y, rvx, rvy, width, height, tileX, prevTileY)) {
                                break;
                            }
                        }
                        t = this.data[tileY][tileX];
                        if (t == 1 || t > this.lastSlope || (t > 1 && this._checkTileDef(res, t, x, y, rvx, rvy, width, height, tileX, tileY))) {
                            if (t > 1 && t <= this.lastSlope && res.collision.slope) {
                                break;
                            }
                            res.collision.y = true;
                            res.tile.y = t;
                            res.pos.y = tileY * this.tilesize - pxOffsetY + tileOffsetY;
                            break;
                        }
                    }
                }
            }
        },
        _checkTileDef: function(res, t, x, y, vx, vy, width, height, tileX, tileY) {
            var def = this.tiledef[t];
            if (!def) {
                return false;
            }
            var lx = (tileX + def[0]) * this.tilesize,
                ly = (tileY + def[1]) * this.tilesize,
                lvx = (def[2] - def[0]) * this.tilesize,
                lvy = (def[3] - def[1]) * this.tilesize,
                solid = def[4];
            var tx = x + vx + (lvy < 0 ? width : 0) - lx,
                ty = y + vy + (lvx > 0 ? height : 0) - ly;
            if (lvx * ty - lvy * tx > 0) {
                if (vx * -lvy + vy * lvx < 0) {
                    return solid;
                }
                var length = Math.sqrt(lvx * lvx + lvy * lvy);
                var nx = lvy / length,
                    ny = -lvx / length;
                var proj = tx * nx + ty * ny;
                var px = nx * proj,
                    py = ny * proj;
                if (px * px + py * py >= vx * vx + vy * vy) {
                    return solid || (lvx * (ty - vy) - lvy * (tx - vx) < 0.5);
                }
                res.pos.x = x + vx - px;
                res.pos.y = y + vy - py;
                res.collision.slope = {
                    x: lvx,
                    y: lvy,
                    nx: nx,
                    ny: ny
                };
                return true;
            }
            return false;
        }
    });
    var H = 1 / 2,
        N = 1 / 3,
        M = 2 / 3,
        SOLID = true,
        NON_SOLID = false;
    ig.CollisionMap.defaultTileDef = {
        5: [0, 1, 1, M, SOLID],
        6: [0, M, 1, N, SOLID],
        7: [0, N, 1, 0, SOLID],
        3: [0, 1, 1, H, SOLID],
        4: [0, H, 1, 0, SOLID],
        2: [0, 1, 1, 0, SOLID],
        10: [H, 1, 1, 0, SOLID],
        21: [0, 1, H, 0, SOLID],
        32: [M, 1, 1, 0, SOLID],
        43: [N, 1, M, 0, SOLID],
        54: [0, 1, N, 0, SOLID],
        27: [0, 0, 1, N, SOLID],
        28: [0, N, 1, M, SOLID],
        29: [0, M, 1, 1, SOLID],
        25: [0, 0, 1, H, SOLID],
        26: [0, H, 1, 1, SOLID],
        24: [0, 0, 1, 1, SOLID],
        11: [0, 0, H, 1, SOLID],
        22: [H, 0, 1, 1, SOLID],
        33: [0, 0, N, 1, SOLID],
        44: [N, 0, M, 1, SOLID],
        55: [M, 0, 1, 1, SOLID],
        16: [1, N, 0, 0, SOLID],
        17: [1, M, 0, N, SOLID],
        18: [1, 1, 0, M, SOLID],
        14: [1, H, 0, 0, SOLID],
        15: [1, 1, 0, H, SOLID],
        13: [1, 1, 0, 0, SOLID],
        8: [H, 1, 0, 0, SOLID],
        19: [1, 1, H, 0, SOLID],
        30: [N, 1, 0, 0, SOLID],
        41: [M, 1, N, 0, SOLID],
        52: [1, 1, M, 0, SOLID],
        38: [1, M, 0, 1, SOLID],
        39: [1, N, 0, M, SOLID],
        40: [1, 0, 0, N, SOLID],
        36: [1, H, 0, 1, SOLID],
        37: [1, 0, 0, H, SOLID],
        35: [1, 0, 0, 1, SOLID],
        9: [1, 0, H, 1, SOLID],
        20: [H, 0, 0, 1, SOLID],
        31: [1, 0, M, 1, SOLID],
        42: [M, 0, N, 1, SOLID],
        53: [N, 0, 0, 1, SOLID],
        12: [0, 0, 1, 0, NON_SOLID],
        23: [1, 1, 0, 1, NON_SOLID],
        34: [1, 0, 1, 1, NON_SOLID],
        45: [0, 1, 0, 0, NON_SOLID]
    };
    ig.CollisionMap.staticNoCollision = {
        trace: function(x, y, vx, vy) {
            return {
                collision: {
                    x: false,
                    y: false,
                    slope: false
                },
                pos: {
                    x: x + vx,
                    y: y + vy
                },
                tile: {
                    x: 0,
                    y: 0
                }
            };
        }
    };
});

// lib/impact/background-map.js
ig.baked = true;
ig.module('impact.background-map').requires('impact.map', 'impact.image').defines(function() {
    "use strict";
    ig.BackgroundMap = ig.Map.extend({
        tiles: null,
        scroll: {
            x: 0,
            y: 0
        },
        distance: 1,
        repeat: false,
        tilesetName: '',
        foreground: false,
        enabled: true,
        preRender: false,
        preRenderedChunks: null,
        chunkSize: 512,
        debugChunks: false,
        anims: {},
        init: function(tilesize, data, tileset) {
            this.parent(tilesize, data);
            this.setTileset(tileset);
        },
        setTileset: function(tileset) {
            this.tilesetName = tileset instanceof ig.Image ? tileset.path : tileset;
            this.tiles = new ig.Image(this.tilesetName);
            this.preRenderedChunks = null;
        },
        setScreenPos: function(x, y) {
            this.scroll.x = x / this.distance;
            this.scroll.y = y / this.distance;
        },
        preRenderMapToChunks: function() {
            var totalWidth = this.width * this.tilesize * ig.system.scale,
                totalHeight = this.height * this.tilesize * ig.system.scale;
            var chunkCols = Math.ceil(totalWidth / this.chunkSize),
                chunkRows = Math.ceil(totalHeight / this.chunkSize);
            this.preRenderedChunks = [];
            for (var y = 0; y < chunkRows; y++) {
                this.preRenderedChunks[y] = [];
                for (var x = 0; x < chunkCols; x++) {
                    var chunkWidth = (x == chunkCols - 1) ? totalWidth - x * this.chunkSize : this.chunkSize;
                    var chunkHeight = (y == chunkRows - 1) ? totalHeight - y * this.chunkSize : this.chunkSize;
                    this.preRenderedChunks[y][x] = this.preRenderChunk(x, y, chunkWidth, chunkHeight);
                }
            }
        },
        preRenderChunk: function(cx, cy, w, h) {
            var tw = w / this.tilesize / ig.system.scale + 1,
                th = h / this.tilesize / ig.system.scale + 1;
            var nx = (cx * this.chunkSize / ig.system.scale) % this.tilesize,
                ny = (cy * this.chunkSize / ig.system.scale) % this.tilesize;
            var tx = Math.floor(cx * this.chunkSize / this.tilesize / ig.system.scale),
                ty = Math.floor(cy * this.chunkSize / this.tilesize / ig.system.scale);
            var chunk = ig.$new('canvas');
            chunk.width = w;
            chunk.height = h;
            var oldContext = ig.system.context;
            ig.system.context = chunk.getContext("2d");
            for (var x = 0; x < tw; x++) {
                for (var y = 0; y < th; y++) {
                    if (x + tx < this.width && y + ty < this.height) {
                        var tile = this.data[y + ty][x + tx];
                        if (tile) {
                            this.tiles.drawTile(x * this.tilesize - nx, y * this.tilesize - ny, tile - 1, this.tilesize);
                        }
                    }
                }
            }
            ig.system.context = oldContext;
            return chunk;
        },
        draw: function() {
            if (!this.tiles.loaded || !this.enabled) {
                return;
            }
            if (this.preRender) {
                this.drawPreRendered();
            } else {
                this.drawTiled();
            }
        },
        drawPreRendered: function() {
            if (!this.preRenderedChunks) {
                this.preRenderMapToChunks();
            }
            var dx = ig.system.getDrawPos(this.scroll.x),
                dy = ig.system.getDrawPos(this.scroll.y);
            if (this.repeat) {
                var w = this.width * this.tilesize * ig.system.scale;
                dx = (dx % w + w) % w;
                var h = this.height * this.tilesize * ig.system.scale;
                dy = (dy % h + h) % h;
            }
            var minChunkX = Math.max(Math.floor(dx / this.chunkSize), 0),
                minChunkY = Math.max(Math.floor(dy / this.chunkSize), 0),
                maxChunkX = Math.ceil((dx + ig.system.realWidth) / this.chunkSize),
                maxChunkY = Math.ceil((dy + ig.system.realHeight) / this.chunkSize),
                maxRealChunkX = this.preRenderedChunks[0].length,
                maxRealChunkY = this.preRenderedChunks.length;
            if (!this.repeat) {
                maxChunkX = Math.min(maxChunkX, maxRealChunkX);
                maxChunkY = Math.min(maxChunkY, maxRealChunkY);
            }
            var nudgeY = 0;
            for (var cy = minChunkY; cy < maxChunkY; cy++) {
                var nudgeX = 0;
                for (var cx = minChunkX; cx < maxChunkX; cx++) {
                    var chunk = this.preRenderedChunks[cy % maxRealChunkY][cx % maxRealChunkX];
                    var x = -dx + cx * this.chunkSize - nudgeX;
                    var y = -dy + cy * this.chunkSize - nudgeY;
                    ig.system.context.drawImage(chunk, x, y);
                    ig.Image.drawCount++;
                    if (this.debugChunks) {
                        ig.system.context.strokeStyle = '#f0f';
                        ig.system.context.strokeRect(x, y, this.chunkSize, this.chunkSize);
                    }
                    if (this.repeat && chunk.width < this.chunkSize && x + chunk.width < ig.system.realWidth) {
                        nudgeX = this.chunkSize - chunk.width;
                        maxChunkX++;
                    }
                }
                if (this.repeat && chunk.height < this.chunkSize && y + chunk.height < ig.system.realHeight) {
                    nudgeY = this.chunkSize - chunk.height;
                    maxChunkY++;
                }
            }
        },
        drawTiled: function() {
            var tile = 0,
                anim = null,
                tileOffsetX = (this.scroll.x / this.tilesize).toInt(),
                tileOffsetY = (this.scroll.y / this.tilesize).toInt(),
                pxOffsetX = this.scroll.x % this.tilesize,
                pxOffsetY = this.scroll.y % this.tilesize,
                pxMinX = -pxOffsetX - this.tilesize,
                pxMinY = -pxOffsetY - this.tilesize,
                pxMaxX = ig.system.width + this.tilesize - pxOffsetX,
                pxMaxY = ig.system.height + this.tilesize - pxOffsetY;
            for (var mapY = -1, pxY = pxMinY; pxY < pxMaxY; mapY++, pxY += this.tilesize) {
                var tileY = mapY + tileOffsetY;
                if (tileY >= this.height || tileY < 0) {
                    if (!this.repeat) {
                        continue;
                    }
                    tileY = (tileY % this.height + this.height) % this.height;
                }
                for (var mapX = -1, pxX = pxMinX; pxX < pxMaxX; mapX++, pxX += this.tilesize) {
                    var tileX = mapX + tileOffsetX;
                    if (tileX >= this.width || tileX < 0) {
                        if (!this.repeat) {
                            continue;
                        }
                        tileX = (tileX % this.width + this.width) % this.width;
                    }
                    if ((tile = this.data[tileY][tileX])) {
                        if ((anim = this.anims[tile - 1])) {
                            anim.draw(pxX, pxY);
                        } else {
                            this.tiles.drawTile(pxX, pxY, tile - 1, this.tilesize);
                        }
                    }
                }
            }
        }
    });
});

// lib/impact/game.js
ig.baked = true;
ig.module('impact.game').requires('impact.impact', 'impact.entity', 'impact.collision-map', 'impact.background-map').defines(function() {
    "use strict";
    ig.Game = ig.Class.extend({
        clearColor: '#000000',
        gravity: 0,
        screen: {
            x: 0,
            y: 0
        },
        _rscreen: {
            x: 0,
            y: 0
        },
        entities: [],
        namedEntities: {},
        collisionMap: ig.CollisionMap.staticNoCollision,
        backgroundMaps: [],
        backgroundAnims: {},
        autoSort: false,
        sortBy: null,
        cellSize: 64,
        _deferredKill: [],
        _levelToLoad: null,
        _doSortEntities: false,
        staticInstantiate: function() {
            this.sortBy = this.sortBy || ig.Game.SORT.Z_INDEX;
            ig.game = this;
            return null;
        },
        loadLevel: function(data) {
            this.screen = {
                x: 0,
                y: 0
            };
            this.entities = [];
            this.namedEntities = {};
            for (var i = 0; i < data.entities.length; i++) {
                var ent = data.entities[i];
                this.spawnEntity(ent.type, ent.x, ent.y, ent.settings);
            }
            this.sortEntities();
            this.collisionMap = ig.CollisionMap.staticNoCollision;
            this.backgroundMaps = [];
            for (var i = 0; i < data.layer.length; i++) {
                var ld = data.layer[i];
                if (ld.name == 'collision') {
                    this.collisionMap = new ig.CollisionMap(ld.tilesize, ld.data);
                } else {
                    var newMap = new ig.BackgroundMap(ld.tilesize, ld.data, ld.tilesetName);
                    newMap.anims = this.backgroundAnims[ld.tilesetName] || {};
                    newMap.repeat = ld.repeat;
                    newMap.distance = ld.distance;
                    newMap.foreground = !!ld.foreground;
                    newMap.preRender = !!ld.preRender;
                    newMap.name = ld.name;
                    this.backgroundMaps.push(newMap);
                }
            }
            for (var i = 0; i < this.entities.length; i++) {
                this.entities[i].ready();
            }
        },
        loadLevelDeferred: function(data) {
            this._levelToLoad = data;
        },
        getMapByName: function(name) {
            if (name == 'collision') {
                return this.collisionMap;
            }
            for (var i = 0; i < this.backgroundMaps.length; i++) {
                if (this.backgroundMaps[i].name == name) {
                    return this.backgroundMaps[i];
                }
            }
            return null;
        },
        getEntityByName: function(name) {
            return this.namedEntities[name];
        },
        getEntitiesByType: function(type) {
            var entityClass = typeof(type) === 'string' ? ig.global[type] : type;
            var a = [];
            for (var i = 0; i < this.entities.length; i++) {
                var ent = this.entities[i];
                if (ent instanceof entityClass && !ent._killed) {
                    a.push(ent);
                }
            }
            return a;
        },
        spawnEntity: function(type, x, y, settings) {
            var entityClass = typeof(type) === 'string' ? ig.global[type] : type;
            if (!entityClass) {
                throw ("Can't spawn entity of type " + type);
            }
            var ent = new(entityClass)(x, y, settings || {});
            this.entities.push(ent);
            if (ent.name) {
                this.namedEntities[ent.name] = ent;
            }
            return ent;
        },
        sortEntities: function() {
            this.entities.sort(this.sortBy);
        },
        sortEntitiesDeferred: function() {
            this._doSortEntities = true;
        },
        removeEntity: function(ent) {
            if (ent.name) {
                delete this.namedEntities[ent.name];
            }
            ent._killed = true;
            ent.type = ig.Entity.TYPE.NONE;
            ent.checkAgainst = ig.Entity.TYPE.NONE;
            ent.collides = ig.Entity.COLLIDES.NEVER;
            this._deferredKill.push(ent);
        },
        run: function() {
            this.update();
            this.draw();
        },
        update: function() {
            if (this._levelToLoad) {
                this.loadLevel(this._levelToLoad);
                this._levelToLoad = null;
            }
            if (this._doSortEntities || this.autoSort) {
                this.sortEntities();
                this._doSortEntities = false;
            }
            this.updateEntities();
            this.checkEntities();
            for (var i = 0; i < this._deferredKill.length; i++) {
                this.entities.erase(this._deferredKill[i]);
            }
            this._deferredKill = [];
            for (var tileset in this.backgroundAnims) {
                var anims = this.backgroundAnims[tileset];
                for (var a in anims) {
                    anims[a].update();
                }
            }
        },
        updateEntities: function() {
            for (var i = 0; i < this.entities.length; i++) {
                var ent = this.entities[i];
                if (!ent._killed) {
                    ent.update();
                }
            }
        },
        draw: function() {
            if (this.clearColor) {
                ig.system.clear(this.clearColor);
            }
            this._rscreen.x = ig.system.getDrawPos(this.screen.x) / ig.system.scale;
            this._rscreen.y = ig.system.getDrawPos(this.screen.y) / ig.system.scale;
            var mapIndex;
            for (mapIndex = 0; mapIndex < this.backgroundMaps.length; mapIndex++) {
                var map = this.backgroundMaps[mapIndex];
                if (map.foreground) {
                    break;
                }
                map.setScreenPos(this.screen.x, this.screen.y);
                map.draw();
            }
            this.drawEntities();
            for (mapIndex; mapIndex < this.backgroundMaps.length; mapIndex++) {
                var map = this.backgroundMaps[mapIndex];
                map.setScreenPos(this.screen.x, this.screen.y);
                map.draw();
            }
        },
        drawEntities: function() {
            for (var i = 0; i < this.entities.length; i++) {
                this.entities[i].draw();
            }
        },
        checkEntities: function() {
            var hash = {};
            for (var e = 0; e < this.entities.length; e++) {
                var entity = this.entities[e];
                if (entity.type == ig.Entity.TYPE.NONE && entity.checkAgainst == ig.Entity.TYPE.NONE && entity.collides == ig.Entity.COLLIDES.NEVER) {
                    continue;
                }
                var checked = {},
                    xmin = Math.floor(entity.pos.x / this.cellSize),
                    ymin = Math.floor(entity.pos.y / this.cellSize),
                    xmax = Math.floor((entity.pos.x + entity.size.x) / this.cellSize) + 1,
                    ymax = Math.floor((entity.pos.y + entity.size.y) / this.cellSize) + 1;
                for (var x = xmin; x < xmax; x++) {
                    for (var y = ymin; y < ymax; y++) {
                        if (!hash[x]) {
                            hash[x] = {};
                            hash[x][y] = [entity];
                        } else if (!hash[x][y]) {
                            hash[x][y] = [entity];
                        } else {
                            var cell = hash[x][y];
                            for (var c = 0; c < cell.length; c++) {
                                if (entity.touches(cell[c]) && !checked[cell[c].id]) {
                                    checked[cell[c].id] = true;
                                    ig.Entity.checkPair(entity, cell[c]);
                                }
                            }
                            cell.push(entity);
                        }
                    }
                }
            }
        }
    });
    ig.Game.SORT = {
        Z_INDEX: function(a, b) {
            return a.zIndex - b.zIndex;
        },
        POS_X: function(a, b) {
            return (a.pos.x + a.size.x) - (b.pos.x + b.size.x);
        },
        POS_Y: function(a, b) {
            return (a.pos.y + a.size.y) - (b.pos.y + b.size.y);
        }
    };
});﻿﻿

// lib/game/entities/bluebg.js
ig.baked = true;
ig.module('game.entities.bluebg').requires('impact.entity').defines(function() {
    EntityBlueBG = ig.Entity.extend({
        size: {
            x: 0,
            y: 0
        },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.NEVER,
        gravityFactor: 0,
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.animSheet = new ig.AnimationSheet('media/blue_bg.gif', 960, 640);
            this.addAnim('idle', 1, [0], true);
        }
    });
});﻿

// lib/game/entities/cloud.js
ig.baked = true;
ig.module('game.entities.cloud').requires('impact.entity').defines(function() {
    EntityCloud = ig.Entity.extend({
        size: {
            x: 0,
            y: 0
        },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.NEVER,
        gravityFactor: 0,
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            switch (settings.which) {
                case 1:
                    this.animSheet = new ig.AnimationSheet('media/cloud1.png', 224, 53);
                    break;
                case 2:
                    this.animSheet = new ig.AnimationSheet('media/cloud2.png', 218, 51);
                    break;
                case 3:
                    this.animSheet = new ig.AnimationSheet('media/cloud3.png', 116, 34);
                    break;
                case 4:
                    this.animSheet = new ig.AnimationSheet('media/cloud4.png', 82, 26);
                    break;
            }
            this.addAnim('idle', 1, [0], true);
            this.vel.x = 12 + Math.random() * 15;
            if (Math.random() < .5) {
                this.vel.x *= -1;
            }
        },
        update: function() {
            this.pos.x += this.vel.x * ig.system.tick;
            if (this.vel.x > 0) {
                if (this.pos.x > 960) {
                    this.pos.x = 0 - this.animSheet.width;
                }
            } else {
                if (this.pos.x < 0 - this.animSheet.width) {
                    this.pos.x = 960;
                }
            }
        }
    });
});﻿﻿


// lib/game/entities/btntryagain.js
ig.baked = true;
ig.module('game.entities.btntryagain').requires('impact.entity').defines(function() {
    EntityButtonTryAgain = ig.Entity.extend({
        size: {
            x: 220,
            y: 106
        },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.NEVER,
        gravityFactor: 0,
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.animSheet = new ig.AnimationSheet('media/btn_tryAgain.png', 212, 107);
            this.buttonWidth = 220;
            this.addAnim('tryi', 1, [0], true);
            this.addAnim('tryover', 1, [1], true);
            this.addAnim('one', 1, [2], true);
            this.addAnim('oneover', 1, [3], true);
            this.addAnim('two', 1, [4], true);
            this.addAnim('twoover', 1, [5], true);
            this.addAnim('back', 1, [6], true);
            this.addAnim('backover', 1, [7], true);
            this.addAnim('arrowf', 1, [8], true);
            this.addAnim('arrowfover', 1, [9], true);
            this.addAnim('arrowb', 1, [10], true);
            this.addAnim('arrowbover', 1, [11], true);
            this.addAnim('menu', 1, [12], true);
            this.addAnim('menuover', 1, [13], true);
            this.addAnim('menu2', 1, [14], true);
            this.addAnim('menuover2', 1, [15], true);
            //this.addAnim('backsmall', 1, [16], true);
            this.addAnim('backsmallover', 1, [17], true);
            this.addAnim('help', 1, [18], true);
            this.addAnim('helpover', 1, [19], true);
            this.buttonWidth = 212;
            this.buttonHeight = 106;
            if (settings.which == 'try') {
                this.idleAnim = this.anims.tryi;
                this.overAnim = this.anims.tryover;
            }
            if (settings.which == 'one') {
                this.idleAnim = this.anims.one;
                this.overAnim = this.anims.oneover;
            }
            if (settings.which == 'two') {
                this.idleAnim = this.anims.two;
                this.overAnim = this.anims.twoover;
            }
            if (settings.which == 'back') {
                this.idleAnim = this.anims.back;
                this.overAnim = this.anims.backover;
            }
            if (settings.which == 'arrowf') {
                this.idleAnim = this.anims.arrowf;
                this.overAnim = this.anims.arrowfover;
                this.buttonWidth = 153;
                this.size.x = 153;
            }
            if (settings.which == 'arrowb') {
                this.idleAnim = this.anims.arrowb;
                this.overAnim = this.anims.arrowbover;
                this.buttonWidth = 153;
                this.size.x = 153;
            }
            if (settings.which == 'menu') {
                this.idleAnim = this.anims.menu;
                this.overAnim = this.anims.menuover;
                this.buttonWidth = 138;
                this.size.x = 138;
            }
            if (settings.which == 'menu2') {
                this.idleAnim = this.anims.menu2;
                this.overAnim = this.anims.menuover2;
                this.buttonWidth = 129;
                this.buttonHeight = 69;
                this.size.x = 129;
            }
            if (settings.which == 'backsmall') {
                /*this.idleAnim = this.anims.backsmall;
                this.overAnim = this.anims.backsmallover;
                this.buttonWidth = 33;
                this.buttonHeight = 33;
                this.size.x = 33;*/
            }
            if (settings.which == 'help') {
                this.idleAnim = this.anims.help;
                this.overAnim = this.anims.helpover;
                this.buttonWidth = 33;
                this.buttonHeight = 33;
                this.size.x = 33;
            }
            ig.input.bind(ig.KEY.MOUSE1, 'leftMouse');
        },
        update: function() {
            this.parent();
            var mx = ig.input.mouse.x;
            var my = ig.input.mouse.y;
            if (mx > this.pos.x && mx <= this.pos.x + this.buttonWidth && my > this.pos.y && my <= this.pos.y + this.buttonHeight) {
                this.currentAnim = this.overAnim;
            } else {
                this.currentAnim = this.idleAnim;
            }
        }
    });
});

// lib/game/entities/introscreen.js
ig.baked = true;
ig.module('game.entities.introscreen').requires('impact.entity', 'game.entities.btntryagain').defines(function() {
    EntityIntroScreen = ig.Entity.extend({
        size: {
            x: 0,
            y: 0
        },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.NEVER,
        gravityFactor: 0,
        animSheet: new ig.AnimationSheet('media/welcomeScreen.png', 907, 576),
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0], true);
            ig.input.bind(ig.KEY.MOUSE1, 'leftMouse');
        },
        show: function() {
            this.btn1 = ig.game.spawnEntity(EntityButtonTryAgain, 730, 460, {
                which: 'arrowf'
            });
        },
        update: function() {
            this.parent();
            if (ig.input.released('leftMouse')) {
                var mx = ig.input.mouse.x;
                var my = ig.input.mouse.y;
                if (mx > this.btn1.pos.x && mx < this.btn1.pos.x + this.btn1.size.x && my > this.btn1.pos.y && my < this.btn1.pos.y + this.btn1.size.y) {
                    ig.game.mainMenu();
                }
            }
        }
    });
});﻿


// lib/game/entities/whiteBorder.js
ig.baked = true;
ig.module('game.entities.whiteBorder').requires('impact.entity').defines(function() {
    EntityWhiteBorder = ig.Entity.extend({
        size: {
            x: 0,
            y: 0
        },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.NEVER,
        gravityFactor: 0,
        animSheet: new ig.AnimationSheet('media/whiteBorder.png', 960, 640),
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0], true);
        }
    });
});﻿﻿﻿﻿

// lib/game/entities/arrowcursor1.js
ig.baked = true;
ig.module('game.entities.arrowcursor1').requires('impact.entity').defines(function() {
    EntityArrowCursor1 = ig.Entity.extend({
        size: {
            x: 0,
            y: 0
        },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.NEVER,
        gravityFactor: 0,
        animSheet: new ig.AnimationSheet('media/arrow12.png', 30, 23),
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0], true);
        }
    });
});﻿

// lib/game/entities/arrowcursor2.js
ig.baked = true;
ig.module('game.entities.arrowcursor2').requires('impact.entity').defines(function() {
    EntityArrowCursor2 = ig.Entity.extend({
        size: {
            x: 0,
            y: 0
        },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.NEVER,
        gravityFactor: 0,
        animSheet: new ig.AnimationSheet('media/arrow22.png', 30, 23),
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0], true);
        }
    });
});﻿

// lib/game/entities/arrowcursor3.js
ig.baked = true;
ig.module('game.entities.arrowcursor3').requires('impact.entity').defines(function() {
    EntityArrowCursor3 = ig.Entity.extend({
        size: {
            x: 0,
            y: 0
        },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.NEVER,
        gravityFactor: 0,
        animSheet: new ig.AnimationSheet('media/arrow32.png', 30, 26),
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0], true);
        }
    });
});﻿

// lib/game/entities/arrowcursor4.js
ig.baked = true;
ig.module('game.entities.arrowcursor4').requires('impact.entity').defines(function() {
    EntityArrowCursor4 = ig.Entity.extend({
        size: {
            x: 0,
            y: 0
        },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.NEVER,
        gravityFactor: 0,
        animSheet: new ig.AnimationSheet('media/arrow42.png', 30, 28),
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0], true);
        }
    });
});

// lib/game/entities/arrowcursor.js
ig.baked = true;
ig.module('game.entities.arrowcursor').requires('impact.entity', 'game.entities.arrowcursor1', 'game.entities.arrowcursor2', 'game.entities.arrowcursor3', 'game.entities.arrowcursor4').defines(function() {
    EntityArrowCursor = ig.Entity.extend({
        size: {
            x: 0,
            y: 0
        },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.NEVER,
        gravityFactor: 0,
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.clickable = [0, 0, 0, 0];
            this.buffer = 30;
            ig.input.bind(ig.KEY.MOUSE1, 'leftMouse');
        },
        showArrows: function(x, y, dir) {
            this.baseX = x;
            this.baseY = y;
            this.showing = true;
            if (dir[0] != 0) {
                this.p1 = ig.game.spawnEntity(EntityArrowCursor1, x - 33, y - 23);
                this.clickable[0] = 1;
            }
            if (dir[1] != 0) {
                this.p2 = ig.game.spawnEntity(EntityArrowCursor2, x + 1, y - 19);
                this.clickable[1] = 1;
            }
            if (dir[2] != 0) {
                this.p3 = ig.game.spawnEntity(EntityArrowCursor3, x + 1, y - 3);
                this.clickable[2] = 1;
            }
            if (dir[3] != 0) {
                this.p4 = ig.game.spawnEntity(EntityArrowCursor4, x - 34, y - 4);
                this.clickable[3] = 1;
            }
        },
        getLoc: function() {
            return [this.baseX, this.baseY];
        },
        overDraw: function() {
            if (this.showing) {
                if (this.clickable[0] == 1) {
                    this.p1.draw();
                }
                if (this.clickable[1] == 1) {
                    this.p2.draw();
                }
                if (this.clickable[2] == 1) {
                    this.p3.draw();
                }
                if (this.clickable[3] == 1) {
                    this.p4.draw();
                }
            }
        },
        removeArrows: function() {
            if (this.p1 != undefined) {
                this.clickable[0] = 0;
                this.p1.kill();
                delete this.p1;
            }
            if (this.p2 != undefined) {
                this.clickable[1] = 0;
                this.p2.kill();
                delete this.p2;
            }
            if (this.p3 != undefined) {
                this.clickable[2] = 0;
                this.p3.kill();
                delete this.p3;
            }
            if (this.p4 != undefined) {
                this.clickable[3] = 0;
                this.p4.kill();
                delete this.p4;
            }
            this.showing = false;
        },
        update: function() {
            this.parent();
            if (ig.input.pressed('leftMouse')) {
                var x = ig.input.mouse.x + 4;
                var y = ig.input.mouse.y + 3;
                if (x < this.baseX && x > this.baseX - this.buffer) {
                    if (y < this.baseY && y > this.baseY - this.buffer) {
                        if (this.clickable[0] == 1) {
                            ig.game.cursorPress(1);
                        }
                    } else if (y < this.baseY + this.buffer) {
                        if (this.clickable[3] == 1) {
                            ig.game.cursorPress(4);
                        }
                    }
                } else if (x > this.baseX && x < this.baseX + this.buffer) {
                    if (y < this.baseY && y > this.baseY - this.buffer) {
                        if (this.clickable[1] == 1) {
                            ig.game.cursorPress(2);
                        }
                    } else if (y < this.baseY + this.buffer) {
                        if (this.clickable[2] == 1) {
                            ig.game.cursorPress(3);
                        }
                    }
                }
            }
        }
    });
});﻿

// lib/game/entities/walkingguy.js
ig.baked = true;
ig.module('game.entities.walkingguy').requires('impact.entity').defines(function() {
    EntityWalkingGuy = ig.Entity.extend({
        size: {
            x: 25,
            y: 44
        },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.NEVER,
        gravityFactor: 0,
        movementSpeed: 90,
        maxVel: {
            x: 90,
            y: 90
        },
        animSheet: new ig.AnimationSheet('media/walkingManSheet.png', 25, 44),
        init: function(x, y, settings) {
            this.offSetX = -15;
            this.offSetY = -38;
            this.parent(x + this.offSetX, y + this.offSetY, settings);
            this.addAnim('idle', .2, [2], true);
            this.addAnim('walk1', .2, [0, 1, 2], false);
            this.addAnim('walk2', .2, [3, 4, 5], false);
            this.addAnim('walk3', .2, [6, 7, 8], false);
            this.addAnim('walk4', .2, [9, 10, 11], false);
        },
        getPos: function() {
            return [this.pos.x - this.offSetX, this.pos.y - this.offSetY];
        },
        moveTo: function(which, x, y) {
            this.toX = x + this.offSetX;
            this.toY = y + this.offSetY;
            var dx = this.toX - this.pos.x;
            var dy = this.toY - this.pos.y;
            this.halfX = Math.abs(dx * .5);
            this.halfY = Math.abs(dy * .5);
            this.movedPastHalf = false;
            this.calledShowCursor = false;
            switch (which) {
                case 1:
                    this.currentAnim = this.anims.walk1.rewind();
                    break;
                case 2:
                    this.currentAnim = this.anims.walk2.rewind();
                    break;
                case 3:
                    this.currentAnim = this.anims.walk3.rewind();
                    break;
                case 4:
                    this.currentAnim = this.anims.walk4.rewind();
                    break;
            }
        },
        update: function() {
            this.parent();
            var dx = this.toX - this.pos.x;
            var dy = this.toY - this.pos.y;
            if (this.halfX > Math.abs(dx) && this.halfY > Math.abs(dy) && !this.movedPastHalf) {
                ig.game.halfWay();
                this.movedPastHalf = true;
            }
            if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
                this.vel.x = (dx > 1 ? 1 : -1) * this.movementSpeed * (Math.abs(dx) / (Math.abs(dx) + Math.abs(dy)));
                this.vel.y = (dy > 1 ? 1 : -1) * this.movementSpeed * (Math.abs(dy) / (Math.abs(dx) + Math.abs(dy)));
            } else {
                this.vel.y = 0;
                this.vel.x = 0;
                this.currentAnim = this.anims.idle;
                if (!this.calledShowCursor) {
                    ig.game.showCursor();
                    this.calledShowCursor = true;
                }
            }
        }
    });
});﻿


// lib/game/entities/walkingbg.js
ig.baked = true;
ig.module('game.entities.walkingbg').requires('impact.entity').defines(function() {
    EntityWalkingBG = ig.Entity.extend({
        size: {
            x: 0,
            y: 0
        },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.NEVER,
        gravityFactor: 0,
        animSheet: new ig.AnimationSheet('media/walkingCity_bg.gif', 960, 640),
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0], true);
        }
    });
});﻿


// lib/game/entities/walkingbg_fg.js
ig.baked = true;
ig.module('game.entities.walkingbg_fg').requires('impact.entity').defines(function() {
    EntityWalkingBGFG = ig.Entity.extend({
        size: {
            x: 0,
            y: 0
        },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.NEVER,
        gravityFactor: 0,
        animSheet: new ig.AnimationSheet('media/walkingCity_fg.png', 960, 640),
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0], true);
        }
    });
});﻿

// lib/game/entities/messageballoon.js
ig.baked = true;
ig.module('game.entities.messageballoon').requires('impact.entity').defines(function() {
    EntityMessageBalloon = ig.Entity.extend({
        size: {
            x: 0,
            y: 0
        },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.NEVER,
        gravityFactor: 0,
        animSheet: new ig.AnimationSheet('media/messageBalloon.png', 213, 92),
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0], true);
            this.font = new ig.Font('media/font.png');
            this.font.lineSpacing = -6;
            this.showing = false;
            this.message = '';
        },
        show: function(message, x, y) {
            var numLines = message.split("\n").length;
            this.yOffset = 11;
            if (numLines == 1) {
                this.yOffset = 35;
            } else if (numLines == 2) {
                this.yOffset = 26;
            } else if (numLines == 3) {
                this.yOffset = 17
            } else if (numLines == 4) {
                this.yOffset = 9
            }
            if (x < 480) {
                this.pos.x = x + 40;
                this.xOffset = 40;
            } else {
                this.pos.x = x - 220;
                this.xOffset = -220;
            }
            this.pos.y = y;
            this.message = message;
            this.currentAnim.alpha = 0;
            this.showing = true;
            this.hiding = false;
            this.timer = new ig.Timer(3);
        },
        hide: function() {
            this.showing = false;
            this.hiding = true;
        },
        draw: function() {
            this.parent();
            if (this.showing) {
                this.font.draw(this.message, this.pos.x + 106, this.pos.y + this.yOffset, ig.Font.ALIGN.CENTER);
            }
        },
        update: function() {
            this.parent();
            if (this.currentAnim.alpha < 1 && this.showing) {
                this.currentAnim.alpha += .05
            }
            if (this.currentAnim.alpha > 0 && this.hiding) {
                this.currentAnim.alpha -= .1;
                if (this.currentAnim.alpha <= 0) {
                    this.currentAnim.alpha = 0;
                }
            }
            if (this.showing) {
                var xy = ig.game.guyPos();
                var x = xy[0];
                var y = xy[1];
                this.pos.x = x + this.xOffset;
                this.pos.y = y;
            }
            if (this.showing && this.timer.delta() >= 0) {
                this.hiding = true;
                this.showing = false;
            }
        }
    });
});﻿

// lib/game/entities/truck1.js
ig.baked = true;
ig.module('game.entities.truck1').requires('impact.entity').defines(function() {
    EntityTruck1 = ig.Entity.extend({
        size: {
            x: 0,
            y: 0
        },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.NEVER,
        gravityFactor: 0,
        movementSpeed: 90,
        maxVel: {
            x: 90,
            y: 90
        },
        animSheet: new ig.AnimationSheet('media/truck_purple.png', 34, 23),
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0], true);
            this.points = new Array([-70, 230, 0], [475, 540, 2], [747, 700, 8]);
            this.waiting = false;
            this.start();
        },
        start: function() {
            this.index = 0;
            this.pos.x = this.points[this.index][0];
            this.pos.y = this.points[this.index][1];
            this.nextPoint();
        },
        nextPoint: function() {
            this.index++;
            if (this.index < this.points.length) {
                this.toX = this.points[this.index][0];
                this.toY = this.points[this.index][1];
            } else {
                this.start();
            }
        },
        update: function() {
            this.parent();
            if (!this.waiting) {
                var dx = this.toX - this.pos.x;
                var dy = this.toY - this.pos.y;
                if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
                    this.vel.x = (dx > 1 ? 1 : -1) * this.movementSpeed * (Math.abs(dx) / (Math.abs(dx) + Math.abs(dy)));
                    this.vel.y = (dy > 1 ? 1 : -1) * this.movementSpeed * (Math.abs(dy) / (Math.abs(dx) + Math.abs(dy)));
                } else {
                    this.vel.y = 0;
                    this.vel.x = 0;
                    this.waiting = true;
                    this.timer = new ig.Timer(this.points[this.index][2]);
                }
            } else {
                if (this.timer.delta() >= 0) {
                    this.waiting = false;
                    this.nextPoint();
                }
            }
        }
    });
});﻿

// lib/game/entities/truck2.js
ig.baked = true;
ig.module('game.entities.truck2').requires('impact.entity').defines(function() {
    EntityTruck2 = ig.Entity.extend({
        size: {
            x: 0,
            y: 0
        },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.NEVER,
        gravityFactor: 0,
        movementSpeed: 120,
        maxVel: {
            x: 120,
            y: 120
        },
        animSheet: new ig.AnimationSheet('media/truck_red.png', 34, 23),
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('a1', 1, [0], true);
            this.addAnim('a2', 1, [1], true);
            this.points = new Array([120, -20, 0, 1], [826, 384, 0, 1], [370, 650, 10, 2]);
            this.waiting = false;
            this.start();
        },
        start: function() {
            this.index = 0;
            this.pos.x = this.points[this.index][0];
            this.pos.y = this.points[this.index][1];
            this.nextPoint();
        },
        nextPoint: function() {
            this.index++;
            if (this.index < this.points.length) {
                this.toX = this.points[this.index][0];
                this.toY = this.points[this.index][1];
                if (this.points[this.index][3] == 1) {
                    this.currentAnim = this.anims.a1;
                } else {
                    this.currentAnim = this.anims.a2;
                }
            } else {
                this.start();
            }
        },
        update: function() {
            this.parent();
            if (!this.waiting) {
                var dx = this.toX - this.pos.x;
                var dy = this.toY - this.pos.y;
                if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
                    this.vel.x = (dx > 1 ? 1 : -1) * this.movementSpeed * (Math.abs(dx) / (Math.abs(dx) + Math.abs(dy)));
                    this.vel.y = (dy > 1 ? 1 : -1) * this.movementSpeed * (Math.abs(dy) / (Math.abs(dx) + Math.abs(dy)));
                } else {
                    this.vel.y = 0;
                    this.vel.x = 0;
                    this.waiting = true;
                    this.timer = new ig.Timer(this.points[this.index][2]);
                }
            } else {
                if (this.timer.delta() >= 0) {
                    this.waiting = false;
                    this.nextPoint();
                }
            }
        }
    });
});﻿

// lib/game/entities/bus1.js
ig.baked = true;
ig.module('game.entities.bus1').requires('impact.entity').defines(function() {
    EntityBus1 = ig.Entity.extend({
        size: {
            x: 59,
            y: 47
        },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.NEVER,
        gravityFactor: 0,
        movementSpeed: 100,
        maxVel: {
            x: 100,
            y: 100
        },
        animSheet: new ig.AnimationSheet('media/bus.png', 59, 47),
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('a0', 1, [0], true);
            this.addAnim('a1', 1, [1], true);
            this.addAnim('a2', 1, [2], true);
            this.addAnim('a3', 1, [3], true);
            this.points = new Array([-50, 509, 0, 1], [578, 145, 3, 1], [700, 76, 3, 1], [742, 53, 0, 1], [520, -80, 6, 0]);
            //this.points = new Array([-50, 509, 0, 1], [455, 217, 3, 1], [578, 145, 3, 1], [700, 76, 3, 1], [742, 53, 0, 1], [520, -80, 6, 0]);
            this.waiting = false;
            this.start();
        },
        start: function() {
            this.index = 0;
            this.pos.x = this.points[this.index][0];
            this.pos.y = this.points[this.index][1];
            this.nextPoint();
        },
        nextPoint: function() {
            this.index++;
            if (this.index < this.points.length) {
                this.toX = this.points[this.index][0];
                this.toY = this.points[this.index][1];
                switch (this.points[this.index][3]) {
                    case 0:
                        this.currentAnim = this.anims.a0;
                        break;
                    case 1:
                        this.currentAnim = this.anims.a1;
                        break;
                    case 2:
                        this.currentAnim = this.anims.a2;
                        break;
                    case 3:
                        this.currentAnim = this.anims.a3;
                        break;
                }
            } else {
                this.start();
            }
        },
        update: function() {
            this.parent();
            if (!this.waiting) {
                var dx = this.toX - this.pos.x;
                var dy = this.toY - this.pos.y;
                if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
                    this.vel.x = (dx > 1 ? 1 : -1) * this.movementSpeed * (Math.abs(dx) / (Math.abs(dx) + Math.abs(dy)));
                    this.vel.y = (dy > 1 ? 1 : -1) * this.movementSpeed * (Math.abs(dy) / (Math.abs(dx) + Math.abs(dy)));
                } else {
                    this.vel.y = 0;
                    this.vel.x = 0;
                    this.waiting = true;
                    this.timer = new ig.Timer(this.points[this.index][2]);
                }
            } else {
                if (this.timer.delta() >= 0) {
                    this.waiting = false;
                    this.nextPoint();
                }
            }
        }
    });
});﻿

// lib/game/entities/car1.js
ig.baked = true;
ig.module('game.entities.car1').requires('impact.entity').defines(function() {
    EntityCar1 = ig.Entity.extend({
        size: {
            x: 32,
            y: 24
        },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.NEVER,
        gravityFactor: 0,
        movementSpeed: 120,
        maxVel: {
            x: 120,
            y: 120
        },
        animSheet: new ig.AnimationSheet('media/car_yellow.png', 32, 24),
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('a0', 1, [3], true);
            this.addAnim('a1', 1, [2], true);
            this.addAnim('a2', 1, [0], true);
            this.addAnim('a3', 1, [1], true);
            this.points = new Array([750, 650, 0, 0], [607, 565, 1, 0], [-25, 200, 5, 0]);
            this.waiting = false;
            this.start();
        },
        start: function() {
            this.index = 0;
            this.pos.x = this.points[this.index][0];
            this.pos.y = this.points[this.index][1];
            this.nextPoint();
        },
        nextPoint: function() {
            this.index++;
            if (this.index < this.points.length) {
                this.toX = this.points[this.index][0];
                this.toY = this.points[this.index][1];
                switch (this.points[this.index][3]) {
                    case 0:
                        this.currentAnim = this.anims.a0;
                        break;
                    case 1:
                        this.currentAnim = this.anims.a1;
                        break;
                    case 2:
                        this.currentAnim = this.anims.a2;
                        break;
                    case 3:
                        this.currentAnim = this.anims.a3;
                        break;
                }
            } else {
                this.start();
            }
        },
        update: function() {
            this.parent();
            if (!this.waiting) {
                var dx = this.toX - this.pos.x;
                var dy = this.toY - this.pos.y;
                if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
                    this.vel.x = (dx > 1 ? 1 : -1) * this.movementSpeed * (Math.abs(dx) / (Math.abs(dx) + Math.abs(dy)));
                    this.vel.y = (dy > 1 ? 1 : -1) * this.movementSpeed * (Math.abs(dy) / (Math.abs(dx) + Math.abs(dy)));
                } else {
                    this.vel.y = 0;
                    this.vel.x = 0;
                    this.waiting = true;
                    this.timer = new ig.Timer(this.points[this.index][2]);
                }
            } else {
                if (this.timer.delta() >= 0) {
                    this.waiting = false;
                    this.nextPoint();
                }
            }
        }
    });
});﻿

// lib/game/entities/car2.js
ig.baked = true;
ig.module('game.entities.car2').requires('impact.entity').defines(function() {
    EntityCar2 = ig.Entity.extend({
        size: {
            x: 0,
            y: 0
        },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.NEVER,
        gravityFactor: 0,
        movementSpeed: 120,
        maxVel: {
            x: 120,
            y: 120
        },
        animSheet: new ig.AnimationSheet('media/car_orange.png', 32, 24),
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('a0', 1, [3], true);
            this.addAnim('a1', 1, [1], true);
            this.addAnim('a2', 1, [0], true);
            this.addAnim('a3', 1, [2], true);
            this.points = new Array([970, 180, 0, 0], [680, 16, 0, 0], [-20, 430, 5, 1]);
            this.waiting = false;
            this.start();
        },
        start: function() {
            this.index = 0;
            this.pos.x = this.points[this.index][0];
            this.pos.y = this.points[this.index][1];
            this.nextPoint();
        },
        nextPoint: function() {
            this.index++;
            if (this.index < this.points.length) {
                this.toX = this.points[this.index][0];
                this.toY = this.points[this.index][1];
                switch (this.points[this.index][3]) {
                    case 0:
                        this.currentAnim = this.anims.a0;
                        break;
                    case 1:
                        this.currentAnim = this.anims.a1;
                        break;
                    case 2:
                        this.currentAnim = this.anims.a2;
                        break;
                    case 3:
                        this.currentAnim = this.anims.a3;
                        break;
                }
            } else {
                this.start();
            }
        },
        update: function() {
            this.parent();
            if (!this.waiting) {
                var dx = this.toX - this.pos.x;
                var dy = this.toY - this.pos.y;
                if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
                    this.vel.x = (dx > 1 ? 1 : -1) * this.movementSpeed * (Math.abs(dx) / (Math.abs(dx) + Math.abs(dy)));
                    this.vel.y = (dy > 1 ? 1 : -1) * this.movementSpeed * (Math.abs(dy) / (Math.abs(dx) + Math.abs(dy)));
                } else {
                    this.vel.y = 0;
                    this.vel.x = 0;
                    this.waiting = true;
                    this.timer = new ig.Timer(this.points[this.index][2]);
                }
            } else {
                if (this.timer.delta() >= 0) {
                    this.waiting = false;
                    this.nextPoint();
                }
            }
        }
    });
});﻿

// lib/game/entities/car3.js
ig.baked = true;
ig.module('game.entities.car3').requires('impact.entity').defines(function() {
    EntityCar3 = ig.Entity.extend({
        size: {
            x: 0,
            y: 0
        },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.NEVER,
        gravityFactor: 0,
        movementSpeed: 110,
        maxVel: {
            x: 110,
            y: 110
        },
        animSheet: new ig.AnimationSheet('media/car_blue.png', 32, 24),
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('a0', 1, [3], true);
            this.addAnim('a1', 1, [1], true);
            this.addAnim('a2', 1, [0], true);
            this.addAnim('a3', 1, [2], true);
            this.points = new Array([-50, 509, 0, 3], [578, 145, 3, 3], [700, 76, 3, 3], [742, 53, 0, 3], [560, -50, 6, 0]);
            this.waiting = false;
            this.start();
        },
        start: function() {
            this.index = 0;
            this.pos.x = this.points[this.index][0];
            this.pos.y = this.points[this.index][1];
            this.nextPoint();
        },
        nextPoint: function() {
            this.index++;
            if (this.index < this.points.length) {
                this.toX = this.points[this.index][0];
                this.toY = this.points[this.index][1];
                switch (this.points[this.index][3]) {
                    case 0:
                        this.currentAnim = this.anims.a0;
                        break;
                    case 1:
                        this.currentAnim = this.anims.a1;
                        break;
                    case 2:
                        this.currentAnim = this.anims.a2;
                        break;
                    case 3:
                        this.currentAnim = this.anims.a3;
                        break;
                }
            } else {
                this.start();
            }
        },
        update: function() {
            this.parent();
            if (!this.waiting) {
                var dx = this.toX - this.pos.x;
                var dy = this.toY - this.pos.y;
                if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
                    this.vel.x = (dx > 1 ? 1 : -1) * this.movementSpeed * (Math.abs(dx) / (Math.abs(dx) + Math.abs(dy)));
                    this.vel.y = (dy > 1 ? 1 : -1) * this.movementSpeed * (Math.abs(dy) / (Math.abs(dx) + Math.abs(dy)));
                } else {
                    this.vel.y = 0;
                    this.vel.x = 0;
                    this.waiting = true;
                    this.timer = new ig.Timer(this.points[this.index][2]);
                }
            } else {
                if (this.timer.delta() >= 0) {
                    this.waiting = false;
                    this.nextPoint();
                }
            }
        }
    });
});﻿


// lib/game/entities/introdialog.js
ig.baked = true;
ig.module('game.entities.introdialog').requires('impact.entity').defines(function() {
    EntityIntroDialog = ig.Entity.extend({
        size: {
            x: 0,
            y: 0
        },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.NEVER,
        gravityFactor: 0,
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.animSheet = new ig.AnimationSheet('media/safePath_dialog.png.png', 867, 558);
            this.addAnim('l1intro', 1, [0], true);
            this.addAnim('l2intro', 1, [3], true);
            this.addAnim('l1win', 1, [1], true);
            this.addAnim('l2win', 1, [4], true);
            this.addAnim('tryagain', 1, [2], true);
            this.checkingMouse = false;
            this.fadingOut = false;
        },
        showButtons: function() {
            ig.input.bind(ig.KEY.MOUSE1, 'leftMouse');
            this.nextBtn = ig.game.spawnEntity(EntityWalkButtonNext, 690, 460);
            this.backBtn = ig.game.spawnEntity(EntityButtonTryAgain, 110, 460, {
                which: "back"
            });
            this.checkingMouse = true;
        },
        fadeOut: function() {
            this.fadingOut = true;
            this.checkingMouse = false;
        },
        update: function() {
            this.parent();
            if (this.fadingOut) {
                this.currentAnim.alpha -= .05;
                this.nextBtn.currentAnim.alpha -= .05;
                this.backBtn.currentAnim.alpha -= .05;
                if (this.currentAnim.alpha <= 0) {
                    this.kill();
                    this.nextBtn.kill();
                    this.backBtn.kill();
                    this.fadingOut = false;
                }
            }
            if (ig.input.pressed('leftMouse') && this.checkingMouse) {
                var mx = ig.input.mouse.x;
                var my = ig.input.mouse.y;
                if (mx > this.nextBtn.pos.x && mx < this.nextBtn.pos.x + this.nextBtn.size.x && my > this.nextBtn.pos.y && my < this.nextBtn.pos.y + this.nextBtn.size.y) {
                    this.checkingMouse = false;
                    ig.game.buttonNext();
                }
                if (mx > this.backBtn.pos.x && mx < this.backBtn.pos.x + this.backBtn.size.x && my > this.backBtn.pos.y && my < this.backBtn.pos.y + this.backBtn.size.y) {
                    this.checkingMouse = false;
                    ig.game.buttonBack();
                }
            }
        }
    });
});﻿

// lib/game/entities/spdialog.js
ig.baked = true;
ig.module('game.entities.spdialog').requires('impact.entity', 'game.entities.btntryagain').defines(function() {
    EntitySPDialog = ig.Entity.extend({
        size: {
            x: 0,
            y: 0
        },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.NEVER,
        gravityFactor: 0,
        animSheet: new ig.AnimationSheet('media/safePath_dialog.png', 867, 558),
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.font = new ig.Font('media/font_quizyourself.png');
            this.font.lineSpacing = -2;
            this.addAnim('l1intro', 1, [0], true);
            this.addAnim('l2intro', 1, [3], true);
            this.addAnim('l1win', 1, [1], true);
            this.addAnim('l2win', 1, [4], true);
            this.addAnim('tryagain', 1, [2], true);
            this.addAnim('quizwin', 1, [6], true);
            this.addAnim('quizlose', 1, [7], true);
            this.checkingMouse = false;
            this.fadingOut = false;
        },
        fadeOut: function() {
            this.fadingOut = true;
            this.checkingMouse = false;
        },
        text: function(s) {
            this.message = s;
            this.messageShowing = true;
        },
        show: function(whichDialog, b1, b1c, b1s, b2, b2c, b2s) {
            this.messageShowing = false;
            this.pos.x = 48;
            this.pos.y = 40;
            if (this.btn1) {
                this.btn1.kill();
                delete this.btn1;
            }
            if (this.btn2) {
                this.btn2.kill();
                delete this.btn2;
            }
            this.b1Callback = b1c;
            this.b1Scope = b1s;
            this.b2Callback = b2c;
            this.b2Scope = b2s;
            ig.input.bind(ig.KEY.MOUSE1, 'leftMouse');
            switch (whichDialog) {
                case 'l1intro':
                    this.currentAnim = this.anims.l1intro;
                    break;
                case 'l2intro':
                    this.currentAnim = this.anims.l2intro;
                    break;
                case 'l1win':
                    this.currentAnim = this.anims.l1win;
                    break;
                case 'l2win':
                    this.currentAnim = this.anims.l2win;
                    break;
                case 'tryagain':
                    this.currentAnim = this.anims.tryagain;
                    break;
                case 'quizwin':
                    this.currentAnim = this.anims.quizwin;
                    break;
                case 'quizlose':
                    this.currentAnim = this.anims.quizlose;
                    break;
            }
            this.b1 = b1;
            switch (b1) {
                case 'back':
                    //this.btn1 = ig.game.spawnEntity(EntityButtonTryAgain, 110, 450, {
                    this.btn1 = ig.game.spawnEntity(EntityButtonTryAgain, 655, 476, {
                        which: 'back'
                    });
                    break;
                case 'arrowf':
                    this.btn1 = ig.game.spawnEntity(EntityButtonTryAgain, 110, 450, {
                        which: 'arrowf'
                    });
                    break;
                case 'try':
                    this.btn1 = ig.game.spawnEntity(EntityButtonTryAgain, 110, 450, {
                        which: 'try'
                    });
                    break;
                case 'arrowb':
                    this.btn1 = ig.game.spawnEntity(EntityButtonTryAgain, 110, 450, {
                        which: 'arrowb'
                    });
                    break;
                case 'menu':
                    /*this.btn1 = ig.game.spawnEntity(EntityButtonTryAgain, 110, 475, {
                        which: 'menu'
                    });*/
                    break;
            }
            this.b2 = b2;
            switch (b2) {
                case 'arrowf':
                    this.btn2 = ig.game.spawnEntity(EntityButtonTryAgain, 700, 450, {
                        which: 'arrowf'
                    });
                    break;
                case 'two':
                    this.btn2 = ig.game.spawnEntity(EntityButtonTryAgain, 650, 450, {
                        which: 'two'
                    });
                    break;
                case 'menu':
                    this.btn2 = ig.game.spawnEntity(EntityButtonTryAgain, 700, 470, {
                        which: 'menu'
                    });
                    break;
            }
            this.checkingMouse = true;
            this.currentAnim.alpha = 0;
            if (this.btn1) {
                this.btn1.currentAnim.alpha = 0;
            }
            if (this.btn2) {
                this.btn2.currentAnim.alpha = 0;
            }
            this.fadingIn = true;
            this.fadingOut = false;
        },
        draw: function() {
            this.parent();
            if (this.messageShowing) {
                this.font.draw(this.message, this.pos.x + 433, this.pos.y + 180, ig.Font.ALIGN.CENTER);
            }
        },
        update: function() {
            this.parent();
            if (this.fadingIn) {
                this.currentAnim.alpha += .05;
                if (this.btn1) {
                    this.btn1.currentAnim.alpha += .05;
                }
                if (this.btn2) {
                    this.btn2.currentAnim.alpha += .05;
                }
                if (this.currentAnim.alpha >= 1) {
                    this.currentAnim.alpha = 1;
                    if (this.btn1) {
                        this.btn1.currentAnim.alpha = 1;
                    }
                    if (this.btn2) {
                        this.btn2.currentAnim.alpha = 1;
                    }
                    this.fadingIn = false;
                }
            }
            if (this.fadingOut) {
                this.currentAnim.alpha -= .05;
                if (this.btn1) {
                    this.btn1.currentAnim.alpha -= .05;
                }
                if (this.btn2) {
                    this.btn2.currentAnim.alpha -= .05;
                }
                if (this.currentAnim.alpha <= 0) {
                    this.currentAnim.alpha = 0;
                    if (this.btn1) {
                        this.btn1.currentAnim.alpha = 0;
                        this.btn1.kill(); // JB
                    }
                    if (this.btn2) {
                        this.btn2.currentAnim.alpha = 0;
                        this.btn2.kill(); // JB
                    }
                    this.fadingOut = false;
                    this.pos.x = -1000;
                    //this.btn1.kill();
                    //this.btn2.kill();
                }
            }
            if (ig.input.released('leftMouse') && this.checkingMouse) {
                var mx = ig.input.mouse.x;
                var my = ig.input.mouse.y;
                if (this.btn1) {
                    if (mx > this.btn1.pos.x && mx < this.btn1.pos.x + this.btn1.size.x && my > this.btn1.pos.y && my < this.btn1.pos.y + this.btn1.size.y) {
                        this.checkingMouse = false;
                        this.b1Callback.call(this.b1Scope);
                    }
                }
                if (this.btn2) {
                    if (mx > this.btn2.pos.x && mx < this.btn2.pos.x + this.btn2.size.x && my > this.btn2.pos.y && my < this.btn2.pos.y + this.btn2.size.y) {
                        this.checkingMouse = false;
                        this.b2Callback.call(this.b2Scope);
                    }
                }
            }
        }
    });
});﻿


// lib/plugins/impact-storage.js
ig.baked = true;
ig.module('plugins.impact-storage').requires('impact.game').defines(function() {
    ig.Storage = ig.Class.extend({
        staticInstantiate: function(i) {
            return !ig.Storage.instance ? null : ig.Storage.instance;
        },
        init: function() {
            ig.Storage.instance = this;
        },
        isCapable: function() {
            return !(typeof(window.localStorage) === 'undefined');
        },
        isSet: function(key) {
            return !(this.get(key) === null);
        },
        initUnset: function(key, value) {
            if (this.get(key) === null) this.set(key, value);
        },
        get: function(key) {
            if (!this.isCapable()) return null;
            try {
                return JSON.parse(localStorage.getItem(key));
            } catch (e) {
                return window.localStorage.getItem(key);
            }
        },
        getInt: function(key) {
            return ~~this.get(key);
        },
        getFloat: function(key) {
            return parseFloat(this.get(key));
        },
        getBool: function(key) {
            return !!this.get(key);
        },
        key: function(n) {
            return this.isCapable() ? window.localStorage.key(n) : null;
        },
        set: function(key, value) {
            if (!this.isCapable()) return null;
            try {
                window.localStorage.setItem(key, JSON.stringify(value));
            } catch (e) {
                if (e == QUOTA_EXCEEDED_ERR)
                    console.log('localStorage quota exceeded');
            }
        },
        setHighest: function(key, value) {
            if (value > this.getFloat(key)) this.set(key, value);
        },
        remove: function(key) {
            if (!this.isCapable()) return null;
            window.localStorage.removeItem(key);
        },
        clear: function() {
            if (!this.isCapable()) return null;
            window.localStorage.clear();
        }
    });
});

// lib/game/walkactivity.js
ig.baked = true;
ig.module('game.walkactivity').requires('impact.game', 'impact.image', 'impact.input', 'game.entities.arrowcursor', 'game.entities.walkingguy', 'game.entities.walkingbg', 'game.entities.walkingbg_fg', 'game.entities.messageballoon', 'game.entities.truck1', 'game.entities.truck2', 'game.entities.bus1', 'game.entities.car1', 'game.entities.car2', 'game.entities.car3', 'game.entities.whiteBorder', 'game.entities.introdialog', 'game.entities.spdialog', 'plugins.impact-storage').defines(function() {
    WalkingActivity = ig.Game.extend({
        init: function() {
            this.storage = new ig.Storage();
            this.level = this.storage.get('safepath_level');
            if (this.level == null) {
                this.level = 1;
                this.storage.set('safepath_level', 1);
            }
            this.numTries = 1;
            this.bg = ig.game.spawnEntity(EntityWalkingBG, 0, 0);
            this.pointMap = new Array([1, 18, 103, [0, 2, 6, 0]], [2, 59, 74, [0, 3, 7, 1]], [3, 154, 20, [0, 0, 42, 2]], [4, 107, 354, [0, 5, 15, 0]], [5, 188, 307, [0, 6, 16, 4]], [6, 276, 254, [1, 7, 17, 5]], [7, 324, 226, [2, 8, 18, 6]], [8, 420, 174, [42, 9, 19, 7]], [9, 467, 144, [0, 10, 20, 8]], [10, 655, 39, [0, 'p', 21, 9]], [11, 22, 537, [0, 12, 30, 0]], [12, 98, 494, [0, 13, 31, 11]], [13, 146, 465, [0, 14, 32, 12]], [14, 227, 443, [15, 15, 33, 13]], [15, 223, 418, [4, 16, 14, 14]], [16, 299, 374, [5, 17, 25, 15]], [17, 392, 320, [6, 18, 26, 16]], [18, 441, 293, [7, 19, 27, 17]], [19, 536, 241, [8, 20, 28, 18]], [20, 583, 213, [9, 21, 29, 19]], [21, 768, 104, [10, 'p', 34, 20]], [22, 261, 587, [31, 23, 0, 0]], [23, 311, 560, [32, 24, 38, 22]], [24, 387, 512, [33, 'p', 39, 23]], [25, 576, 535, [16, 26, 41, 39]], [26, 672, 479, [17, 27, 'p', 25]], [27, 714, 451, [18, 28, 'p', 26]], [28, 810, 395, [19, 'p', 'p', 27]], [29, 692, 277, [20, 34, 37, 'p']], [30, 132, 601, [11, 31, 0, 0]], [31, 208, 558, [12, 32, 22, 30]], [32, 254, 529, [13, 33, 23, 31]], [33, 333, 484, [14, 'p', 24, 32]], [34, 878, 167, [21, 35, 36, 29]], [35, 924, 141, [45, 0, 0, 34]], [36, 931, 200, [34, 0, 0, 's']], [37, 746, 306, [29, 's', 's', 'p']], [38, 420, 625, [23, 39, 0, 0]], [39, 502, 580, [24, 25, 40, 38]], [40, 552, 611, [39, 41, 0, 0]], [41, 628, 564, [25, 0, 0, 40]], [42, 244, 70, [3, 'p', 8, 0]], [43, 807, 79, [44, 0, 45, 'p']], [44, 699, 16, [0, 0, 43, 'p']], [45, 854, 105, [43, 0, 35, 'p']]);
            this.driveways = new Array([5, 6], [7, 8], [18, 19], [18, 27], [16, 17]);
            this.medians = new Array([4, 15], [5, 16], [6, 17], [7, 18], [8, 19], [9, 20], [10, 21]);
            this.rails = new Array([9, 10], [20, 21], [29, 34]);
            this.winPath1 = new Array([42, 8, 19, 28, 27, 26, 25, 39], [42, 3, 2, 7, 18, 17, 26, 25, 39], [42, 3, 2, 7, 6, 17, 26, 25, 39]);
            this.winPath2 = new Array([45, 35, 34, 29, 20, 9, 8, 42], [45, 35, 34, 29, 20, 19, 8, 42], [45, 35, 34, 21, 20, 9, 8, 42], [45, 35, 34, 21, 20, 19, 8, 42]);
            this.redTruckCrossings = new Array([8, 9], [19, 20], [25, 41], [39, 40]);
            this.yellowCarCrossings = new Array([25, 39], [40, 41], [15, 16], [4, 5]);
            this.purpleTruckCrossings = new Array([25, 39], [40, 41], [15, 16], [4, 5]);
            this.busCrossings = new Array([4, 15], [5, 16], [6, 17], [7, 18], [8, 19], [9, 20], [10, 21], [10, 44]);
            this.blueCarCrossings = new Array([4, 15], [5, 16], [6, 17], [7, 18], [8, 19], [9, 20], [10, 21], [10, 44]);
            this.orangeCarCrossings = new Array([34, 35], [21, 43], [10, 21], [9, 20], [8, 19], [7, 18], [6, 17], [5, 16], [4, 15]);
            this.messages = {
                's': 'It is safest to walk where\nthere are sidewalks.\nGo back to the other side.',
                'w': "Wrong Way",
                'm': "Use this grassy median as a\nsafe place to wait if you\ncannot safely get all the way\nacross this busy street.",
                'd': "Watch out crossing\ndriveways! Be sure to look\nboth ways for turning cars!",
                'p': "You may not cross midblock,\nnothing is slowing traffic.\nIt's safest to cross at corners.",
                'c': "Caution when using this\ncrosswalk, there is a turn\nlane for cars, be very\ncareful crossing here!",
                'r': "Did you stop,\nlook and listen\nfor trains before crossing?"
            };
            ig.input.initMouse();
            this.truck1 = ig.game.spawnEntity(EntityTruck1, 0, 0);
            this.truck2 = ig.game.spawnEntity(EntityTruck2, 0, 0);
            this.car1 = ig.game.spawnEntity(EntityCar1, 0);
            this.car2 = ig.game.spawnEntity(EntityCar2, 0);
            this.car3 = ig.game.spawnEntity(EntityCar3, 0);
            this.bus1 = ig.game.spawnEntity(EntityBus1, 0);
            this.fg = ig.game.spawnEntity(EntityWalkingBGFG, 0, 0);
            /*this.btnMenu = ig.game.spawnEntity(EntityButtonTryAgain, 20, 20, {
                which: 'backsmall'
            });*/
            this.btnHelp = ig.game.spawnEntity(EntityButtonTryAgain, 55, 55, {
                which: 'help'
            });
            this.whiteBorder = ig.game.spawnEntity(EntityWhiteBorder, 0, 0);
            this.balloon = ig.game.spawnEntity(EntityMessageBalloon, -500, -500);
            this.spDialog = ig.game.spawnEntity(EntitySPDialog, -1000, 0);
            this.isChrome = window.chrome;
            this.isIntro = true;
            this.startLevel();
        },
        startLevel: function() {
            if (this.music) {
                this.music.stop();
            }
            if (this.sound) {
                this.sound.stop();
            }
            this.playerPath = [];
            this.isIntro = true;
            if (this.level == 1) {
                this.spDialog.show('l1intro', 'menu', this.buttonBack, this, 'arrowf', this.buttonNext, this);
                this.currentPoint = 42;
                this.music = new ig.Music();
                this.music.add('media/audio/Level one instructions.*');
                //this.music.add('media/audio/Lesson1rai_1.*');
                //this.music.add('media/audio/Lesson1rai_2.*');
                this.music.disableMasterLoop();
                this.music.play();
            } else {
                this.spDialog.show('l2intro', 'menu', this.buttonBack, this, 'arrowf', this.buttonNext, this);
                this.currentPoint = 45;
                this.sound = new ig.Sound('media/audio/Level two instructions.*');
                //this.sound = new ig.Sound('media/audio/Lesson1rai_5.*');
                this.sound.play();
            }
            this.playerPath.push(this.currentPoint);
            this.guyWalking = false;
        },
        showHelp: function() {
            this.isIntro = true;
            delete this.spDialog;
            this.spDialog = ig.game.spawnEntity(EntitySPDialog, -1000, 0);
            if (this.level == 1) {
                this.spDialog.show('l1intro', 'back', this.closeHelp, this);
                this.music = new ig.Music();
                this.music.add('media/audio/Level one instructions.*');
                //this.music.add('media/audio/Lesson1rai_1.*');
                //this.music.add('media/audio/Lesson1rai_2.*');
                this.music.disableMasterLoop();
                this.music.play();
            } else {
                this.spDialog.show('l2intro', 'back', this.closeHelp, this);
                this.sound = new ig.Sound('media/audio/Level two instructions.*');
                //this.sound = new ig.Sound('media/audio/Lesson1rai_5.*');
                this.sound.play();
            }
        },
        closeHelp: function() {
            if (this.music) {
                this.music.stop();
            }
            if (this.sound) {
                this.sound.stop();
            }
            this.isIntro = false;
            this.spDialog.fadeOut();
        },
        buttonNext: function() {
            if (this.music) {
                this.music.stop();
            }
            if (this.sound) {
                this.sound.stop();
            }
            this.isIntro = false;
            this.spDialog.fadeOut();
            this.guy = ig.game.spawnEntity(EntityWalkingGuy, this.pointMap[this.currentPoint - 1][1], this.pointMap[this.currentPoint - 1][2]);
            this.compass = ig.game.spawnEntity(EntityArrowCursor, this.pointMap[this.currentPoint - 1][1], this.pointMap[this.currentPoint - 1][2]);
            this.balloon.show("Which way would\nyou like to go?", this.guy.getPos()[0], this.guy.getPos()[1]);
            ig.input.bind(ig.KEY.MOUSE1, 'leftMouse');
            this.showCursor();
        },
        buttonBack: function(context) {
            /*if (this.music) {
                this.music.stop();
            }
            if (this.sound) {
                this.sound.stop();
            }
            ig.system.setGame(MainMenu);*/
        },
        guyPos: function() {
            return [this.guy.pos.x, this.guy.pos.y];
        },
        update: function() {
            this.parent();
            if (ig.input.pressed('leftMouse')) {
                var mx = ig.input.mouse.x;
                var my = ig.input.mouse.y;
                /*if (mx > 20 && mx < 54 && my > 20 && my < 54) {
                    this.doMain();
                }*/
                if (mx > 55 && mx < 89 && my > 55 && my < 88) {
                    this.showHelp();
                }
            }
        },
        draw: function() {
            this.parent();
            if (this.isIntro) {
                return;
            }
            var ctx = ig.system.context;
            ctx.strokeStyle = '#0066ff';
            ctx.beginPath();
            ctx.lineWidth = 5;
            if (this.isChrome) {
                ctx.setLineDash([6, 4]);
            }
            if (!this.guyWalking) {
                ctx.lineDashOffset += .5;
            }
            var pathIndex;
            if (this.playerPath.length == 1) {
                pathIndex = 0;
            } else {
                pathIndex = this.playerPath.length - 2;
            }
            var pointIndex;
            var gPos = this.guy.getPos();
            var gX = gPos[0] - ig.game.screen.x;
            var gY = gPos[1] - ig.game.screen.y;
            ctx.moveTo(gX, gY);
            for (var i = pathIndex; i >= 0; i--) {
                pointIndex = this.playerPath[i] - 1;
                pointX = this.pointMap[pointIndex][1] - ig.game.screen.x;
                pointY = this.pointMap[pointIndex][2] - ig.game.screen.y;
                ctx.lineTo(pointX, pointY);
            }
            ctx.stroke();
            ctx.closePath();
            this.compass.overDraw();
            this.guy.draw();
            this.balloon.draw();
        },
        showCursor: function() {
            var schoolPoints = new Array(23, 24, 39);
            if (this.level == 1 && schoolPoints.indexOf(this.currentPoint) != -1) {
                for (var j = 0; j < this.winPath1.length; j++) {
                    var winner = true;
                    var wp = this.winPath1[j];
                    if (this.playerPath.length == wp.length) {
                        for (var i = 0; i < wp.length; i++) {
                            if (this.playerPath[i] != wp[i]) {
                                winner = false;
                            }
                        }
                    } else {
                        winner = false;
                    }
                    if (winner == true) {
                        break;
                    }
                }
                this.playerPath = [];
                this.guy.kill();
                this.compass.kill();
                this.isIntro = true;
                if (winner) {
                    this.spDialog.show('l1win', 'try', this.startLevel, this, 'two', this.levelTwo, this);
                    this.music = new ig.Music();
                    this.music.add('media/audio/Level one correct.*');
                    //this.music.add('media/audio/Lesson1rai_3.*');
                    //this.music.add('media/audio/Lesson1rai_4.*');
                    this.music.disableMasterLoop();
                    this.music.play();
                } else {
                    if (this.numTries == 1) {
                        this.spDialog.show('tryagain', 'try', this.startLevel, this);
                    } else {
                        this.spDialog.show('tryagain', 'try', this.startLevel, this, 'two', this.levelTwo, this);
                    }
                    this.numTries++;
                    this.sound = new ig.Sound('media/audio/Level  incorrect.*');
                    //this.sound = new ig.Sound('media/audio/Lesson1rai_7.*');
                    this.sound.play();
                }
            } else if (this.level == 2 && this.currentPoint == 42) {
                for (var j = 0; j < this.winPath2.length; j++) {
                    var winner = true;
                    var wp = this.winPath2[j];
                    if (this.playerPath.length == wp.length) {
                        for (var i = 0; i < wp.length; i++) {
                            if (this.playerPath[i] != wp[i]) {
                                winner = false;
                            }
                        }
                    } else {
                        winner = false;
                    }
                    if (winner == true) {
                        break;
                    }
                }
                this.playerPath = [];
                this.guy.kill();
                this.compass.kill();
                this.isIntro = true;
                if (winner) {
                    //this.spDialog.show('l2win', 'try', this.startLevel, this, 'menu', this.doMain, this);
                    this.spDialog.show('l2win', 'try', this.startLevel, this);
                    this.music = new ig.Music();
                    this.music.add('media/audio/Level two correct.*');
                    //this.music.add('media/audio/Lesson1rai_8.*');
                    //this.music.add('media/audio/Lesson1rai_9.*');
                    this.music.disableMasterLoop();
                    this.music.play();
                    this.storage.set('safepath', 'passed');
                } else {
                    if (this.numTries == 1) {
                        this.spDialog.show('tryagain', 'try', this.startLevel, this);
                    } else {
                        this.spDialog.show('tryagain', 'try', this.startLevel, this, 'menu', this.doMain, this);
                    }
                    this.numTries++;
                    this.sound = new ig.Sound('media/audio/Level  incorrect.*');
                    //this.sound = new ig.Sound('media/audio/Lesson1rai_7.*');
                    this.sound.play();
                }
            } else {
                var arrayIndex = this.currentPoint - 1;
                this.directionArray = this.pointMap[arrayIndex][3];
                this.lastX = this.pointMap[arrayIndex][1];
                this.lastY = this.pointMap[arrayIndex][2];
                this.guyWalking = false;
                this.compass.removeArrows();
                this.compass.showArrows(this.lastX, this.lastY, this.directionArray);
                this.checkPath();
            }
        },
        levelOne: function() {
            this.level = 1;
            this.startLevel();
        },
        levelTwo: function() {
            this.numTries = 1;
            this.level = 2;
            this.startLevel();
        },
        doMain: function() {
            //this.music.stop();
            //ig.system.setGame(MainMenu);
        },
        carHonk: function() {
            if (Math.random() < .5) {
                this.sound = new ig.Sound('media/audio/honk1.*');
            } else {
                this.sound = new ig.Sound('media/audio/honk2.*');
            }
            this.sound.play();
        },
        cursorPress: function(which) {
            this.balloon.hide();
            var dir = this.directionArray[which - 1];
            this.drivewayCrossed = false;
            this.medianCrossed = false;
            if (dir != 'p' && dir != 's') {
                var lastPoint = this.currentPoint;
                this.currentPoint = this.pointMap[dir - 1][0];
                var pointX = this.pointMap[dir - 1][1];
                var pointY = this.pointMap[dir - 1][2];
                var carDist = 180;
                var busDist = 300;
                for (var i = 0; i < this.redTruckCrossings.length; i++) {
                    if ((lastPoint == this.redTruckCrossings[i][0] || lastPoint == this.redTruckCrossings[i][1]) && (this.currentPoint == this.redTruckCrossings[i][0] || this.currentPoint == this.redTruckCrossings[i][1])) {
                        if (this.currentPoint < 25) {
                            if (this.guy.distanceTo(this.truck2) < carDist && ((this.truck2.pos.x < this.guy.getPos()[0]))) {
                                this.currentPoint = lastPoint;
                                this.balloon.show("Watch out for traffic!", this.guy.getPos()[0], this.guy.getPos()[1]);
                                this.carHonk();
                                return;
                            }
                            break;
                        } else {
                            if (this.guy.distanceTo(this.truck2) < carDist && ((this.truck2.pos.y < this.guy.getPos()[1]))) {
                                this.currentPoint = lastPoint;
                                this.balloon.show("Watch out for traffic!", this.guy.getPos()[0], this.guy.getPos()[1]);
                                this.carHonk();
                                return;
                            }
                            break;
                        }
                    }
                }
                for (var i = 0; i < this.yellowCarCrossings.length; i++) {
                    if ((lastPoint == this.yellowCarCrossings[i][0] || lastPoint == this.yellowCarCrossings[i][1]) && (this.currentPoint == this.yellowCarCrossings[i][0] || this.currentPoint == this.yellowCarCrossings[i][1])) {
                        if (this.guy.distanceTo(this.car1) < carDist && (this.car1.pos.x > this.guy.pos.x)) {
                            this.currentPoint = lastPoint;
                            this.balloon.show("Watch out for traffic!", this.guy.getPos()[0], this.guy.getPos()[1]);
                            this.carHonk();
                            return;
                        }
                        break;
                    }
                }
                for (var i = 0; i < this.purpleTruckCrossings.length; i++) {
                    if ((lastPoint == this.purpleTruckCrossings[i][0] || lastPoint == this.purpleTruckCrossings[i][1]) && (this.currentPoint == this.purpleTruckCrossings[i][0] || this.currentPoint == this.purpleTruckCrossings[i][1])) {
                        if (this.guy.distanceTo(this.truck1) < carDist && (this.truck1.pos.x < this.guy.pos.x)) {
                            this.currentPoint = lastPoint;
                            this.balloon.show("Watch out for traffic!", this.guy.getPos()[0], this.guy.getPos()[1]);
                            this.carHonk();
                            return;
                        }
                        break;
                    }
                }
                for (var i = 0; i < this.busCrossings.length; i++) {
                    if ((lastPoint == this.busCrossings[i][0] || lastPoint == this.busCrossings[i][1]) && (this.currentPoint == this.busCrossings[i][0] || this.currentPoint == this.busCrossings[i][1])) {
                        if (this.guy.distanceTo(this.bus1) < busDist && (this.bus1.pos.y > this.guy.getPos()[1])) {
                            this.currentPoint = lastPoint;
                            this.balloon.show("Watch out for traffic!", this.guy.getPos()[0], this.guy.getPos()[1]);
                            this.carHonk();
                            return;
                        }
                        break;
                    }
                }
                for (var i = 0; i < this.blueCarCrossings.length; i++) {
                    if ((lastPoint == this.blueCarCrossings[i][0] || lastPoint == this.blueCarCrossings[i][1]) && (this.currentPoint == this.blueCarCrossings[i][0] || this.currentPoint == this.blueCarCrossings[i][1])) {
                        if (this.guy.distanceTo(this.car3) < carDist && (this.car3.pos.y > this.guy.pos.y + 30)) {
                            this.currentPoint = lastPoint;
                            this.balloon.show("Watch out for traffic!", this.guy.getPos()[0], this.guy.getPos()[1]);
                            this.carHonk();
                            return;
                        }
                        break;
                    }
                }
                for (var i = 0; i < this.orangeCarCrossings.length; i++) {
                    if ((lastPoint == this.orangeCarCrossings[i][0] || lastPoint == this.orangeCarCrossings[i][1]) && (this.currentPoint == this.orangeCarCrossings[i][0] || this.currentPoint == this.orangeCarCrossings[i][1])) {
                        if (this.currentPoint == 34 || this.currentPoint == 35) {
                            if (this.guy.distanceTo(this.car2) < carDist && this.car2.pos.x + 20 > this.guy.getPos()[0]) {
                                this.currentPoint = lastPoint;
                                this.balloon.show("Watch out for traffic!", this.guy.getPos()[0], this.guy.getPos()[1]);
                                this.carHonk();
                                return;
                            }
                            break;
                        } else {
                            if (this.guy.distanceTo(this.car2) < carDist && this.car2.pos.y < this.guy.getPos()[1]) {
                                this.currentPoint = lastPoint;
                                this.balloon.show("Watch out for traffic!", this.guy.getPos()[0], this.guy.getPos()[1]);
                                this.carHonk();
                                return;
                            }
                            break;
                        }
                    }
                }
                this.playerPath.push(this.currentPoint);
                for (var i = 0; i < this.driveways.length; i++) {
                    if ((lastPoint == this.driveways[i][0] && this.currentPoint == this.driveways[i][1]) || (lastPoint == this.driveways[i][1] && this.currentPoint == this.driveways[i][0])) {
                        this.drivewayCrossed = true;
                        break;
                    }
                }
                for (var i = 0; i < this.medians.length; i++) {
                    if ((lastPoint == this.medians[i][0] && this.currentPoint == this.medians[i][1]) || (lastPoint == this.medians[i][1] && this.currentPoint == this.medians[i][0])) {
                        this.medianCrossed = true;
                        break;
                    }
                }
                for (var i = 0; i < this.rails.length; i++) {
                    if ((lastPoint == this.rails[i][0] && this.currentPoint == this.rails[i][1]) || (lastPoint == this.rails[i][1] && this.currentPoint == this.rails[i][0])) {
                        this.railCrossed = true;
                        break;
                    }
                }
                if ((lastPoint == 14 && this.currentPoint == 15) || (lastPoint == 15 && this.currentPoint == 14)) {
                    this.balloon.show(this.messages.c, this.guy.getPos()[0], this.guy.getPos()[1]);
                }
                this.guy.moveTo(which, pointX, pointY);
                this.guyWalking = true;
                this.compass.removeArrows();
            } else {
                this.balloon.show(this.messages[dir], this.guy.getPos()[0], this.guy.getPos()[1]);
            }
        },
        halfWay: function() {
            if (this.drivewayCrossed) {
                this.drivewayCrossed = false;
                this.balloon.show(this.messages.d, this.guy.getPos()[0], this.guy.getPos()[1]);
            }
            if (this.medianCrossed) {
                this.medianCrossed = false;
                this.balloon.show(this.messages.m, this.guy.getPos()[0], this.guy.getPos()[1]);
            }
            if (this.railCrossed) {
                this.railCrossed = false;
                this.balloon.show(this.messages.r, this.guy.getPos()[0], this.guy.getPos()[1]);
            }
        },
        checkPath: function() {
            if (this.playerPath.length < 3) {
                return;
            }
            var last = this.playerPath.length - 1;
            if (this.playerPath[last] == this.playerPath[last - 2]) {
                this.playerPath.pop();
                this.playerPath.pop();
            }
        }
    });
});﻿﻿

// lib/game/main.js

var safePathsSCORM = true;

var safePathsCanContinue = true;
if(safePathsSCORM){
    var canContinue = SCORM_API_adapter.lmsInitialize();
}
if(safePathsCanContinue){
    var canvas = document.getElementById('game');
    startImpactGame();
    //addClickthrough(canvas);
}else{
    alert("Unable to initialize SCORM API. Re-start course to try again.");
}

/*function addClickthrough(canvas){
    canvas.addEventListener('click', startImpactGame);
}*/

function startImpactGame(){
    ig.baked = true;
    ig.module('game.main').requires('impact.game', 'game.walkactivity', 'plugins.impact-storage').defines(function() {
        this.storage = new ig.Storage();
        ig.System.drawMode = ig.System.DRAW.SMOOTH;
        if (ig.ua.mobile) {
            ig.Sound.enabled = false;
        }
        ig.main('#canvas', WalkingActivity, 60, 960, 640, 1);
        if(safePathsSCORM){
            SCORM_API_adapter.markComplete();
        }
    });
}

