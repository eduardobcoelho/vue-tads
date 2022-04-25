import { GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { GoogleProvider, GithubProvider } from '@/plugins/firebase';

export default {
  user: null,
  authProviders: {
    google: GoogleAuthProvider,
    github: GithubAuthProvider,
  },
  authProvidersInstance: {
    google: GoogleProvider,
    github: GithubProvider,
  },
};
