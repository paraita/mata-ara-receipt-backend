# mata-ara-receipt-backend

## Setup

Make sure to declare the following environment variables in your .env file:

* DEV_DB (e.g: `mongodb://MARB_root:MARB_example@localhost:27017/mataara`)
* MONGO_USERNAME (e.g: `MARB_root`)
* MONGO_PASSWORD (e.g: `MARB_example`)
* MONGO_DATABASE (e.g: `mataara`)

⚠️ attention you gotta use a real mongodb server, one is provided in the docker-compose.yml file:

```shell
docker-compose up -d
```


Install everything with:

````bash
npm install
````


Just start the dev server with:

```bash
npm run dev
```

## Docs

* https://developer.apple.com/documentation/storekit/original_api_for_in-app_purchase/validating_receipts_with_the_app_store
* https://developer.apple.com/documentation/storekit/original_api_for_in-app_purchase/handling_refund_notifications

