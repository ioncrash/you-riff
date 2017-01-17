import Ember from 'ember';

export default Ember.Component.extend({
  currentTime: null,

  actions: {
    changeVideo(ytid) {
      this.sendAction('changeVideo', ytid);
    },
    timeChanged(currentTime) {
      this.set('currentTime', currentTime);
    },
    createRiff(newRiff) {
      this.sendAction('createRiff', newRiff);
    }
  },
});
