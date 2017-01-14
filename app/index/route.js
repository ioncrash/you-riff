import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    return this.get('store').findAll('video');
  },
  actions: {
    changeVideo(ytid) {
      console.log(ytid);
      this.store.queryRecord( 'video', { ytid: ytid } )
        .then((video_id) => {
          this.transitionTo('video', video_id);
        });
      // if(result){

      // } else {
      // console.log('in else');
      // }
    }
  }
});
