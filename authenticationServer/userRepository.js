module.exports = {
    users : [
          { id: '1', name: 'User1', password: '1', email: 'user@fake', facebookUserId:"",lastUpdatedDate:Date(1235764800000)}

    ],
      findById : function(id, fn) {
      var idx = id - 1;
      if (this.users[idx]) {
        var user = this.users[idx];
        fn(null, {id:user.id,name:user.name,email:user.email});
      } else {
        fn(new Error('User ' + id + ' does not exist'));
      }
    },

    findByUsername : function (username, fn) {
      for (var i = 0, len = this.users.length; i < len; i++) {
        var user = this.users[i];
        if (user.email === username) {
          return fn(null, user);
        }
      }
      return fn(null, null);
    }

};