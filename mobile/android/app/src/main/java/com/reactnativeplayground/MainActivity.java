package com.reactnativeplayground;

import android.os.Bundle;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.zoontek.rnbootsplash.RNBootSplash;

import android.app.Activity;
import android.graphics.Rect;
import android.view.View;
import android.view.ViewGroup;
import android.view.ViewTreeObserver;
import android.widget.FrameLayout;

public class MainActivity extends ReactActivity {

   // For more information, see https://issuetracker.google.com/issues/36911528
    // To use this class, simply invoke assistActivity() on an Activity that already has its content view set.

    private View rootView;
    private ViewGroup contentContainer;
    private ViewTreeObserver viewTreeObserver;
    private ViewTreeObserver.OnGlobalLayoutListener listener = () -> possiblyResizeChildOfContent();
    private Rect contentAreaOfWindowBounds = new Rect();
    private FrameLayout.LayoutParams rootViewLayout;
    private int usableHeightPrevious = 0;


  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "ReactNativePlayground";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
    contentContainer = (ViewGroup) findViewById(android.R.id.content);
    rootView = contentContainer.getChildAt(0);
    rootViewLayout = (FrameLayout.LayoutParams) rootView.getLayoutParams();
  }

  @Override
  protected void onPause() {
    super.onPause();
    if (viewTreeObserver.isAlive()) {
        viewTreeObserver.removeOnGlobalLayoutListener(listener);
    }
  }

  @Override
  protected void onResume() {
    super.onResume();
    if (viewTreeObserver == null || !viewTreeObserver.isAlive()) {
        viewTreeObserver = rootView.getViewTreeObserver();
    }

    viewTreeObserver.addOnGlobalLayoutListener(listener);
  }

  @Override
  protected void onDestroy() {
    super.onDestroy();
    rootView = null;
    contentContainer = null;
    viewTreeObserver = null;
  }

  private void possiblyResizeChildOfContent() {
    contentContainer.getWindowVisibleDisplayFrame(contentAreaOfWindowBounds);
    int usableHeightNow = contentAreaOfWindowBounds.height();

    if (usableHeightNow != usableHeightPrevious) {
      rootViewLayout.height = usableHeightNow;
      rootView.layout(contentAreaOfWindowBounds.left, contentAreaOfWindowBounds.top, contentAreaOfWindowBounds.right, contentAreaOfWindowBounds.bottom);
      rootView.requestLayout();

      usableHeightPrevious = usableHeightNow;
    }
  }

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {

      @Override
      protected void loadApp(String appKey) {
        RNBootSplash.init(MainActivity.this);
        super.loadApp(appKey);
      }
    };
  }
}
