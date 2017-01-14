import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    changeVideo(ytid) {
      this.sendAction('changeVideo', ytid);
    },
  },
});
