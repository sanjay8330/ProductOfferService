const router = require('express').Router();

/**
 * Imported Product Offer Model - ProductOffer.js - MODEL
 */
const ProductOfferModel = require('../Model/ProductOffer_Model');

/**
 * API DESC      - Create a new Product Offer
 * API           - http://localhost:3001/productOffer/addProductOffer
 */
router.route('/addProductOffer').post(async (req, res) => {
    if (req.body) {

        const ProductOffer = new ProductOfferModel(req.body);
        await ProductOffer.save()
            .then(data => {
                res.status(200).send({ data: data });
            }).catch(error => {
                res.status(500).send({ error: error });
            })
    }
});

/**
 * API DESC      - Get all created Product Offer
 * API           - http://localhost:3001/productOffer/getAllProductOffers
 */
router.route('/getAllProductOffers').get(async (req, res) => {
    await ProductOfferModel.find({})
        .then(data => {
            res.status(200).send({ data: data });
        }).catch(error => {
            res.status(500).send({ error: error });
        })
});

/**
 * API DESC      - Get Product Offer by product offer ID
 * API           - http://localhost:3001/productOffer/getProductOfferById/<OFFERID>
 */
router.route('/getProductOfferById/:id').get(async (req, res) => {
    if (req.params && req.params.id) {
        await ProductOfferModel.findById(req.params.id)
            .then(data => {
                res.status(200).send({ data: data });
            }).catch(error => {
                res.status(500).send({ error: error });
            })
    }
});

/**
 * API DESC      - Update Product Offer details by product offer ID
 * API           - http://localhost:3001/productOffer/updateProductOffer/<OFFERID>
 */
router.route("/updateProductOffer/:id").put(async (req, res) => {
    //Updating the offer details - VALUES FROM FRONTEND
    const offerPrice = req.body.offerPrice;
    const offerDiscount = req.body.offerDiscount;
    const offerDescription = req.body.offerDescription;
    const offerEndDate = req.body.offerEndDate;
    const offerStatus = req.body.offerStatus;

    //Product Offer ID - ROUTE PARAMETER
    const Id = req.params.id;

    try {
        await ProductOfferModel.findById(Id, (err, updatedProductOfferObject) => {
            updatedProductOfferObject.offerPrice = offerPrice;
            updatedProductOfferObject.offerDiscount = offerDiscount;
            updatedProductOfferObject.offerDescription = offerDescription;
            updatedProductOfferObject.offerEndDate = offerEndDate;
            updatedProductOfferObject.offerStatus = offerStatus;

            updatedProductOfferObject.save()
                .then(data => {
                    res.status(200).send({ data: data });
                }).catch(error => {
                    res.status(500).send({ error: error });
                })
        });
    } catch (err) {
        console.log(err);
    }
});

/**
 * API DESC      - Delete the Product Offer status by using product offer ID
 * API           - http://localhost:3001/productOffer/deleteProductOffer/<OFFERID>
 */
router.route('/deleteProductOffer/:id').delete(async (req, res) => {
    if (req.params && req.params.id) {
        await ProductOfferModel.findByIdAndDelete(req.params.id)
            .then(data => {
                res.status(200).send({ data: data });
            }).catch(error => {
                res.status(500).send({ error: error });
            })
    }
});

module.exports = router;