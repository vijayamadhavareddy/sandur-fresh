fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

## Android

### android test

```sh
[bundle exec] fastlane android test
```

Run Flutter tests

### android build_apk

```sh
[bundle exec] fastlane android build_apk
```

Build Android release APK

### android build_bundle

```sh
[bundle exec] fastlane android build_bundle
```

Build Android release App Bundle (.aab)

### android beta

```sh
[bundle exec] fastlane android beta
```

Build and upload App Bundle to Google Play Internal / Closed Track

### android firebase_distribute

```sh
[bundle exec] fastlane android firebase_distribute
```

Build APK and upload to Firebase App Distribution

### android release

```sh
[bundle exec] fastlane android release
```

Build and deploy to Google Play Production

----


## iOS

### ios test

```sh
[bundle exec] fastlane ios test
```

Run Flutter tests

### ios build_ipa

```sh
[bundle exec] fastlane ios build_ipa
```

Build iOS IPA

### ios beta

```sh
[bundle exec] fastlane ios beta
```

Build and upload to TestFlight

### ios release

```sh
[bundle exec] fastlane ios release
```

Build and submit to App Store

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
