import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    changeVideo(ytid) {
      this.sendAction('changeVideo', ytid);
    },
    timeChanged(currentTime) {
      console.log('in video deck, current time is ', currentTime)
    }
  },
});
