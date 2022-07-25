# DemoMetamask
## 🚀 Getting Started:

## Install the dependencies 
```
npm install or yarn install
```
## Run & build
### For Android

Run the following command to run on android.

``` 
npx react-native run-android
```
Run the following command to generate apk on android.
```
yarn apk
```

### For iOS

Run the following commands to install pods and run the app on iPhone simulator

``` 
cd ios && pod install && cd ..
npx react-native run-ios
```
## Expland task
```
- When I receive this task, I know that we must have a way to connect with metamask, open metamask and receive Address 
and ChainId to our app from account sign in metamask
- There are two ways to archive this : 
1. Open metamask from webview in our app
2. Open metamask by DeepLink from our app

And I choose the second way. But in second way, we can 
open metamask by deeplink but how can we get data from metamask
to our app. I have research and find out WalletConnect Library 
can help us to open metamask by DeepLink and receive data from
metamask by websocket
After dive deep into WalletConnect library, I know how they use
 deep link to open app and How they set up websocket server to receive
data from metamask. But implement this by our self take a long time 
for me so I decided to just use there library

