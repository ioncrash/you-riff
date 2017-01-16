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
        if (videos.length > 0) {
          let video = videos[0];
          this.transitionTo('video', video.get('id'));
        }
        else {
          let newVid = this.store.createRecord('video', {
            ytid: ytid
          });
          newVid.save()
            .then((newVid) => {
              this.transitionTo('video', newVid.get('id'));
            });
        }
      });
    }
  }
});
