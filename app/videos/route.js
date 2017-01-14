import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    return this.get('store').findAll('video');
  },
  actions: {
    openVideo(video) {
      this.transitionTo('video', video)
      // console.log('inside openVideo, video is: ', video);
    }
  }
});
