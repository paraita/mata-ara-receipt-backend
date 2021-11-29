const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const purchaseSchema = new Schema({
  receiptB64: String,
  originalReceipt: { // The one used to register the purchase
    environment: String,
    'is-retryable': Boolean,
    latest_receipt: String,
    latest_receipt_info: [],
    pending_renewal_info: [],
    receipt: {
      adam_id: Number,
      app_item_id: Number,
      application_version: String,
      bundle_id: String,
      download_id: Number,
      expiration_date: String,
      expiration_date_ms: String,
      expiration_date_pst: String,
      in_app: {
        cancellation_date: String,
        cancellation_date_ms: String,
        cancellation_date_pst: String,
        cancellation_reason: String,
        expires_date: String,
        expires_date_ms: String,
        expires_date_pst: String,
        is_in_intro_offer_period: String,
        is_trial_period: String,
        original_purchase_date: String,
        original_purchase_date_ms: String,
        original_purchase_date_pst: String,
        original_transaction_id: String,
        product_id: String,
        promotional_offer_id: String,
        purchase_date: String,
        purchase_date_ms: String,
        purchase_date_pst: String,
        quantity: String,
        transaction_id: String,
        web_order_line_item_id: String
      },
      original_application_version: String,
      original_purchase_date: String,
      original_purchase_date_ms: String,
      original_purchase_date_pst: String,
      preorder_date: String,
      preorder_date_ms: String,
      preorder_date_pst: String,
      receipt_creation_date: String,
      receipt_creation_date_ms: String,
      receipt_creation_date_pst: String,
      receipt_type: String,
      request_date: String,
      request_date_ms: String,
      request_date_pst: String,
      version_external_identifier: Number
    },
    status: Number
  },
  transactionId: String,
  status: String // "ACTIVE" or "REFUND"
});

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;
