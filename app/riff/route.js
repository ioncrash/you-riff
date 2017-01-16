import Ember from 'ember';

export default Ember.Route.extend({
  model (params) {
    return this.get('store').findRecord('riff', params.riff_id);
  },
  actions: {
    save(riff) {
      riff.save();
    },

    cancel(list) {
      list.rollbackAttributes();
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
