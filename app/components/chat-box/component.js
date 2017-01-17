import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['chat-box'],
  videoTime: Ember.computed.alias('currentTime'),

  newRiff: {
    text: null,
    flagged: false,
  },

  actions: {
    createRiff() {
      console.log('this is ', this);
      let data = this.get('newRiff');
      data.video = this.get('video');
      data.stamp = this.get('videoTime');
      console.log('newRiff = ', this.get('newRiff'));
      this.sendAction('createRiff', this.get('newRiff'));
    }
  }
});
