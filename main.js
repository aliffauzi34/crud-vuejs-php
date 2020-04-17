var app = new Vue({
    el: '#app',
    data: {
        errorMsg: "",
        successMsg: "",
        showAddModal:false,
        showEditModal:false,
        showDeleteModal:false,
        users: [],
        newUser:{name:"", email:"", phone:""},
        currentUser: {}
    },
    mounted: function(){
        this.getAllUser();
    },
    methods:{
        getAllUser(){
            axios.get("http://localhost/crud-vue-php/process.php?action=read").then(function(response){
                if(response.data.error){
                    app.errorMsg = response.data.message;
                }
                else{
                    app.users = response.data.users;
                }
            });
        },
        addUser(){
            var FormData   = app.toFormData(app.newUser);
            axios.post("http://localhost/crud-vue-php/process.php?action=create", FormData).then(function(response){
                app.newUser = {name:"", email:"", phone:""};
                if(response.data.error){
                    app.errorMsg = response.data.message;
                }
                else{
                    app.successMsg = response.data.message;
                    app.getAllUser();
                }
            });

        },
        updateUser(){
            var FormData   = app.toFormData(app.currentUser);
            axios.post("http://localhost/crud-vue-php/process.php?action=update", FormData).then(function(response){
                app.currentUser = {};
                if(response.data.error){
                    app.errorMsg = response.data.message;
                }
                else{
                    app.successMsg = response.data.message;
                    app.getAllUser();
                }
            });

        },
        deleteUser(){
            var FormData   = app.toFormData(app.currentUser);
            axios.post("http://localhost/crud-vue-php/process.php?action=delete", FormData).then(function(response){
                app.currentUser = {};
                if(response.data.error){
                    app.errorMsg = response.data.message;
                }
                else{
                    app.successMsg = response.data.message;
                    app.getAllUser();
                }
            });

        },
        toFormData(obj){
            var fd = new FormData();
            for(var i in obj){
                fd.append(i,obj[i]);
            }
            return fd;
        },
        selectUser(user){
            app.currentUser = user;
        },
        clearMsg(){
            app.errorMsg = "";
            app.successMsg = "";
        }

    }
  });