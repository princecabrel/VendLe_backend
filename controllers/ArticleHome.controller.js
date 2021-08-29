const Product = require('../models/product');
const categorySchema = require ('../models/category.model');
const UserModel = require('../models/User.model');
const { ObjectID } = require('mongodb');
const { response } = require('..');

module.exports.articleHome = (req,res,next)=>{
    Product.find()
    .then(products => {
        const category = products.category   
        result = products.reduce(function (r, a) {
            r[a.category] = r[a.category] || [];
            r[a.category].push(a);
            return r;
        },
         Object.create(null));
    console.log(result);
    res.status(200).json(result)
    })
    .catch(error=> res.status(404).json(error))   
}
http://localhost:5000/jpeg;base64,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

module.exports.topArticles = (req,res,next) => {
    Product.aggregate([
      {
        $project: {
          name: {
            $max: "$name"
          },
          description: {
            $max: "$description"
          },
          contact: {
            $max: "$contact"
          },
          photosUrls: [
            {
              $max: "$photosUrls"
            }
          ],
          category: {
            $max: "$category"
          },
          city: {
            $max: "$city"
          },
          country: {
            $max: "$country"
          },
          quarter: {
            $max: "$quarter"
          },
          price: {
            $max: "$price"
          },
          view: {
            $max: "$view"
          },
          dateCreated: {
            $max: "dateCreated"
          },
          dateUpdated: {
            $max: "$dateUpdated"
          },
          like: {
            $max: "$like"
          },
          signal: {
            $max: "$signal"
          },
          promotionStatus: {
            $max: "$promotionStatus"
          },
          status: {
            $max: "$status"
          },
          history: {
            $max: "$history"
          },
          
        }
      },
      {
        $limit: 10
      },
      {
        $sort: {
          "view": -1
        }
      },
      {
        $limit: 10
      }])
        .then( topproduct => res.status(200).json(topproduct))
        .catch(error=> res.status(404).json(error))
}




module.exports.productPeerUser= (req,res,next) =>{
  let id =req.params.id
  Product.find({ authorID:id} )
  .then( test => res.status(200).json({test:test}))
  .catch(error=> res.status(404).json(error))
}

module.exports.productCategoryPeerUser= (req,res,next) =>{
  let id =req.params.id
  Product.find({ authorID:id} )
  .then(products => {
    const category = products.category   
    result = products.reduce(function (r, a) {
        r[a.category] = r[a.category] || [];
        r[a.category].push(a);
        return r;
    },
     Object.create(null));
console.log(result);
res.status(200).json(result)
})
  .catch(error=> res.status(404).json(error))
 
}