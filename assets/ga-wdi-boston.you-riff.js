"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('ga-wdi-boston.you-riff/about/route', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define("ga-wdi-boston.you-riff/about/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "IyLhLVaR", "block": "{\"statements\":[[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"about-us\"],[\"flush-element\"],[\"text\",\"You-Riff is a place where YouTube becomes more social and more informative. One of our favorite experiences is watching a film with a group of friends, sharing thoughts or cracking jokes at what's going on on the screen. You-Riff lets you do that virtually, without having to say \\\"go to 4:31!\\\" Just sign-up, add a video to our system, and get riffing!\"],[\"close-element\"],[\"text\",\"\\n\\n\\n\"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ga-wdi-boston.you-riff/about/template.hbs" } });
});
define('ga-wdi-boston.you-riff/ajax/service', ['exports', 'ember', 'ember-ajax/services/ajax', 'ga-wdi-boston.you-riff/config/environment'], function (exports, _ember, _emberAjaxServicesAjax, _gaWdiBostonYouRiffConfigEnvironment) {
  exports['default'] = _emberAjaxServicesAjax['default'].extend({
    host: _gaWdiBostonYouRiffConfigEnvironment['default'].apiHost,

    auth: _ember['default'].inject.service(),
    headers: _ember['default'].computed('auth.credentials.token', {
      get: function get() {
        var headers = {};
        var token = this.get('auth.credentials.token');
        if (token) {
          headers.Authorization = 'Token token=' + token;
        }

        return headers;
      }
    })
  });
});
define('ga-wdi-boston.you-riff/app', ['exports', 'ember', 'ga-wdi-boston.you-riff/resolver', 'ember-load-initializers', 'ga-wdi-boston.you-riff/config/environment'], function (exports, _ember, _gaWdiBostonYouRiffResolver, _emberLoadInitializers, _gaWdiBostonYouRiffConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _gaWdiBostonYouRiffConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _gaWdiBostonYouRiffConfigEnvironment['default'].podModulePrefix,
    Resolver: _gaWdiBostonYouRiffResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _gaWdiBostonYouRiffConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('ga-wdi-boston.you-riff/application/adapter', ['exports', 'ga-wdi-boston.you-riff/config/environment', 'active-model-adapter', 'ember'], function (exports, _gaWdiBostonYouRiffConfigEnvironment, _activeModelAdapter, _ember) {
  exports['default'] = _activeModelAdapter['default'].extend({
    host: _gaWdiBostonYouRiffConfigEnvironment['default'].apiHost,

    auth: _ember['default'].inject.service(),

    headers: _ember['default'].computed('auth.credentials.token', {
      get: function get() {
        var headers = {};
        var token = this.get('auth.credentials.token');
        if (token) {
          headers.Authorization = 'Token token=' + token;
        }

        return headers;
      }
    })
  });
});
define('ga-wdi-boston.you-riff/application/route', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    auth: _ember['default'].inject.service(),
    flashMessages: _ember['default'].inject.service(),

    actions: {
      changeVideo: function changeVideo(ytid, error) {
        var _this = this;

        var that = this;
        if (!error) {
          return new _ember['default'].RSVP.Promise(function (resolve) {
            that.store.findAll('video').then(function (videos) {
              resolve(videos.filterBy('ytid', ytid));
            });
          }).then(function (videos) {
            if (videos.length > 0) {
              var video = videos[0];
              _this.transitionTo('video', video.get('id'));
            } else {
              var newVid = _this.store.createRecord('video', {
                ytid: ytid
              });
              newVid.save().then(function (newVid) {
                _this.transitionTo('video', newVid.get('id'));
              });
            }
          });
        } else {
          this.get('flashMessages').danger(error);
        }
      },
      signOut: function signOut() {
        var _this2 = this;

        this.get('auth').signOut().then(function () {
          return _this2.get('store').unloadAll();
        }).then(function () {
          return _this2.transitionTo('sign-in');
        }).then(function () {
          _this2.get('flashMessages').warning('You have been signed out.');
        })['catch'](function () {
          _this2.get('flashMessages').danger('There was a problem. Are you sure you\'re signed-in?');
        });
      },

      error: function error(reason) {
        var unauthorized = reason.errors && reason.errors.some(function (error) {
          return error.status === '401';
        });

        if (unauthorized) {
          this.get('flashMessages').danger('You must be authenticated to access this page.');
          this.transitionTo('/sign-in');
        } else {
          this.get('flashMessages').danger('There was a problem. Please try again.');
        }

        return false;
      }
    }
  });
});
define('ga-wdi-boston.you-riff/application/serializer', ['exports', 'active-model-adapter'], function (exports, _activeModelAdapter) {
  exports['default'] = _activeModelAdapter.ActiveModelSerializer.extend({});
});
define("ga-wdi-boston.you-riff/application/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "Kk6tcRgD", "block": "{\"statements\":[[\"append\",[\"helper\",[\"my-application\"],null,[[\"signOut\",\"changeVideo\"],[\"signOut\",\"changeVideo\"]]],false],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-lg-12\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-md-4\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"nav nav-pills nav-stacked\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"about\"],null,2],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"https://github.com/ioncrash/you-riff\"],[\"flush-element\"],[\"text\",\"See it on Github\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\\n      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-md-4\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"nav nav-pills nav-stacked\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"videos\"],null,1],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"users\"],null,0],[\"close-element\"],[\"text\",\"\\n\\n      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-md-4\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"nav nav-pills nav-stacked\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"https://www.linkedin.com/in/benjamin-gray\\n\"],[\"flush-element\"],[\"text\",\"Visit My LinkedIn\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"https://ioncrash.github.io/Portfolio/\"],[\"flush-element\"],[\"text\",\"Other Projects\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"hr\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-lg-12\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"nav nav-pills nav-justified\"],[\"flush-element\"],[\"text\",\"\\n              \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"/\"],[\"flush-element\"],[\"text\",\"© 2017 Ben Gray\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"Users\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Videos\"]],\"locals\":[]},{\"statements\":[[\"text\",\"About us\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "ga-wdi-boston.you-riff/application/template.hbs" } });
});
define('ga-wdi-boston.you-riff/auth/service', ['exports', 'ember', 'ember-local-storage'], function (exports, _ember, _emberLocalStorage) {
  exports['default'] = _ember['default'].Service.extend({
    ajax: _ember['default'].inject.service(),
    credentials: (0, _emberLocalStorage.storageFor)('auth'),
    isAuthenticated: _ember['default'].computed.bool('credentials.token'),

    signUp: function signUp(credentials) {
      return this.get('ajax').post('/sign-up', {
        data: {
          credentials: {
            email: credentials.email,
            password: credentials.password,
            password_confirmation: credentials.passwordConfirmation
          }
        }
      });
    },

    signIn: function signIn(credentials) {
      var _this = this;

      return this.get('ajax').post('/sign-in', {
        data: {
          credentials: {
            email: credentials.email,
            password: credentials.password
          }
        }
      }).then(function (result) {
        _this.get('credentials').set('id', result.user.id);
        _this.get('credentials').set('email', result.user.email);
        _this.get('credentials').set('token', result.user.token);
      });
    },

    changePassword: function changePassword(passwords) {
      return this.get('ajax').patch('/change-password/' + this.get('credentials.id'), {
        data: {
          passwords: {
            old: passwords.previous,
            'new': passwords.next
          }
        }
      });
    },

    signOut: function signOut() {
      var _this2 = this;

      return this.get('ajax').del('/sign-out/' + this.get('credentials.id'))['finally'](function () {
        return _this2.get('credentials').reset();
      });
    }
  });
});
define('ga-wdi-boston.you-riff/auth/storage', ['exports', 'ember-local-storage/local/object'], function (exports, _emberLocalStorageLocalObject) {
  exports['default'] = _emberLocalStorageLocalObject['default'].extend({});
});
define('ga-wdi-boston.you-riff/change-password/route', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    auth: _ember['default'].inject.service(),
    flashMessages: _ember['default'].inject.service(),

    actions: {
      changePassword: function changePassword(passwords) {
        var _this = this;

        this.get('auth').changePassword(passwords).then(function () {
          return _this.get('auth').signOut();
        }).then(function () {
          return _this.transitionTo('sign-in');
        }).then(function () {
          _this.get('flashMessages').success('Successfully changed your password!');
        }).then(function () {
          _this.get('flashMessages').warning('You have been signed out.');
        })['catch'](function () {
          _this.get('flashMessages').danger('There was a problem. Please try again.');
        });
      }
    }
  });
});
define("ga-wdi-boston.you-riff/change-password/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "DnmzwB50", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"change-password-form\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"Change Password\"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"append\",[\"helper\",[\"change-password-form\"],null,[[\"submit\"],[\"changePassword\"]]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ga-wdi-boston.you-riff/change-password/template.hbs" } });
});
define('ga-wdi-boston.you-riff/components/change-password-form/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'form',
    classNames: ['form-horizontal'],

    passwords: {},

    actions: {
      submit: function submit() {
        this.sendAction('submit', this.get('passwords'));
      },

      reset: function reset() {
        this.set('passwords', {});
      }
    }
  });
});
define("ga-wdi-boston.you-riff/components/change-password-form/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "vq3By0dK", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"previous\"],[\"flush-element\"],[\"text\",\"Old Password\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"id\",\"placeholder\",\"value\"],[\"password\",\"form-control\",\"previous\",\"Old password\",[\"get\",[\"passwords\",\"previous\"]]]]],false],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"next\"],[\"flush-element\"],[\"text\",\"New Password\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"id\",\"placeholder\",\"value\"],[\"password\",\"form-control\",\"next\",\"New password\",[\"get\",[\"passwords\",\"next\"]]]]],false],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"btn btn-primary\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"submit\"]],[\"flush-element\"],[\"text\",\"\\n    Change Password\\n  \"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-default\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"reset\"]],[\"flush-element\"],[\"text\",\"\\n    Cancel\\n  \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ga-wdi-boston.you-riff/components/change-password-form/template.hbs" } });
});
define('ga-wdi-boston.you-riff/components/chat-box/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({

    classNameBindings: ['chat-box'],
    videoTime: _ember['default'].computed.alias('currentTime'),
    sortedRiffs: _ember['default'].computed.sort('video.riffs', 'sortDefinition'),
    sortDefinition: ['stamp'],

    newRiff: {
      text: null,
      flagged: false
    },

    actions: {
      createRiff: function createRiff() {
        if (this.get('newRiff.text') !== '' && this.get('newRiff.text') && this.get('videoTime')) {
          var data = this.get('newRiff');
          data.video = this.get('video');
          data.stamp = this.get('videoTime');
          this.sendAction('createRiff', this.get('newRiff'));
          this.set('newRiff', {
            text: null,
            flagged: false
          });
        }
      },
      clickRiff: function clickRiff() {
        this.sendAction('clickRiff', this.get('riff'));
      }
    }
  });
});
define("ga-wdi-boston.you-riff/components/chat-box/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "U4ScDeXI", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"chat-box\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"sortedRiffs\"]]],null,0],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"form\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"createRiff\"],[[\"on\"],[\"submit\"]]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"textarea\"],null,[[\"value\",\"placeholder\",\"class\"],[[\"get\",[\"newRiff\",\"text\"]],\"Type your riff here!\",\"create-riff-box\"]]],false],[\"text\",\"\\n  \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-submit create-riff-btn\"],[\"flush-element\"],[\"text\",\"Riff\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"one-riff\"],[\"flush-element\"],[\"append\",[\"helper\",[\"riff-component\"],null,[[\"riff\",\"currentTime\"],[[\"get\",[\"riff\"]],[\"get\",[\"currentTime\"]]]]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"riff\"]}],\"hasPartials\":false}", "meta": { "moduleName": "ga-wdi-boston.you-riff/components/chat-box/template.hbs" } });
});
define('ga-wdi-boston.you-riff/components/edit-riff-panel/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    auth: _ember['default'].inject.service(),
    user: _ember['default'].computed.alias('auth.credentials.email'),

    isUser: _ember['default'].computed('user', 'riff.user.email', function () {
      return this.get('riff.user.email') === this.get('user');
    }),

    actions: {
      save: function save() {
        this.sendAction('save', this.get('riff'));
      },
      cancel: function cancel() {
        this.sendAction('cancel', this.get('riff'));
      },
      deleteRiff: function deleteRiff() {
        this.sendAction('deleteRiff', this.get('riff'));
        // console.log(this.get('riff'))
      }
    }
  });
});
define("ga-wdi-boston.you-riff/components/edit-riff-panel/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "dP2HQO8p", "block": "{\"statements\":[[\"open-element\",\"form\",[]],[\"static-attr\",\"class\",\"edit-riff-panel\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"save\"],[[\"on\"],[\"submit\"]]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"h4\",[]],[\"static-attr\",\"class\",\"edit-email\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"riff\",\"user\",\"email\"]],false],[\"text\",\":\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"textarea\"],null,[[\"class\",\"placeholder\",\"value\"],[\"edit-riff-box\",\"Edit your riff here!\",[\"get\",[\"riff\",\"text\"]]]]],false],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"isUser\"]]],null,0],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"btn btn-submit edit-riff-btn\"],[\"flush-element\"],[\"text\",\"Submit\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn cancel-riff-btn\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"cancel\"]],[\"flush-element\"],[\"text\",\"Cancel\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn delete-riff-btn btn-danger\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"deleteRiff\"]],[\"flush-element\"],[\"text\",\"Delete\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "ga-wdi-boston.you-riff/components/edit-riff-panel/template.hbs" } });
});
define('ga-wdi-boston.you-riff/components/email-input/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    classNames: ['form-group']
  });
});
define("ga-wdi-boston.you-riff/components/email-input/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "jNdhPQfp", "block": "{\"statements\":[[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"email\"],[\"flush-element\"],[\"text\",\"Email\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"id\",\"placeholder\",\"value\"],[\"email\",\"email\",\"Email\",[\"get\",[\"email\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ga-wdi-boston.you-riff/components/email-input/template.hbs" } });
});
define('ga-wdi-boston.you-riff/components/ember-youtube/component', ['exports', 'ember'], function (exports, _ember) {
  var computed = _ember['default'].computed;
  var debug = _ember['default'].debug;
  var observer = _ember['default'].observer;
  var on = _ember['default'].on;
  var run = _ember['default'].run;
  var RSVP = _ember['default'].RSVP;
  var $ = _ember['default'].$;
  exports['default'] = _ember['default'].Component.extend({
    classNames: ['EmberYoutube'],
    ytid: null,
    width: 640,
    height: 360,

    // These options are used to load a video.
    startSeconds: undefined,
    endSeconds: undefined,
    suggestedQuality: undefined,

    lazyload: false,
    showControls: false,
    showDebug: false,
    showProgress: false,
    showExtras: computed.or('showControls', 'showProgress', 'showDebug'),

    player: null,
    playerState: 'loading',
    // YouTube's embedded player can take a number of optional parameters.
    // https://developers.google.com/youtube/player_parameters#Parameters
    // https://developers.google.com/youtube/youtube_player_demo
    playerVars: {},

    // from YT.PlayerState
    stateNames: {
      '-1': 'ready', // READY
      0: 'ended', // YT.Player.ENDED
      1: 'playing', // YT.PlayerState.PLAYING
      2: 'paused', // YT.PlayerState.PAUSED
      3: 'buffering', // YT.PlayerState.BUFFERING
      5: 'queued' // YT.PlayerState.CUED
    },

    // Expose the component to the outside world.
    _register: on('init', function () {
      var _this = this;

      var delegate = this.get('delegate');
      var delegateAs = this.get('delegate-as');
      run.schedule('afterRender', function () {
        if (!delegate) {
          return;
        }
        delegate.set(delegateAs || 'emberYouTube', _this);
      });
    }),

    didInsertElement: function didInsertElement() {
      var _this2 = this;

      this._super.apply(this, arguments);
      if (!this.get('lazyload') && this.get('ytid')) {
        // If "lazyload" is not enabled and we have an ID, we can start immediately.
        // Otherwise the `loadVideo` observer will take care of things.
        this.loadAndCreatePlayer().then(function () {
          _this2.loadVideo();
        });
      }
    },

    loadAndCreatePlayerIsRunning: false,
    loadAndCreatePlayer: function loadAndCreatePlayer() {
      var _this3 = this;

      var isRunning = this.get('loadAndCreatePlayerIsRunning');
      if (isRunning) {
        // some ember-concurrency would be nice here
        return;
      }
      this.set('loadAndCreatePlayerIsRunning', true);
      var promise = new RSVP.Promise(function (resolve, reject) {
        _this3.loadYouTubeApi().then(function () {
          _this3.createPlayer().then(function (player) {
            _this3.setProperties({
              player: player,
              playerState: 'ready'
            });
            _this3.set('loadAndCreatePlayerIsRunning', false);
            resolve();
          })['catch'](function (err) {
            if (_this3.get('showDebug')) {
              _ember['default'].debug(err);
            }
            reject(err);
          });
        });
      });
      // The `wait` helper waits for this run loop,
      // but not the above promise, which is what i want.
      if (_ember['default'].testing) {
        run.later(function () {}, 5000);
      }
      return promise;
    },

    // A promise that is resolved when window.onYouTubeIframeAPIReady is called.
    // The promise is resolved with a reference to window.YT object.
    loadYouTubeApi: function loadYouTubeApi() {
      return new RSVP.Promise(function (resolve) {
        var previous = undefined;
        previous = window.onYouTubeIframeAPIReady;

        // The API will call this function when page has finished downloading
        // the JavaScript for the player API.
        window.onYouTubeIframeAPIReady = function () {
          if (previous) {
            previous();
          }
          resolve(window.YT);
        };

        if (window.YT && window.YT.loaded) {
          // If already loaded, make sure not to load the script again.
          resolve(window.YT);
        } else {
          $.getScript('https://www.youtube.com/iframe_api');
        }
      });
    },

    // A promise that is immediately resolved with a YouTube player object.
    createPlayer: function createPlayer() {
      var _this4 = this;

      var playerVars = this.get('playerVars');
      var width = this.get('width');
      var height = this.get('height');
      // const iframe = this.element.querySelector('#EmberYoutube-player');
      var iframe = this.$('#EmberYoutube-player');
      var player = undefined;
      return new RSVP.Promise(function (resolve, reject) {
        if (!iframe) {
          reject('Couldn\'t find the iframe element to create a YouTube player');
        }
        player = new YT.Player(iframe.get(0), {
          width: width,
          height: height,
          playerVars: playerVars,
          events: {
            onReady: function onReady() {
              resolve(player);
            },
            onStateChange: _this4.onPlayerStateChange.bind(_this4),
            onError: _this4.onPlayerError.bind(_this4)
          }
        });
      });
    },

    // Gets called by the YouTube player.
    onPlayerStateChange: function onPlayerStateChange(event) {
      // Set a readable state name
      var state = this.get('stateNames.' + event.data.toString());
      this.set('playerState', state);
      if (this.get('showDebug')) {
        debug(state);
      }
      // send actions outside
      this.sendAction(state);
      // send actions inside
      this.send(state);
    },

    // Gets called by the YouTube player.
    onPlayerError: function onPlayerError(event) {
      var errorCode = event.data;
      this.set('playerState', 'error');
      // Send the event to the controller
      this.sendAction('error', errorCode);
      if (this.get('showDebug')) {
        debug('error' + errorCode);
      }
      // switch(errorCode) {
      // 	case 2:
      // 		debug('Invalid parameter');
      // 		break;
      // 	case 100:
      // 		debug('Not found/private');
      // 		this.send('playNext');
      // 		break;
      // 	case 101:
      // 	case 150:
      // 		debug('Embed not allowed');
      // 		this.send('playNext');
      // 		break;
      // 	default:
      // 		break;
      // }
    },

    // Returns a boolean that indicates playback status by looking at the player state.
    isPlaying: computed('playerState', {
      get: function get() {
        var player = this.get('player');
        if (!player) {
          return false;
        }
        return player.getPlayerState() === 1;
      }
    }),

    // Load (and plays) a video every time ytid changes.
    ytidDidChange: observer('ytid', function () {
      var _this5 = this;

      var player = this.get('player');
      var ytid = this.get('ytid');

      if (!ytid) {
        return;
      }

      if (!player) {
        this.loadAndCreatePlayer().then(function () {
          _this5.loadVideo();
        });
        return;
      }
      this.loadVideo();
    }),

    loadVideo: function loadVideo() {
      var player = this.get('player');
      var ytid = this.get('ytid');

      // Set parameters for the video to be played.
      var options = _ember['default'].getProperties(this, ['startSeconds', 'endSeconds', 'suggestedQuality']);
      options.videoId = ytid;
      // Either load or cue depending on `autoplay`.
      if (this.playerVars.autoplay) {
        player.loadVideoById(options);
      } else {
        player.cueVideoById(options);
      }
    },

    startTimer: function startTimer() {
      var _this6 = this;

      var player = this.get('player');
      var interval = 1000;
      // set initial times
      this.setProperties({
        currentTime: player.getCurrentTime(),
        duration: player.getDuration()
      });
      // stop any previously started timer we forgot to clear
      this.stopTimer();
      // every second update current time
      var timer = window.setInterval(function () {
        _this6.set('currentTime', player.getCurrentTime());
      }, interval);
      // save the timer so we can stop it later
      this.set('timer', timer);
    },

    stopTimer: function stopTimer() {
      window.clearInterval(this.get('timer'));
    },

    // A wrapper around the YouTube method to get current time.
    currentTime: computed({
      get: function get() {
        var player = this.get('player');
        var value = player ? player.getCurrentTime() : 0;
        return value;
      },
      set: function set(key, value) {
        this.sendAction('timeChanged', value);
        return value;
      }
    }),

    // A wrapper around the YouTube method to get the duration.
    duration: computed({
      get: function get() {
        var player = this.get('player');
        var value = player ? player.getDuration() : 0;
        return value;
      },
      set: function set(key, value) {
        return value;
      }
    }),

    // A wrapper around the YouTube method to get and set volume.
    volume: computed({
      get: function get() {
        var player = this.get('player');
        var value = player ? player.getVolume() : 0;
        return value;
      },
      set: function set(name, vol) {
        var player = this.get('player');
        // Clamp between 0 and 100
        if (vol > 100) {
          vol = 100;
        } else if (vol < 0) {
          vol = 0;
        }
        if (player) {
          player.setVolume(vol);
        }
        return vol;
      }
    }),

    // OK, this is stupid but couldn't access the "event" inside
    // an ember action so here's a manual click handler instead.
    progressBarClick: on('didInsertElement', function () {
      var self = this;
      this.$().on('click', 'progress', function (event) {
        // get the x position of the click inside our progress el
        var x = event.pageX - _ember['default'].$(this).position().left;
        // convert it to a value relative to the duration (max)
        var clickedValue = x * this.max / this.offsetWidth;
        // 250 = 0.25 seconds into player
        self.send('seekTo', clickedValue);
      });
    }),

    // clean up when element will be destroyed.
    willDestroyElement: function willDestroyElement() {
      // clear the timer
      this.stopTimer();
      // destroy video player
      var player = this.get('player');
      if (player) {
        player.destroy();
        this.set('player', null);
      }
    },

    actions: {
      changeVideo: function changeVideo(ytid) {
        this.send('changeVideo', ytid);
      },
      play: function play() {
        if (this.get('player')) {
          this.get('player').playVideo();
        }
      },
      pause: function pause() {
        if (this.get('player')) {
          this.get('player').pauseVideo();
        }
      },
      togglePlay: function togglePlay() {
        if (this.get('player') && this.get('isPlaying')) {
          this.send('pause');
        } else {
          this.send('play');
        }
      },
      mute: function mute() {
        if (this.get('player')) {
          this.get('player').mute();
          this.set('isMuted', true);
        }
      },
      unMute: function unMute() {
        if (this.get('player')) {
          this.get('player').unMute();
          this.set('isMuted', false);
        }
      },
      toggleVolume: function toggleVolume() {
        if (this.get('player').isMuted()) {
          this.send('unMute');
        } else {
          this.send('mute');
        }
      },
      seekTo: function seekTo(seconds) {
        if (this.get('player')) {
          this.get('player').seekTo(seconds);
        }
      },
      // YouTube events.
      ready: function ready() {},
      ended: function ended() {},
      playing: function playing() {
        this.startTimer();
      },
      paused: function paused() {
        this.stopTimer();
      },
      buffering: function buffering() {},
      queued: function queued() {}
    }
  });
});
define("ga-wdi-boston.you-riff/components/ember-youtube/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "W4RBNfTi", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"EmberYoutube-player\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"block\",[\"if\"],[[\"get\",[\"showExtras\"]]],null,8],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"has-block\",\"default\"]],null,0]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[{\"statements\":[[\"text\",\"\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"EmberYoutube-yield\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"yield\",\"default\"],[\"text\",\"\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\\t\\t\"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"EmberYoutube-debug\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\tytid: \"],[\"append\",[\"unknown\",[\"ytid\"]],false],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\tplayerState: \"],[\"append\",[\"unknown\",[\"playerState\"]],false],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\tisMuted: \"],[\"append\",[\"unknown\",[\"isMuted\"]],false],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\tisPlaying: \"],[\"append\",[\"unknown\",[\"isPlaying\"]],false],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\tcurrentTime: \"],[\"append\",[\"unknown\",[\"currentTime\"]],false],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\tduration: \"],[\"append\",[\"unknown\",[\"duration\"]],false],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\tvolume: \"],[\"append\",[\"unknown\",[\"volume\"]],false],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\\t\\t\"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"EmberYoutube-progress\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"open-element\",\"progress\",[]],[\"dynamic-attr\",\"value\",[\"unknown\",[\"currentTime\"]],null],[\"dynamic-attr\",\"max\",[\"unknown\",[\"duration\"]],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Mute\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Unmute\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Play\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Pause\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\\t\\t\"],[\"open-element\",\"menu\",[]],[\"static-attr\",\"class\",\"EmberYoutube-controls\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"open-element\",\"button\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"togglePlay\"]],[\"flush-element\"],[\"block\",[\"if\"],[[\"get\",[\"isPlaying\"]]],null,6,5],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"open-element\",\"button\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"toggleVolume\"]],[\"flush-element\"],[\"block\",[\"if\"],[[\"get\",[\"isMuted\"]]],null,4,3],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"EmberYoutube-extras\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"showControls\"]]],null,7],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"showProgress\"]]],null,2],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"showDebug\"]]],null,1],[\"text\",\"\\t\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "ga-wdi-boston.you-riff/components/ember-youtube/template.hbs" } });
});
define('ga-wdi-boston.you-riff/components/flash-message', ['exports', 'ember-cli-flash/components/flash-message'], function (exports, _emberCliFlashComponentsFlashMessage) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFlashComponentsFlashMessage['default'];
    }
  });
});
define('ga-wdi-boston.you-riff/components/hamburger-menu/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'button',
    classNames: ['navbar-toggle', 'collapsed'],
    attributeBindings: ['toggle:data-toggle', 'target:data-target', 'expanded:aria-expanded'],
    toggle: 'collapse',
    target: '#navigation',
    expanded: false
  });
});
define("ga-wdi-boston.you-riff/components/hamburger-menu/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "TZZQLdWh", "block": "{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"sr-only\"],[\"flush-element\"],[\"text\",\"Toggle navigation\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ga-wdi-boston.you-riff/components/hamburger-menu/template.hbs" } });
});
define('ga-wdi-boston.you-riff/components/my-application/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    auth: _ember['default'].inject.service(),

    user: _ember['default'].computed.alias('auth.credentials.email'),
    isAuthenticated: _ember['default'].computed.alias('auth.isAuthenticated'),

    actions: {
      changeVideo: function changeVideo(ytid, error) {
        // console.log('in my-application, ytid is ', ytid)
        this.sendAction('changeVideo', ytid, error);
      },
      signOut: function signOut() {
        this.sendAction('signOut');
      }
    }
  });
});
define("ga-wdi-boston.you-riff/components/my-application/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "8Y9IMnZJ", "block": "{\"statements\":[[\"open-element\",\"nav\",[]],[\"static-attr\",\"class\",\"navbar navbar-default\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container-fluid\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"append\",[\"unknown\",[\"navbar-header\"]],false],[\"text\",\"\\n\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"collapse navbar-collapse\"],[\"static-attr\",\"id\",\"navigation\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"nav navbar-nav\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"users\"],null,7],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"videos\"],null,6],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-4 col-md-6 col-lg-7\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"append\",[\"helper\",[\"youtube-finder\"],null,[[\"changeVideo\"],[\"changeVideo\"]]],false],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"nav navbar-nav navbar-right\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"isAuthenticated\"]]],null,5,3],[\"text\",\"      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"block\",[\"each\"],[[\"get\",[\"flashMessages\",\"queue\"]]],null,0],[\"text\",\"\\n\"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"append\",[\"helper\",[\"flash-message\"],null,[[\"flash\"],[[\"get\",[\"flash\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[\"flash\"]},{\"statements\":[[\"text\",\"Sign In\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Sign Up\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"sign-up\"],null,2],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"sign-in\"],null,1],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Change Password\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"change-password\"],null,4],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"signOut\"]],[\"flush-element\"],[\"text\",\"Sign Out\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Videos\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Users\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "ga-wdi-boston.you-riff/components/my-application/template.hbs" } });
});
define('ga-wdi-boston.you-riff/components/navbar-header/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    classNames: ['navbar-header']
  });
});
define("ga-wdi-boston.you-riff/components/navbar-header/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "r95Ui34z", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"hamburger-menu\"]],false],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"application\"],[[\"class\"],[\"navbar-brand\"]],0],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"You-Riff\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "ga-wdi-boston.you-riff/components/navbar-header/template.hbs" } });
});
define('ga-wdi-boston.you-riff/components/password-confirmation-input/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    classNames: ['form-group']
  });
});
define("ga-wdi-boston.you-riff/components/password-confirmation-input/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "rsBXxJvR", "block": "{\"statements\":[[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"password-confirmation\"],[\"flush-element\"],[\"text\",\"Password Confirmation\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"id\",\"placeholder\",\"value\"],[\"password\",\"password-confirmation\",\"Password Confirmation\",[\"get\",[\"password\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ga-wdi-boston.you-riff/components/password-confirmation-input/template.hbs" } });
});
define('ga-wdi-boston.you-riff/components/password-input/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    classNames: ['form-group']
  });
});
define("ga-wdi-boston.you-riff/components/password-input/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "gimDmF74", "block": "{\"statements\":[[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"kind\"],[\"flush-element\"],[\"text\",\"Password\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"id\",\"placeholder\",\"value\"],[\"password\",\"password\",\"Password\",[\"get\",[\"password\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ga-wdi-boston.you-riff/components/password-input/template.hbs" } });
});
define('ga-wdi-boston.you-riff/components/riff-component/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    auth: _ember['default'].inject.service(),
    user: _ember['default'].computed.alias('auth.credentials.email'),

    isUser: _ember['default'].computed('user', 'riff.user.email', function () {
      return this.get('riff.user.email') === this.get('user');
    }),

    currentTime: 0,
    stampTime: _ember['default'].computed('stamp', function () {
      var d = Number(this.get('riff.stamp'));
      var h = Math.floor(d / 3600);
      var m = Math.floor(d % 3600 / 60);
      var s = Math.floor(d % 3600 % 60);

      var hDisplay = h > 0 ? h + (h === 1 ? ":" : ":") : "";
      var mDisplay = m > 0 ? m + (m === 1 ? ":" : ":") : "";
      var sDisplay = s > 0 ? s + (s === 1 ? ":" : "") : "";
      return hDisplay + mDisplay + sDisplay;
    }),

    isDisplayed: _ember['default'].computed('currentTime', 'stamp', function () {
      return this.get('riff').get('stamp') < this.get('currentTime');
    })
  });
});
define("ga-wdi-boston.you-riff/components/riff-component/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "J9SyJW4h", "block": "{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"isDisplayed\"]]],null,3]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"append\",[\"unknown\",[\"riff\",\"user\",\"email\"]],false],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"user-riff\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"riff\",\"user\",\"email\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\":\\n\\n\"],[\"block\",[\"if\"],[[\"get\",[\"isUser\"]]],null,1,0],[\"text\",\"  \"],[\"append\",[\"unknown\",[\"riff\",\"text\"]],false],[\"text\",\"\\n  \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"riff-stamp\"],[\"flush-element\"],[\"text\",\"-- @\"],[\"append\",[\"unknown\",[\"stampTime\"]],false],[\"close-element\"]],\"locals\":[]},{\"statements\":[[\"text\",\"  \"],[\"block\",[\"link-to\"],[\"riff\",[\"get\",[\"riff\"]]],null,2],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "ga-wdi-boston.you-riff/components/riff-component/template.hbs" } });
});
define('ga-wdi-boston.you-riff/components/sign-in-form/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'form',
    classNames: ['form-horizontal'],

    actions: {
      submit: function submit() {
        this.sendAction('submit', this.get('credentials'));
      },

      reset: function reset() {
        this.set('credentials', {});
      }
    }
  });
});
define("ga-wdi-boston.you-riff/components/sign-in-form/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "DVw+XfHn", "block": "{\"statements\":[[\"append\",[\"helper\",[\"email-input\"],null,[[\"email\"],[[\"get\",[\"credentials\",\"email\"]]]]],false],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"password-input\"],null,[[\"password\"],[[\"get\",[\"credentials\",\"password\"]]]]],false],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"btn btn-primary\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"submit\"]],[\"flush-element\"],[\"text\",\"\\n  Sign In\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-default\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"reset\"]],[\"flush-element\"],[\"text\",\"\\n  Cancel\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ga-wdi-boston.you-riff/components/sign-in-form/template.hbs" } });
});
define('ga-wdi-boston.you-riff/components/sign-up-form/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'form',
    classNames: ['form-horizontal'],

    credentials: {},

    actions: {
      submit: function submit() {
        this.sendAction('submit', this.get('credentials'));
      },

      reset: function reset() {
        this.set('credentials', {});
      }
    }
  });
});
define("ga-wdi-boston.you-riff/components/sign-up-form/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "XF56E8B1", "block": "{\"statements\":[[\"append\",[\"helper\",[\"email-input\"],null,[[\"email\"],[[\"get\",[\"credentials\",\"email\"]]]]],false],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"password-input\"],null,[[\"password\"],[[\"get\",[\"credentials\",\"password\"]]]]],false],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"password-confirmation-input\"],null,[[\"password\"],[[\"get\",[\"credentials\",\"passwordConfirmation\"]]]]],false],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"btn btn-primary\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"submit\"]],[\"flush-element\"],[\"text\",\"\\n  Sign Up\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-default\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"reset\"]],[\"flush-element\"],[\"text\",\"\\n  Cancel\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ga-wdi-boston.you-riff/components/sign-up-form/template.hbs" } });
});
define('ga-wdi-boston.you-riff/components/video-deck/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    currentTime: null,

    actions: {
      timeChanged: function timeChanged(currentTime) {
        this.set('currentTime', currentTime);
      },
      createRiff: function createRiff(newRiff) {
        this.sendAction('createRiff', newRiff);
      },
      clickRiff: function clickRiff(riff) {
        console.log('in video-deck, riff is ', riff);
      }
    }
  });
});
define("ga-wdi-boston.you-riff/components/video-deck/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "Rh4ahTY8", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-md-8 col-lg-7\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"append\",[\"helper\",[\"ember-youtube\"],null,[[\"ytid\",\"timeChanged\"],[[\"get\",[\"video\",\"ytid\"]],\"timeChanged\"]]],false],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-md-4 col-lg-5\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"\\n            \"],[\"append\",[\"helper\",[\"chat-box\"],null,[[\"video\",\"currentTime\",\"createRiff\",\"clickRiff\"],[[\"get\",[\"video\"]],[\"get\",[\"currentTime\"]],\"createRiff\",\"clickRiff\"]]],false],[\"text\",\"\\n          \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ga-wdi-boston.you-riff/components/video-deck/template.hbs" } });
});
define('ga-wdi-boston.you-riff/components/youtube-finder/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    auth: _ember['default'].inject.service(),

    isAuthenticated: _ember['default'].computed.alias('auth.isAuthenticated'),

    actions: {
      changeVideo: function changeVideo() {
        var url = this.get('url');
        if (url.includes('=')) {
          var ytid = url.split('=')[1];
          this.sendAction('changeVideo', ytid);
        } else {
          this.sendAction('changeVideo', null, "Sorry, that doesn't look like a valid YouTube url. Please try something with an = in it");
        }
      }
    }
  });
});
define("ga-wdi-boston.you-riff/components/youtube-finder/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "6m9RKKjm", "block": "{\"statements\":[[\"text\",\"\\n\"],[\"open-element\",\"form\",[]],[\"static-attr\",\"class\",\"navbar-form search-form\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"changeVideo\"],[[\"on\"],[\"submit\"]]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"input-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"input\"],null,[[\"size\",\"type\",\"value\",\"class\",\"placeholder\"],[\"80\",\"text\",[\"get\",[\"url\"]],\"form-control search-box\",\"Add a video to our system (you must be signed in to do this)\"]]],false],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"input-group-btn\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-default\"],[\"static-attr\",\"type\",\"submit\"],[\"flush-element\"],[\"text\",\"Go!\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ga-wdi-boston.you-riff/components/youtube-finder/template.hbs" } });
});
define('ga-wdi-boston.you-riff/controllers/array', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('ga-wdi-boston.you-riff/controllers/object', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('ga-wdi-boston.you-riff/flash/object', ['exports', 'ember-cli-flash/flash/object'], function (exports, _emberCliFlashFlashObject) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFlashFlashObject['default'];
    }
  });
});
define('ga-wdi-boston.you-riff/helpers/app-version', ['exports', 'ember', 'ga-wdi-boston.you-riff/config/environment'], function (exports, _ember, _gaWdiBostonYouRiffConfigEnvironment) {
  exports.appVersion = appVersion;
  var version = _gaWdiBostonYouRiffConfigEnvironment['default'].APP.version;

  function appVersion() {
    return version;
  }

  exports['default'] = _ember['default'].Helper.helper(appVersion);
});
define('ga-wdi-boston.you-riff/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('ga-wdi-boston.you-riff/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('ga-wdi-boston.you-riff/index/route', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      return this.get('store').findAll('video');
    },
    actions: {
      createRiff: function createRiff(newRiff) {
        var riffSave = this.get('store').createRecord('riff', newRiff);
        console.log(riffSave);
        riffSave.save();
      }
    }
  });
});
define("ga-wdi-boston.you-riff/index/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "cLcA3EIY", "block": "{\"statements\":[[\"append\",[\"helper\",[\"video-deck\"],null,[[\"video\",\"changeVideo\",\"createRiff\"],[[\"get\",[\"model\",\"firstObject\"]],\"changeVideo\",\"createRiff\"]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ga-wdi-boston.you-riff/index/template.hbs" } });
});
define("ga-wdi-boston.you-riff/initializers/active-model-adapter", ["exports", "active-model-adapter", "active-model-adapter/active-model-serializer"], function (exports, _activeModelAdapter, _activeModelAdapterActiveModelSerializer) {
  exports["default"] = {
    name: 'active-model-adapter',
    initialize: function initialize() {
      var application = arguments[1] || arguments[0];
      application.register('adapter:-active-model', _activeModelAdapter["default"]);
      application.register('serializer:-active-model', _activeModelAdapterActiveModelSerializer["default"]);
    }
  };
});
define('ga-wdi-boston.you-riff/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'ga-wdi-boston.you-riff/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _gaWdiBostonYouRiffConfigEnvironment) {
  var _config$APP = _gaWdiBostonYouRiffConfigEnvironment['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(name, version)
  };
});
define('ga-wdi-boston.you-riff/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('ga-wdi-boston.you-riff/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('ga-wdi-boston.you-riff/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.Controller.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('ga-wdi-boston.you-riff/initializers/export-application-global', ['exports', 'ember', 'ga-wdi-boston.you-riff/config/environment'], function (exports, _ember, _gaWdiBostonYouRiffConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_gaWdiBostonYouRiffConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _gaWdiBostonYouRiffConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_gaWdiBostonYouRiffConfigEnvironment['default'].modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('ga-wdi-boston.you-riff/initializers/flash-messages', ['exports', 'ember', 'ga-wdi-boston.you-riff/config/environment'], function (exports, _ember, _gaWdiBostonYouRiffConfigEnvironment) {
  exports.initialize = initialize;
  var deprecate = _ember['default'].deprecate;

  var merge = _ember['default'].assign || _ember['default'].merge;
  var INJECTION_FACTORIES_DEPRECATION_MESSAGE = '[ember-cli-flash] Future versions of ember-cli-flash will no longer inject the service automatically. Instead, you should explicitly inject it into your Route, Controller or Component with `Ember.inject.service`.';
  var addonDefaults = {
    timeout: 3000,
    extendedTimeout: 0,
    priority: 100,
    sticky: false,
    showProgress: false,
    type: 'info',
    types: ['success', 'info', 'warning', 'danger', 'alert', 'secondary'],
    injectionFactories: ['route', 'controller', 'view', 'component'],
    preventDuplicates: false
  };

  function initialize() {
    var application = arguments[1] || arguments[0];

    var _ref = _gaWdiBostonYouRiffConfigEnvironment['default'] || {};

    var flashMessageDefaults = _ref.flashMessageDefaults;

    var _ref2 = flashMessageDefaults || [];

    var injectionFactories = _ref2.injectionFactories;

    var options = merge(addonDefaults, flashMessageDefaults);
    var shouldShowDeprecation = !(injectionFactories && injectionFactories.length);

    application.register('config:flash-messages', options, { instantiate: false });
    application.inject('service:flash-messages', 'flashMessageDefaults', 'config:flash-messages');

    deprecate(INJECTION_FACTORIES_DEPRECATION_MESSAGE, shouldShowDeprecation, {
      id: 'ember-cli-flash.deprecate-injection-factories',
      until: '2.0.0'
    });

    options.injectionFactories.forEach(function (factory) {
      application.inject(factory, 'flashMessages', 'service:flash-messages');
    });
  }

  exports['default'] = {
    name: 'flash-messages',
    initialize: initialize
  };
});
define('ga-wdi-boston.you-riff/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('ga-wdi-boston.you-riff/initializers/local-storage-adapter', ['exports', 'ember-local-storage/initializers/local-storage-adapter'], function (exports, _emberLocalStorageInitializersLocalStorageAdapter) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberLocalStorageInitializersLocalStorageAdapter['default'];
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function get() {
      return _emberLocalStorageInitializersLocalStorageAdapter.initialize;
    }
  });
});
define('ga-wdi-boston.you-riff/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('ga-wdi-boston.you-riff/initializers/text-field', ['exports', 'ember'], function (exports, _ember) {
  exports.initialize = initialize;

  function initialize() {
    _ember['default'].TextField.reopen({
      classNames: ['form-control']
    });
  }

  exports['default'] = {
    name: 'text-field',
    initialize: initialize
  };
});
define('ga-wdi-boston.you-riff/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("ga-wdi-boston.you-riff/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('ga-wdi-boston.you-riff/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('ga-wdi-boston.you-riff/riff/model', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    text: _emberData['default'].attr('string'),
    flagged: _emberData['default'].attr('boolean'),
    stamp: _emberData['default'].attr('number'),
    video: _emberData['default'].belongsTo('video'),
    user: _emberData['default'].belongsTo('user')
  });
});
define('ga-wdi-boston.you-riff/riff/route', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model(params) {
      return this.get('store').findRecord('riff', params.riff_id);
    },
    actions: {
      save: function save(riff) {
        riff.save();
      },

      cancel: function cancel(riff) {
        riff.rollbackAttributes();
        this.transitionTo('video', riff.get('video'));
      },

      deleteRiff: function deleteRiff(riff) {
        var _this = this;

        var video = riff.get('video');
        riff.destroyRecord().then(function () {
          _this.transitionTo('video', video);
        });
      }
    }
  });
});
define("ga-wdi-boston.you-riff/riff/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "S20R+JSm", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-md-8 col-lg-7\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"append\",[\"helper\",[\"ember-youtube\"],null,[[\"startSeconds\",\"ytid\",\"timeChanged\"],[[\"get\",[\"model\",\"stamp\"]],[\"get\",[\"model\",\"video\",\"ytid\"]],\"timeChanged\"]]],false],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-md-4 col-lg-5\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"\\n          \"],[\"append\",[\"helper\",[\"edit-riff-panel\"],null,[[\"riff\",\"save\",\"cancel\",\"deleteRiff\"],[[\"get\",[\"model\"]],\"save\",\"cancel\",\"deleteRiff\"]]],false],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ga-wdi-boston.you-riff/riff/template.hbs" } });
});
define('ga-wdi-boston.you-riff/router', ['exports', 'ember', 'ga-wdi-boston.you-riff/config/environment'], function (exports, _ember, _gaWdiBostonYouRiffConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _gaWdiBostonYouRiffConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.route('sign-up');
    this.route('sign-in');
    this.route('change-password');
    this.route('users');
    this.route('videos');
    this.route('video', { path: 'videos/:video_id' });
    this.route('riff', { path: 'riffs/:riff_id' });
    this.route('about');
  });

  exports['default'] = Router;
});
define('ga-wdi-boston.you-riff/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define('ga-wdi-boston.you-riff/services/flash-messages', ['exports', 'ember-cli-flash/services/flash-messages'], function (exports, _emberCliFlashServicesFlashMessages) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFlashServicesFlashMessages['default'];
    }
  });
});
define('ga-wdi-boston.you-riff/sign-in/route', ['exports', 'ember', 'rsvp'], function (exports, _ember, _rsvp) {
  exports['default'] = _ember['default'].Route.extend({
    auth: _ember['default'].inject.service(),
    flashMessages: _ember['default'].inject.service(),

    model: function model() {
      return _rsvp['default'].Promise.resolve({});
    },

    actions: {
      signIn: function signIn(credentials) {
        var _this = this;

        return this.get('auth').signIn(credentials).then(function () {
          return _this.transitionTo('application');
        }).then(function () {
          return _this.get('flashMessages').success('Thanks for signing in!');
        })['catch'](function () {
          _this.get('flashMessages').danger('There was a problem. Please try again.');
        });
      }
    }
  });
});
define("ga-wdi-boston.you-riff/sign-in/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "jhzqH39H", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"sign-in-wrap\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"Sign In\"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"append\",[\"helper\",[\"sign-in-form\"],null,[[\"submit\",\"reset\",\"credentials\"],[\"signIn\",\"reset\",[\"get\",[\"model\"]]]]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ga-wdi-boston.you-riff/sign-in/template.hbs" } });
});
define('ga-wdi-boston.you-riff/sign-up/route', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    auth: _ember['default'].inject.service(),
    flashMessages: _ember['default'].inject.service(),

    actions: {
      signUp: function signUp(credentials) {
        var _this = this;

        this.get('auth').signUp(credentials).then(function () {
          return _this.get('auth').signIn(credentials);
        }).then(function () {
          return _this.transitionTo('application');
        }).then(function () {
          _this.get('flashMessages').success('Successfully signed-up! You have also been signed-in.');
        })['catch'](function () {
          _this.get('flashMessages').danger('There was a problem. Please try again.');
        });
      }
    }
  });
});
define("ga-wdi-boston.you-riff/sign-up/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "3mS6A/CG", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"sign-up-wrap\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"Sign Up\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"sign-up-form\"],null,[[\"submit\"],[\"signUp\"]]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ga-wdi-boston.you-riff/sign-up/template.hbs" } });
});
define('ga-wdi-boston.you-riff/user/model', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    email: _emberData['default'].attr('string'),
    riffs: _emberData['default'].hasMany('riff')
  });
});
// videos: DS.hasMany('video')
define('ga-wdi-boston.you-riff/users/route', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      return this.get('store').findAll('user');
    }
  });
});
define("ga-wdi-boston.you-riff/users/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "Kr8g14WZ", "block": "{\"statements\":[[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Users\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\"]]],null,0],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"user\",\"email\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"user\"]}],\"hasPartials\":false}", "meta": { "moduleName": "ga-wdi-boston.you-riff/users/template.hbs" } });
});
define('ga-wdi-boston.you-riff/video/model', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    ytid: _emberData['default'].attr('string'),
    riffs: _emberData['default'].hasMany('riff')
  });
});
// users: DS.hasMany('user')
define('ga-wdi-boston.you-riff/video/route', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model(params) {
      return this.get('store').findRecord('video', params.video_id);
    },
    actions: {
      changeVideo: function changeVideo(ytid) {
        var _this = this;

        var that = this;
        return new _ember['default'].RSVP.Promise(function (resolve) {
          that.store.findAll('video').then(function (videos) {
            resolve(videos.filterBy('ytid', ytid));
          });
        }).then(function (videos) {
          if (videos.length > 0) {
            var video = videos[0];
            _this.transitionTo('video', video.get('id'));
          } else {
            var newVid = _this.store.createRecord('video', {
              ytid: ytid
            });
            newVid.save().then(function (newVid) {
              _this.transitionTo('video', newVid.get('id'));
            });
          }
        });
      },
      createRiff: function createRiff(newRiff) {
        var riffSave = this.get('store').createRecord('riff', newRiff);
        console.log(riffSave);
        riffSave.save();
      }
    }
  });
});
define("ga-wdi-boston.you-riff/video/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "IQMxHgsh", "block": "{\"statements\":[[\"append\",[\"helper\",[\"video-deck\"],null,[[\"video\",\"changeVideo\",\"createRiff\"],[[\"get\",[\"model\"]],\"changeVideo\",\"createRiff\"]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ga-wdi-boston.you-riff/video/template.hbs" } });
});
define('ga-wdi-boston.you-riff/videos/route', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      return this.get('store').findAll('video');
    },
    actions: {
      openVideo: function openVideo(video) {
        this.transitionTo('video', video);
        // console.log('inside openVideo, video is: ', video);
        // console.log('video.users is ', video.users)
      }
    }
  });
});
define("ga-wdi-boston.you-riff/videos/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "hbQtg3sv", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\"]]],null,0],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\\n\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-md-8 col-lg-7\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"append\",[\"helper\",[\"ember-youtube\"],null,[[\"ytid\"],[[\"get\",[\"video\",\"ytid\"]]]]],false],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-md-4 col-lg-5\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"This has \"],[\"append\",[\"unknown\",[\"video\",\"riffs\",\"length\"]],false],[\"text\",\" riffs! Want to join in?\"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"button\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"openVideo\",[\"get\",[\"video\"]]]],[\"flush-element\"],[\"text\",\"Riff on this!\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"video\"]}],\"hasPartials\":false}", "meta": { "moduleName": "ga-wdi-boston.you-riff/videos/template.hbs" } });
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('ga-wdi-boston.you-riff/config/environment', ['ember'], function(Ember) {
  var prefix = 'ga-wdi-boston.you-riff';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("ga-wdi-boston.you-riff/app")["default"].create({"name":"ga-wdi-boston.you-riff","version":"0.0.0+1bc1f0b3"});
}

/* jshint ignore:end */
//# sourceMappingURL=ga-wdi-boston.you-riff.map
