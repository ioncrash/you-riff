import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    return this.get('store').findAll('video');
  },
  actions: {
    createRiff(newRiff) {
      let riffSave = this.get('store').createRecord('riff', newRiff);
      console.log(riffSave);
      riffSave.save();
    },
  }
});
