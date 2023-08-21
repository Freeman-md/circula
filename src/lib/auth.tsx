import * as firebaseUI from 'firebaseui';
import { getAuth, GoogleAuthProvider, GithubAuthProvider, Auth, UserCredential, signInWithCredential } from 'firebase/auth';
import { app as firebaseApp } from '../db/firebase';

export const auth = getAuth(firebaseApp)
export const ui = new firebaseUI.auth.AuthUI(auth);

export const uiConfig: firebaseUI.auth.Config = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult: UserCredential, redirectUrl: string) {
            // User successfully signed in.
            console.log(authResult)
            return false;
        },
        uiShown: function () {
            // The widget is rendered.
            // Hide the loader.
            const loader = document.getElementById('loader')

            if (loader) loader.style.display = 'none'
        },
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: '/',
    signInOptions: [
        GoogleAuthProvider.PROVIDER_ID,
        GithubAuthProvider.PROVIDER_ID,
    ],
    tosUrl: '/',
    privacyPolicyUrl: '/'
};