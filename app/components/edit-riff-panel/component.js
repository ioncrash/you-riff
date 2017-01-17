import Ember from 'ember';

export default Ember.Component.extend({
  auth: Ember.inject.service(),
  user: Ember.computed.alias('auth.credentials.email'),

  isUser: Ember.computed('user', 'riff.user.email', function() {
    return this.get('riff.user.email') === this.get('user');
  }),

  actions: {
    save() {
      this.sendAction('save', this.get('riff'));
    },
    cancel() {
      this.sendAction('cancel', this.get('riff'));
    },
    deleteRiff() {
      this.sendAction('deleteRiff', this.get('riff'));
      // console.log(this.get('riff'))
    },
    flagRiff() {
      console.log(this.get('riff.user.email'))
      console.log(this.get('user'))
    }
  }
});
