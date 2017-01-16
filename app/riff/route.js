import Ember from 'ember';

export default Ember.Route.extend({
  model (params) {
    return this.get('store').findRecord('riff', params.riff_id);
  },
  actions: {
    save() {
      this.get('model').save();
    }
  }
});
