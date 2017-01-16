import Ember from 'ember';

export default Ember.Component.extend({
  currentTime: null,

  actions: {
    changeVideo(ytid) {
      this.sendAction('changeVideo', ytid);
    },
    timeChanged(currentTime) {
      this.set('currentTime', currentTime);
      console.log(this.get('currentTime'));
    },
    createRiff() {
      this.sendAction('createRiff', this.get('riffText'));
    }
  },
});
