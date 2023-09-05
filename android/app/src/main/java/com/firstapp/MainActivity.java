package com.memo;

import android.content.res.Configuration;
import android.os.Bundle; // add
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    // android 12
    androidx.core.splashscreen.SplashScreen.installSplashScreen(this);
    
    switch (
      getResources().getConfiguration().uiMode &
      Configuration.UI_MODE_NIGHT_MASK
    ) {
      case Configuration.UI_MODE_NIGHT_YES:
        setTheme(R.style.DarkTheme);

        break;
      case Configuration.UI_MODE_NIGHT_NO:
        setTheme(R.style.LightTheme);
        break;
      default:
        setTheme(R.style.LightTheme);
    }

    SplashScreen.show(this, true);
    super.onCreate(savedInstanceState);
  }

  // @Override
  // protected void onCreate(Bundle savedInstanceState) {
  //   SplashScreen.show(this, R.style.SplashScreenTheme, true); // here
  //   super.onCreate(savedInstanceState);
  // }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "Memo";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
   * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
   * (aka React 18) with two boolean flags.
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
      this,
      getMainComponentName(),
      // If you opted-in for the New Architecture, we enable the Fabric Renderer.
      DefaultNewArchitectureEntryPoint.getFabricEnabled()
    );
  }
}
