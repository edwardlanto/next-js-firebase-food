function categoryFactory() {
  this.createCategory = function (name) {
    let category;
    this.getImage = function (name) {
      console.log('ran');
    };
  };
}

module.exports = categoryFactory;
