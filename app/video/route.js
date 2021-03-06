import Ember from 'ember';

export default Ember.Route.extend({
  model (params) {
    return this.get('store').findRecord('video', params.video_id);
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
    },
    createRiff(newRiff) {
      let riffSave = this.get('store').createRecord('riff', newRiff);
      console.log(riffSave)
      riffSave.save();
    }
  }
});
