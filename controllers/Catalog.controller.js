const Catalog = require('../models/catalog.model.js')



module.exports.createCatalog = (req, res, next)=>{
    console.log(req.body)
    
    const catalog= new Catalog ({
        ...req.body
    });
    catalog.save()
    .then((catalog)=> res.status(201).json({ 
        message: 'catalog created !',
        catalog:catalog
    }))
    .catch(error => {
        console.log(error);
        res.status(400).json({error});
    })
}
module.exports.getAllCatalog = (req, res, next)=>{
    console.log(req.body);
    Catalog.find()
    .then(Catalog =>res.status(200).json({catalog:Catalog}))
    .catch(error =>{res.status(400).json({error})
        console.log(error);
    });

}
module.exports.getOneCatalog =(req, res , next)=>{
    
    console.log(req.headers.id);
    Catalog.findOne({_id: req.headers.id})
    .then(Catalog =>res.status(200).json({catalog:Catalog}))
    .catch(error => res.status(400).json({error}));
}
module.exports.updateCatalog = (req, res, next)=>{
    console.log(req.body);
    Catalog.findOneAndUpdate({_id: req.params.id},
        {...req.body})
        .then(Catalog =>res.status(200).json({
            message: 'Catalogue  modifié !',
            catalog:Catalog
        }))
        .catch(error => {res.status(400).json({error})
            console.log(error);
    })
}
module.exports.deleteCatalog=(req, res, next)=>{
    console.log(req.body)
    Catalog.findOneAndDelete({ _id: req.params.id})
    .then(Catalog => res.status(200).json({
        message: 'Catalogue suprimé !',
            catalog:Catalog
    }))
    .catch(error =>{res.status(400).json({error})
        console.log(error);
})
}