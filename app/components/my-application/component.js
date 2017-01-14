import Ember from 'ember';

export default Ember.Component.extend({
  auth: Ember.inject.service(),

  user: Ember.computed.alias('auth.credentials.email'),
  isAuthenticated: Ember.computed.alias('auth.isAuthenticated'),

  ytid: "fmWTdJAG7EI",
  actions: {
    signOut () {
      this.sendAction('signOut');
    },
    changeVideo(ytid) {
      this.set('ytid', ytid)
    },
  },
});
