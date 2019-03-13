const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

/**instead of using the callback for the async reoquest we use the async and await 
 * and the await will help us the wait for the response and do the rest as
 * soon as the data has that we used in await has been come backed.
 */

//Get Posts
router.get('/' ,async (req,res)=>{
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
})

//Add Posts

router.post('/' , async (req,res)=>{
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text : req.body.text,
        createAt : new Date()
    })
    //this is like the 200 but show that somethings has been added too.
    res.status(201).send();
})

//Delete Posts

router.delete('/:id' ,async (req, res)=>{
    console.log('this is the id for deleting ' , req.params.id);
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id : new mongodb.ObjectID(req.params.id)});


})

async function loadPostsCollection(){
    const client = await mongodb.MongoClient.connect('mongodb://mohammad:mohammad123@ds163825.mlab.com:63825/fullstackvue', {useNewUrlParser : true});

    return client.db('fullstackvue').collection('posts');
}



module.exports = router;



