import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    changeVideo(ytid) {
      this.set('ytid', ytid)
    },
    timeChanged(currentTime) {
      console.log('in video deck, current time is ', currentTime)
    }
  },
});
