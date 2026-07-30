# Fastlane Automation for sf_customer

This directory contains Fastlane automation scripts for the `sf_customer` Flutter application.

## Prerequisites

1. **Ruby and Bundler**:
   ```bash
   cd apps/sf_customer
   bundle install
   ```

2. **Configuration**:
   Copy `.env.example` to `.env` or set environment variables in your CI/CD environment:
   ```bash
   cp fastlane/.env.example fastlane/.env
   ```

## Available Lanes

### Android
- `bundle exec fastlane android test` — Run Flutter tests
- `bundle exec fastlane android build_apk` — Build release APK
- `bundle exec fastlane android build_bundle` — Build release Android App Bundle (.aab)
- `bundle exec fastlane android beta` — Build and upload .aab to Google Play internal/closed testing
- `bundle exec fastlane android release` — Build and upload .aab to Google Play production

### iOS
- `bundle exec fastlane ios test` — Run Flutter tests
- `bundle exec fastlane ios build_ipa` — Build release iOS IPA
- `bundle exec fastlane ios beta` — Build and upload IPA to TestFlight
- `bundle exec fastlane ios release` — Build and submit IPA to App Store

## Running with Moonrepo

You can run Fastlane tasks via moon from anywhere in the repository:
```bash
moon run sf_consumer:fastlane-android-bundle
moon run sf_consumer:fastlane-android-beta
moon run sf_consumer:fastlane-ios-beta
```
