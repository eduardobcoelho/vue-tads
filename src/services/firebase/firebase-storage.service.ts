import { getStorage, FirebaseStorage } from 'firebase/storage';
import { FirebaseAppService } from './firebase-app.service';

export class FirebaseStorageService extends FirebaseAppService {
  public storage: FirebaseStorage;

  constructor() {
    super();
    this.storage = getStorage(this.app);
  }
}

export default new FirebaseStorageService();
