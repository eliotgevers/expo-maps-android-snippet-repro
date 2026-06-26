# expo-maps Android marker snippet repro

Minimal Expo SDK 56 repro for an `expo-maps` Android marker info-window issue.

## Problem

On Android, a `GoogleMaps.Marker` with a `title` but no `snippet` still renders an info window with blank vertical space where the snippet line would be.

Google Maps Compose accepts `snippet: String? = null`, and Google Maps Android documents snippet text as optional. Expo Maps Android currently defaults `MarkerRecord.snippet` to an empty string and passes it to `Marker(...)`, so omitted JS snippets are delivered to Google Maps as `""` instead of `null`.

## Repro

1. Set a Google Maps Android API key in the environment.

   ```sh
   export GOOGLE_MAPS_ANDROID_API_KEY=...
   ```

   If the key is restricted, allow the Android package from `app.config.js` and the debug keystore fingerprint for your local build.

2. Build and run the Android app.

   ```sh
   bun install
   bun run run:android
   ```

3. Tap the marker titled `Title only`.

Expected: the info window should size to one title line.

Actual on `expo-maps@56.0.7`: the info window reserves blank second-line space.

4. Tap the marker titled `Title and snippet`.

Expected: this marker should keep its second line.

## Captured evidence

- Baseline, `expo-maps@56.0.7`, title-only marker: `screenshots/baseline-title-only.png`
- Patched native source, title-only marker: `screenshots/patched-title-only.png`
- Patched native source, title+snippet marker: `screenshots/patched-title-snippet.png`

For the patched native-source run, the repro temporarily removed the `publication` block from
`node_modules/expo-maps/expo-module.config.json` so Gradle compiled `:expo-maps:compileDebugKotlin`
from local source instead of consuming the package's local Maven AAR.

## Additional note

Passing `snippet: null` from JS is not a usable app-level workaround. In a local app test, forcing `snippet: null as unknown as string` caused Android to reject the `markers` prop with a native view-prop error.

## Relevant files

- `App.tsx`: creates one title-only marker and one title+snippet marker.
- `app.config.js`: reads `GOOGLE_MAPS_ANDROID_API_KEY` from the environment.
