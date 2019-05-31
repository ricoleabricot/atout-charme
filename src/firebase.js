import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

const app = firebase.initializeApp({ projectId: 'atout-charme' });

export const db = app.firestore();
export const storage = app.storage();
