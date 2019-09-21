const router =  require('express').Router(); 
const Task = require('../models/Task');

router.get('/',async(req,res)=>{
    const tasks = await Task.find();
    
    res.set({"Access-Control-Allow-Origin" : "*", 
"Access-Control-Allow-Credentials" : true } ).json(tasks);
})

router.get('/:id',async(req,res)=>{ 
    const check = await Task.findById(req.params.id);
    if(!check) return res.sendStatus(404);
    else{    
    //res.sendStatus(200)
    res.json(check)      
}
})


router.post('/',async(req,res)=>{    
    const task = new Task(req.body);
    await task.save();
    console.log(task);
    //res.sendStatus(201).json({status:200})
    res.json({status:201})        
})

router.put('/:id',async(req,res)=>{    
    const check = await Task.findById(req.params.id);
    if(!check) return res.sendStatus(404);
    else{
    await Task.findByIdAndUpdate(req.params.id,req.body).catch(e=>{
        res.sendStatus(404)    
    })
    //res.sendStatus(200)
    res.json({status:200})      
}
     
})

router.delete('/:id',async(req,res)=>{ 
    const check = await Task.findById(req.params.id);
    if(!check) return res.sendStatus(404);
    else{
    await Task.findByIdAndRemove(req.params.id).catch(e=>{
        res.sendStatus(404) ;   
    })
    //res.sendStatus(200)
    res.json({status:200})      
}
})


module.exports = router;