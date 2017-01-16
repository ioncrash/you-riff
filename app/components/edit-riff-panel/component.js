import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    save() {
      this.sendAction('save', this.get('riff'));
    },
    cancel() {
      this.sendAction('cancel', this.get('riff'));
    }
  }
});
