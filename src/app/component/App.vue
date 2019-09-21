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
                            <form  @submit.prevent="sendTask">
                            <div class="form-group">
                                <input type="text" placeholder="Inserta una Tarea" 
                                class="form-control" v-model="task.title" >
                            </div>
                            <div class="form-group">
                                <textarea cols="30" rows="10" 
                                class="form-control"
                                placeholder="Inserte la Descripcion" v-model="task.description"></textarea>
                            </div>
                              <template v-if="check === false" >
                                <button class="btn btn-primary btn-block ">Send</button>    
                            </template>
                            <template v-else>
                                <button class="btn btn-primary btn-block ">
                                    Update</button>    
                            </template>
                            
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
                                <button @click="editTask(task._id)" class="btn btn-secondary">
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
import axios from 'axios';
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
            tasks:[],
            check:false,
            taskToId:""
        }
    },
    created(){
        this.getTasks()
    },
    methods:{
        sendTask(){    
            
            if(!this.check){
            axios.post('http://localhost:4000/api/tasks'
          ,this.task)                  
            .then(data=>{
                console.log(data.data);                
                this.getTasks()})
            }
            else{ 
                axios.put('http://localhost:4000/api/tasks/'+this.taskToId,this.task)                                  
                .then(data=>{
                    console.log(data.data);                
                    this.getTasks()
                    this.check= false;
                })
            }            
            this.task = new Task();            
        },
        getTasks(){ 
                axios.get("http://localhost:4000/api/tasks")
                .then(data=>{this.tasks = data.data})                
        },
        deleteTask(id){
            axios.delete(`http://localhost:4000/api/tasks/${id}`)                        
            .then(data=>{this.getTasks()
            console.log(data.data);
            })
        },
        editTask(id){            
            axios('http://localhost:4000/api/tasks/'+id)            
            .then(data=>{this.task = new Task(data.data.title,data.data.description);
                this.taskToId= data.data._id;
                this.check = true;
            })                       
        }
    }
}
</script>