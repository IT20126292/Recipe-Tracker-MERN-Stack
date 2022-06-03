const router = require("express").Router();
let recipe = require("../Models/recipe");

//CREATE FUNCTION 1
router.route("/add").post((req,res)=>{
     const recipeID = req.body.recipeID;
     const recipeName = req.body.recipeName;
     const recipeIngredients = req.body.recipeIngredients;
     const recipeDescription = req.body.recipeDescription;

     const newRecipe = new recipe({
        recipeID,
        recipeName,
        recipeIngredients,
        recipeDescription
     })

     newRecipe.save().then(()=>{
         res.json("New Recipe Added to the database");
     }).catch((err)=>{
         console.log(err);
     })

})

//RETRIEV FUNCTION 1
router.route("/").get((req,res)=>{
    recipe.find().then((recipe)=>{
        res.json(recipe)
    }).catch((err)=>{
        console.log(err)
    })
})

//RETRIEV FUNCTION 2
router.get('/posts',(req,res)=>{
    admin.find().exec((err,admin)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingAdmins:admin
        });
    });
});


//SUB ADMIN UPDATE FUNCTION 1
router.route("/update/:id").put(async(req,res)=>{
    let recipeId = req.params.id;
    const {recipeID,recipeName,recipeIngredients,recipeDescription} = req.body;
    const updateRecipe = {
        recipeID,
        recipeName,
        recipeIngredients,
        recipeDescription
    }
    await recipe.findByIdAndUpdate(recipeId, updateRecipe).then(()=>{
        res.status(200).send({status:"Recipe Updated"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error Generated in the Recipe updated part", error: err.message});
    })

})


//UPDATE FUNCTION 2
router.put('/post/update/:id',(req,res)=>{
    admin.findByIdAndUpdate(
        req.params.id,{
            $set:req.body
        },
        (err,update)=>{
            if(err){
                return res.status(400).json({
                    error:err
                });
            }
            return res.status(200).json({
                success:"Updated Successfully",update
            });
        }
    );
});


//DELETE FUNCTION 1
router.route("/delete/:id").delete(async(req,res)=>{
    let recipeId = req.params.id;
    await recipe.findByIdAndDelete(recipeId).then(()=>{
        res.status(200).send({status:"Recipe deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with delete recipe", error: err.message});
    })
})

//SUB ADMIN DELETE FUNCTION 2
router.delete('/post/delete/:id',(req,res)=>{
    admin.findByIdAndDelete(req.params.id).exec((err,deleteAdmin)=>{
        if(err){
            return res.status(400).json({
                message:"Delete Unsuccessful",err
            });
        }
        return res.json({
            message:"Delete Successfull", deleteAdmin
        });
    });
});

//SUB ADMIN DELETE FUNCTION 3
router.delete('/logbook/delete/:id',(req,res)=>{
    logbook.findByIdAndDelete(req.params.id).exec((err,deletelogs)=>{
        if(err){
            return res.status(400).json({
                message:"Delete Unsuccessful",err
            });
        }
        return res.json({
            message:"Delete Successfull", deletelogs
        });
    });
});


module.exports = router;

