# Vercel Deployment Guide

## Required Environment Variables

Make sure to set these environment variables in your Vercel project settings:

### 1. NextAuth.js Configuration
```
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-nextauth-secret-key-here
```

### 2. Google OAuth
```
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 3. MongoDB
```
MONGODB_URI=your-mongodb-connection-string
```

### 4. OpenAI (if using)
```
OPENAI_API_KEY=your-openai-api-key
```

## How to Set Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable with the correct name and value
5. Redeploy your application

## Troubleshooting Admin Access Issues

### 1. Check Environment Variables
- Ensure `NEXTAUTH_URL` is set to your production domain
- Verify `NEXTAUTH_SECRET` is a strong, unique string
- Confirm `MONGODB_URI` is accessible from Vercel

### 2. Verify User Admin Status
- Check your MongoDB database to ensure your user has `isAdmin: true`
- You can manually update a user to admin in MongoDB:
```javascript
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { isAdmin: true } }
)
```

### 3. Check Vercel Logs
- Go to your Vercel dashboard → Functions
- Check the logs for any errors related to authentication or database connection

### 4. Common Issues
- **CORS errors**: Make sure your Google OAuth redirect URIs include your Vercel domain
- **Database connection**: Ensure your MongoDB cluster allows connections from Vercel's IP ranges
- **Session issues**: Verify `NEXTAUTH_SECRET` is the same across all deployments

## Testing Admin Access

1. Deploy with all environment variables set
2. Sign in with your Google account
3. Check Vercel function logs for any authentication errors
4. Verify your user exists in the database with `isAdmin: true`
5. Try accessing `/admin` route

## Security Notes

- Never commit environment variables to your repository
- Use strong, unique secrets for `NEXTAUTH_SECRET`
- Regularly rotate your API keys and secrets
- Monitor your application logs for suspicious activity 