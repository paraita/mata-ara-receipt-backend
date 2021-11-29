const mongoose = require('mongoose');
const Purchase = require('../model');

// POSTing a new purchase will verify the receipt with Apple,
// save the purchase (along with the decrypted receipt that Apple returns)
// and return the mongo id of the purchase to the user
// DOC: https://developer.apple.com/forums/thread/65555
// DOC: https://developer.apple.com/forums/thread/83989
// DOC: https://developer.apple.com/forums/thread/46737

function generateUUID() { // Public Domain/MIT
  let d = new Date().getTime();//Timestamp
  let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = Math.random() * 16;//random number between 0 and 16
    if(d > 0){//Use timestamp until depleted
      r = (d + r)%16 | 0;
      d = Math.floor(d/16);
    } else {//Use microseconds since page-load if supported
      r = (d2 + r)%16 | 0;
      d2 = Math.floor(d2/16);
    }
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

function verifyReceipt(receipt) {
  console.log("MOCK: verifying against Apple server...")
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  return delay(2000).then(() => {
    let transactionId = generateUUID();
    return {
      environment: "Sandbox",
      'is-retryable': true,
      latest_receipt: receipt,
      latest_receipt_info: [],
      pending_renewal_info: [],
      receipt: {
        adam_id: 666,
        app_item_id: 666,
        application_version: "1.0",
        bundle_id: "io.paraita.mata_ara",
        download_id: 123,
        expiration_date: "expiration_date",
        expiration_date_ms: "expiration_date_ms",
        expiration_date_pst: "expiration_date_pst",
        in_app: {
          cancellation_date: "cancellation_date",
          cancellation_date_ms: "cancellation_date_ms",
          cancellation_date_pst: "cancellation_date_pst",
          cancellation_reason: "0", // 1 is for actual refund
          expires_date: "expires_date",
          expires_date_ms: "expires_date_ms",
          expires_date_pst: "expires_date_pst",
          is_in_intro_offer_period: "false",
          is_trial_period: "false",
          original_purchase_date: "original_purchase_date",
          original_purchase_date_ms: "original_purchase_date_ms",
          original_purchase_date_pst: "original_purchase_date_pst",
          original_transaction_id: transactionId,
          product_id: "io.paraita.mata_ara.full_features",
          promotional_offer_id: "promotional_offer_id",
          purchase_date: "purchase_date",
          purchase_date_ms: "purchase_date_ms",
          purchase_date_pst: "purchase_date_pst",
          quantity: "1",
          transaction_id: transactionId,
          web_order_line_item_id: "web_order_line_item_id"
        },
        original_application_version: "1.0",
        original_purchase_date: "original_purchase_date",
        original_purchase_date_ms: "original_purchase_date_ms",
        original_purchase_date_pst: "original_purchase_date_pst",
        preorder_date: "preorder_date",
        preorder_date_ms: "preorder_date_ms",
        preorder_date_pst: "preorder_date_pst",
        receipt_creation_date: "receipt_creation_date",
        receipt_creation_date_ms: "receipt_creation_date_ms",
        receipt_creation_date_pst: "receipt_creation_date_pst",
        receipt_type: "ProductionSandbox",
        request_date: "request_date",
        request_date_ms: "request_date_ms",
        request_date_pst: "request_date_pst",
        version_external_identifier: 0
      },
      status: 0
    }
  });
}


getAllPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find();
    res.status(200).json(purchases)
  } catch (err) {
    if (err) return console.log(err);
  }
};

getPurchase = async (req, res) => {
  try {
    let purchaseId = mongoose.Types.ObjectId(req.params.id);
    Purchase.exists({ _id: purchaseId }).then(exists => {
      if (exists) {
        Purchase.findById(purchaseId, "status",null,
            function (err, result) {
              if (err) {
                res.status(500).send({ error: 'oops something broke' });
                return console.log(err);
              }
              else{
                res.status(200).json(result);
              }
            });
      }
      else {
        res.status(404).send({ error: req.params.id + " not found" });
      }
    });
  }
  catch (e) {
    res.status(422).send({ error: req.params.id + " is not a valid id" });
    return null;
  }
};

createPurchase = async(req, res) => {
  try {

    console.log("Register new purchase");

    let receipt = req.body.receipt;
    if (!receipt || receipt === "") {
      res.status(422).json({ msg: "invalid id `" + receipt + "` provided"});
      return console.log("invalid id `" + receipt + "` provided");
    }

    Purchase.exists({receiptB64: receipt}).then(exists => {
      if (exists) {
        Purchase.findOne({ receiptB64: receipt}, "id", function (err, result) {
          if (err) {
            console.log(err);
            res.status(500).json({ msg: err});
          }
          else {
            console.log(("Purchase already registered ! (id " + result._id + ")"))
            res.status(200).json({ id: result._id });
          }
        });
      }
      else {
        verifyReceipt().then((clearReceipt) => {
          let purchase = new Purchase({
            receiptB64: receipt,
            originalReceipt: clearReceipt,
            transactionId: clearReceipt.receipt.in_app.transaction_id,
            status: 'ACTIVE'
          });
          purchase.save();
          console.log("Registered new purchase with id " + purchase._id);
          res.status(201).json({'id': purchase._id})
        })
      }
    });

  } catch (err) {
    if (err) return console.log(err);
  }
};

module.exports = {
  getAllPurchases,
  getPurchase,
  createPurchase
};
