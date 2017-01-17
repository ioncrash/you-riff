import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['chat-box'],

  newRiff: {
    text: null,
    flagged: false,
    stamp: Ember.computed('currentTime', function() {
      return this.get('currentTime');
    }),
  },

  actions: {
    createRiff() {
      let data = this.get('newRiff');
      data.video = this.get('video');
      console.log('newRiff = ', this.get('newRiff'));
    }
  }
});
