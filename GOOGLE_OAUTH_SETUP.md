# Google OAuth Authentication Setup Guide

## 🎯 Overview

This guide explains how to configure Google OAuth authentication for DEV_ELEVATE platform. The implementation allows users to sign in/sign up using their Google accounts through Firebase Authentication.

---

## ✅ What's Already Implemented

The following features have been added to the codebase:

- ✅ Google OAuth sign-in functionality in `AuthContext.tsx`
- ✅ "Sign in with Google" button in Sign In page
- ✅ "Sign up with Google" button in Sign Up page
- ✅ Automatic user profile creation for new Google OAuth users
- ✅ Loading states and error handling
- ✅ User data storage in Firestore

---

## 🔧 Firebase Console Configuration

To enable Google OAuth, you need to configure it in the Firebase Console:

### Step 1: Access Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **develevate-93ebd**

### Step 2: Enable Google Sign-In Method

1. In the left sidebar, click on **Authentication**
2. Click on the **Sign-in method** tab
3. Find **Google** in the list of providers
4. Click on **Google** to configure it
5. Toggle the **Enable** switch to ON
6. Set the **Project support email** (usually your email)
7. Click **Save**

### Step 3: Configure OAuth Consent Screen (Optional but Recommended)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select the same project linked to your Firebase app
3. Navigate to **APIs & Services** > **OAuth consent screen**
4. Configure the consent screen:
   - **App name**: DEV_ELEVATE
   - **User support email**: Your email
   - **App logo**: Upload your logo (optional)
   - **Authorized domains**: Add your production domain
   - **Developer contact**: Your email
5. Add scopes (minimal required):
   - `userinfo.email`
   - `userinfo.profile`
6. Save and continue

### Step 4: Configure Authorized Domains

1. In Firebase Console > Authentication > Settings
2. Under **Authorized domains**, ensure these are added:
   - `localhost` (for development)
   - Your production domain (e.g., `develevate.tech`)

---

## 🧪 Testing the Implementation

### Local Testing

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Navigate to Sign In/Sign Up pages**:
   - Go to `http://localhost:5173`
   - Click on "Sign In" or "Sign Up"

3. **Test Google OAuth**:
   - Click on the Google icon button
   - You should see a Google sign-in popup
   - Select your Google account
   - Grant permissions
   - You should be redirected to the home page or profile page

### What Happens During Sign In/Sign Up

1. **User clicks Google button** → Popup opens with Google sign-in
2. **User selects account** → Firebase handles authentication
3. **First-time users**:
   - Profile is automatically created in Firestore (`users` collection)
   - User progress document is created (`userProgress` collection)
   - Display name is set from Google account
4. **Returning users**:
   - Existing profile is loaded
   - Session is restored
5. **Success** → User is redirected to home page or profile

---

## 🔐 Security Best Practices

### Firebase Security Rules

Ensure your Firestore security rules are properly configured:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /userProgress/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### OAuth Credentials

- ✅ **DO NOT** commit OAuth credentials to version control
- ✅ Firebase handles OAuth securely on the backend
- ✅ Google Client ID and Secret are managed in Firebase Console
- ✅ Frontend code only triggers the OAuth flow

---

## 🎨 UI/UX Features

### Loading States
- Spinning loader appears while authenticating
- Button is disabled during authentication
- Clear visual feedback

### Error Handling
- Network errors are caught and displayed
- User-friendly error messages
- Console logs for debugging

### User Experience
- Seamless popup-based authentication
- No page refreshes
- Automatic profile creation for new users
- Preserves user session across page reloads

---

## 🐛 Troubleshooting

### "Popup closed by user"
**Cause**: User closed the Google sign-in popup before completing authentication.  
**Solution**: Try again and complete the authentication flow.

### "Unauthorized domain"
**Cause**: Your current domain is not authorized in Firebase Console.  
**Solution**: Add the domain to **Authorized domains** in Firebase Authentication Settings.

### "Google provider not enabled"
**Cause**: Google sign-in is not enabled in Firebase Console.  
**Solution**: Follow [Step 2](#step-2-enable-google-sign-in-method) above.

### "API key not valid"
**Cause**: Firebase API key is missing or incorrect.  
**Solution**: Verify `firebase/config.ts` has the correct Firebase configuration.

### "Network request failed"
**Cause**: Internet connection issue or Firebase service unavailable.  
**Solution**: Check internet connection and try again.

### Popup Blocked
**Cause**: Browser is blocking popups.  
**Solution**: Allow popups for your domain in browser settings.

---

## 📊 Data Storage

### User Profile (`users` collection)
```typescript
{
  displayName: string,
  bio: string,
  stats: {
    articlesRead: number,
    projectsCompleted: number,
    contributions: number,
    points: number
  },
  activities: Array<{
    title: string,
    timestamp: string,
    type: 'course' | 'project'
  }>
}
```

### User Progress (`userProgress` collection)
```typescript
{
  userId: string,
  displayName: string,
  solvedQuestions: string[] | object,
  submissions: Submission[],
  streak: {
    currentStreak: number,
    longestStreak: number,
    lastActive: Date,
    calendar: object
  },
  categoryProgress: Array<...>,
  difficultyProgress: Array<...>,
  badges: Array<...>,
  totalSolved: number,
  totalAttempted: number,
  rank: number,
  xp: number,
  level: number
}
```

---

## 🚀 Next Steps

### For Production Deployment

1. **Update Authorized Domains**:
   - Add your production domain to Firebase Console
   - Update OAuth consent screen with production URLs

2. **Verify Domain Ownership**:
   - Verify your domain in Google Cloud Console
   - Add proper DNS records if required

3. **Test on Production**:
   - Test Google sign-in on your live site
   - Verify callback URLs work correctly
   - Check error handling

4. **Monitor Usage**:
   - Monitor authentication analytics in Firebase Console
   - Check for failed authentication attempts
   - Review error logs

### Optional Enhancements

- Add GitHub OAuth (button is already in UI)
- Add Facebook OAuth
- Add Twitter/X OAuth
- Implement account linking (merge multiple auth methods)
- Add two-factor authentication (2FA)

---

## 📞 Support

If you encounter any issues:

1. Check the browser console for detailed error messages
2. Verify Firebase Console configuration
3. Review Firestore security rules
4. Check Firebase Authentication logs in Firebase Console
5. Open an issue on GitHub with error details

---

## 📝 Developer Notes

### Code Locations

- **Auth Context**: `src/context/AuthContext.tsx` - Contains `signInWithGoogle()` method
- **Sign In Page**: `src/pages/SignIn.tsx` - Google sign-in button with handler
- **Sign Up Page**: `src/pages/SignUp.tsx` - Google sign-up button with handler
- **Firebase Config**: `src/firebase/config.ts` - Firebase initialization

### Key Functions

```typescript
// Sign in with Google (works for both sign-in and sign-up)
const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  // Automatic profile creation for new users
  // Session management handled by Firebase
};
```

---

**Built with ❤️ for the DEV_ELEVATE community**

🌟 If you find this helpful, star the repo!

