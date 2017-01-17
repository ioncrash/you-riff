import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['chat-box'],
  videoTime: Ember.computed.alias('currentTime'),
  sortedRiffs: Ember.computed.sort('video.riffs', 'sortDefinition'),
  sortDefinition: ['stamp'],

  newRiff: {
    text: null,
    flagged: false,
  },

  actions: {
    createRiff() {
      let data = this.get('newRiff');
      data.video = this.get('video');
      data.stamp = this.get('videoTime');
      this.sendAction('createRiff', this.get('newRiff'));
      this.set('newRiff', {
        text: null,
        flagged: false
      });
    }
  }
});
