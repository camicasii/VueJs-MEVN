<template>
    <div>
        <nav class="navbar navbar-light bg-light " >
            <a href="/" class="navbar-brand">MEVN Stack</a>
        </nav>  
        <div class="container">
            <div class="row pt-5">
                <div class="col-md-5">
                    <div class="card">                      
                        <div class="card-body">
                            <form  @submit.prevent="addTask">
                            <div class="form-group">
                                <input type="text" placeholder="Inserta una Tarea" 
                                class="form-control" v-model="task.title" >
                            </div>
                            <div class="form-group">
                                <textarea cols="30" rows="10" 
                                class="form-control"
                                placeholder="Inserte la Descripcion" v-model="task.description"></textarea>
                            </div>
                            <button class="btn btn-primary btn-block ">Send</button>
                            </form>
                        </div>
                    </div>
                    
                </div>

            </div>
        </div>

    </div>
</template>

<script>
class Task{
    constructor(title, description){
        this.title = "",
        this.description=""
    }
}

export default {
    data(){
        return{
            task:{
                title:"",
                description:""
            }
        }
    },
    methods:{
        addTask(){
            console.log(this.task);
            this.task='';
            this.task.description='';
        }
    }
}
</script>