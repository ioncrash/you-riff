import Ember from 'ember';

export default Ember.Component.extend({
  auth: Ember.inject.service(),
  user: Ember.computed.alias('auth.credentials.email'),

  isUser: Ember.computed('user', 'riff', function() {
    return this.get('riff').get('user') === this.get('user');
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
    }
  }
});
