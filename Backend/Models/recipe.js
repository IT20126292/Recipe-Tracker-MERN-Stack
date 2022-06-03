const mongoose = require("mongoose");

const schema = mongoose.Schema;
const recipeSchema = new schema({
    recipeID : {
        type : String,
        required : true
    },
    recipeName : {
        type : String,
        required : true
    },
    recipeIngredients : {
        type : String,
        required : true
    },
    recipeDescription : {
        type : String,
        required : true
    }
})

const recipe = mongoose.model("Recipe",recipeSchema);

module.exports = recipe;