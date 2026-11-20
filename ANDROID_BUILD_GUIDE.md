# Android APK তৈরি করার নির্দেশিকা (Capacitor + Android Studio)

এই প্রজেক্টে **Capacitor Android** প্রজেক্ট (`android/` ফোল্ডার) এবং ওয়েব বিল্ড (`dist/`) আগে থেকেই সিংক করা আছে। আপনার কম্পিউটারে **APK** ফাইল তৈরি করতে নিচের সহজ ধাপগুলো অনুসরণ করুন:

## ধাপ ১: প্রজেক্ট ডাউনলোড ও ইনস্টল
১. AI Studio থেকে প্রজেক্টের ফাইলগুলো **Download / Export** করে আপনার কম্পিউটারে আনজিপ করুন।
২. টার্মিনাল / Command Prompt-এ প্রজেক্ট ফোল্ডারের ভেতর গিয়ে কমান্ড দিন:
```bash
npm install
npm run cap:sync
```

## ধাপ ২: Android Studio দিয়ে APK বিল্ড
১. নিচের কমান্ড দিয়ে Android Studio-তে `android/` প্রজেক্টটি খুলুন (অথবা সরাসরি Android Studio থেকে **Open** → `android` ফোল্ডার সিলেক্ট করুন):
```bash
npx cap open android
```
২. Gradle সিংক শেষ হলে উপরের মেনু থেকে ক্লিক করুন:
   **Build → Build Bundle(s) / APK(s) → Build APK(s)**
৩. বিল্ড সম্পন্ন হলে **locate** লিংকে ক্লিক করলেই `android/app/build/outputs/apk/debug/app-debug.apk` ফাইলটি পেয়ে যাবেন।

## বিকল্প (Command Line দিয়ে সরাসরি APK)
Android SDK ইনস্টল থাকলে `android/` ফোল্ডারের ভেতর নিচের কমান্ড চালালেও APK তৈরি হবে:
```bash
cd android
./gradlew assembleDebug
```
*(Windows-এ `gradlew.bat assembleDebug`)*
