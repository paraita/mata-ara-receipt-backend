const server = require('../src/db/index');
const Purchase = require('../src/db/model');

const setup = () => {
  before(async () => {
    try {
      await server.connectInMemory();
    } catch (err) {
      console.log(err);
    }
  });

  beforeEach(async () => {
    try {
      await server.clearDatabase();
    } catch (err) {
      console.log(err);
    }
  });

  after(async() => {
    try {
      await server.close();
    } catch (err) {
      console.log(err);
    }
  });
};

const postPurchase = async (receipt, transactionId = 'TEST_TRANSACTION_ID') => {
  const purchase = await new Purchase({
    receiptB64: receipt,
    originalReceipt: {
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
    },
    transactionId: transactionId,
    status: 'ACTIVE'
  });
  return await purchase.save();
};

module.exports = {
  setup,
  postPurchase
};
