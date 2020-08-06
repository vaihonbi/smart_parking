"use strict";

const Helpers = use("Helpers");
const Env = use("Env");

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Default disk
  |--------------------------------------------------------------------------
  |
  | The default disk is used when you interact with the file system without
  | defining a disk name
  |
  */
  default: "local",

  disks: {
    /*
    |--------------------------------------------------------------------------
    | Local
    |--------------------------------------------------------------------------
    |
    | Local disk interacts with the a local folder inside your application
    |
    */
    local: {
      root: Helpers.tmpPath(),
      driver: "local",
    },

    /*
    |--------------------------------------------------------------------------
    | S3
    |--------------------------------------------------------------------------
    |
    | S3 disk interacts with a bucket on aws s3
    |
    */
    s3: {
      driver: "s3",
      key: Env.get("S3_KEY"),
      secret: Env.get("S3_SECRET"),
      bucket: Env.get("S3_BUCKET"),
      region: Env.get("S3_REGION"),
    },

    /*
    |--------------------------------------------------------------------------
    | Google Cloud Service
    |--------------------------------------------------------------------------
    |
    | ...
    |
    */
    gcs: {
      driver: "gcs",
      keyFilename: Env.get("GCS_KEY_FILE_NAME"),
      bucket: Env.get("GCS_BUCKET"),
    },
  },
};