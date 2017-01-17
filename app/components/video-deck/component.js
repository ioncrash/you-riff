import Ember from 'ember';

export default Ember.Component.extend({
  currentTime: null,

  actions: {
    timeChanged(currentTime) {
      this.set('currentTime', currentTime);
    },
    createRiff(newRiff) {
      this.sendAction('createRiff', newRiff);
    },
    clickRiff(riff) {
      console.log('in video-deck, riff is ', riff)
    }
  },
});
