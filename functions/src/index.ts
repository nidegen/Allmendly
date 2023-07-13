import * as functions from 'firebase-functions';
// import {onRequest} from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";
import { application } from "./Application";

exports.app = functions.region('europe-west6').https.onRequest(application());
