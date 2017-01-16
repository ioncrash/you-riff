import Ember from 'ember';

export default Ember.Route.extend({
  model (params) {
    return this.get('store').findRecord('riff', params.riff_id);
  },
  actions: {
    save(riff) {
      riff.save();
    },

    cancel(riff) {
      riff.rollbackAttributes();
      this.transitionTo('video', riff.get('video'));
    },

    deleteRiff(riff) {
      let video = riff.get('video');
      riff.destroyRecord()
        .then(()=>{
          this.transitionTo('video', video);
        })
    }
  }
});
