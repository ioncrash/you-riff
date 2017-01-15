import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    return this.get('store').findAll('video');
  },
  actions: {
    changeVideo(ytid) {
      let that = this;
      return new Ember.RSVP.Promise(function(resolve) {
        that.store.findAll('video')
          .then(function(videos) {
          resolve(videos.filterBy('ytid', ytid));
          });
      })
      .then((videos) => {
        let video_id = videos[0].get('id');
        this.transitionTo('video', video_id);
      });
    }
  }
});
