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
                <div class="col-md-7">
                    <table class="table table-bordered" >
                        <thead>
                            <tr>
                                <th>Task</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="task of tasks" v-bind:key="task._id" >
                            <td>{{task.title}}</td>    
                            <td>{{task.description}}</td>
                            <td>
                                <button @click="deleteTask(task._id)" class="btn btn-danger">
                                    Delete
                                </button>
                            </td>
                            <td>
                                <button @click="editTask(task)" class="btn btn-secondary">
                                    Edit
                                </button>
                            </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
class Task{
    constructor(title="", description=""){
        this.title = title,
        this.description=description
    }
}

export default {
    data(){
        return{
            task:new Task(),
            tasks:[]
        }
    },
    created(){
        this.getTasks()
    },
    methods:{
        addTask(){        
            fetch('http://localhost:4000/api/tasks',{
                method:'POST',
                body:JSON.stringify(this.task),
                headers:{
                    'Accept':'application/json',
                    'Content-type':'application/json'
                }
            })      
            .then(res=>res.json())   
            .then(data=>{
                console.log(data);
                
                this.getTasks()})
            this.task = new Task();
            
        },
        getTasks(){              
            fetch('http://localhost:4000/api/tasks')      
            .then(res=>res.json())
            .then(data=>this.tasks = data)
        },
        deleteTask(id){
            fetch(`http://localhost:4000/api/tasks/${id}`,{
                method:'DELETE',
                headers:{
                    'Accept':'application/json',
                    'Content-type':'application/json'
                }
            })
            .then(res=>res.json())
            .then(data=>{this.getTasks()
            console.log(data);
            })
        },
        editTask(data){
            this.task = new Task(data.title,data.description);
        }
    }
}
</script>