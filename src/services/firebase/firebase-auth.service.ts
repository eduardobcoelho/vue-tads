import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { FirebaseAppService } from './firebase-app.service';

export class FirebaseAuthService extends FirebaseAppService {
  public GoogleProvider: GoogleAuthProvider;
  public GithubProvider: GithubAuthProvider;

  constructor() {
    super();
    this.GoogleProvider = new GoogleAuthProvider();
    this.GithubProvider = new GithubAuthProvider();
  }
}

export default new FirebaseAuthService();
