import Ember from 'ember';

export default Ember.Component.extend({
  ytid: "fmWTdJAG7EI",
  actions: {
    changeVideo(ytid) {
      this.set('ytid', ytid)
    },
  },
});
