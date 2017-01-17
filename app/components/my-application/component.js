import Ember from 'ember';

export default Ember.Component.extend({
  auth: Ember.inject.service(),

  user: Ember.computed.alias('auth.credentials.email'),
  isAuthenticated: Ember.computed.alias('auth.isAuthenticated'),

  actions: {
    changeVideo(ytid, error) {
      // console.log('in my-application, ytid is ', ytid)
      this.sendAction('changeVideo', ytid, error);
    },
    signOut () {
      this.sendAction('signOut');
    },
  }
});
