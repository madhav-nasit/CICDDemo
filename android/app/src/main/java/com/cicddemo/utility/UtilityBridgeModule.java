package com.cicddemo.utility;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.annotations.ReactModule;

import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.GoogleApiAvailability;
import com.google.android.gms.tasks.Task;
import com.google.android.play.core.review.ReviewInfo;
import com.google.android.play.core.review.ReviewManager;
import com.google.android.play.core.review.ReviewManagerFactory;
import com.cicddemo.NativeUtilityBridgeSpec;

// This class extends the generated Spec from RN Codegen for TurboModules
@ReactModule(name = UtilityBridgeModule.NAME)
public class UtilityBridgeModule extends NativeUtilityBridgeSpec {
  public static final String NAME = "UtilityBridge";

  private final ReactApplicationContext reactContext;

  public UtilityBridgeModule(ReactApplicationContext context) {
    super(context);
    this.reactContext = context;
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  @Override
  public void requestReview() {
    if (isGooglePlayServicesAvailable()) {
      ReviewManager manager = ReviewManagerFactory.create(reactContext);
      Task<ReviewInfo> request = manager.requestReviewFlow();
      Log.i("GooglePlayServices", isGooglePlayServicesAvailable() + "");
      request.addOnCompleteListener(task -> {
        if (task.isSuccessful()) {
          try {
            ReviewInfo reviewInfo = task.getResult();
            Task<Void> flow = manager.launchReviewFlow(getCurrentActivity(), reviewInfo);
            flow.addOnCompleteListener(taski -> {
              Log.i("Review isSuccessful", "" + taski.isSuccessful());
            });
          } catch (Exception e) {
            Log.i("Review Error", "getResult may have thrown an exception. This is likely an emulated device.");
          }
        } else {
          String taskErrorMessage;
          try {
            taskErrorMessage = String.valueOf(task.getResult());
          } catch (Exception e) {
            taskErrorMessage = e.getMessage();
          }
          Log.i("Review Error", String.valueOf(taskErrorMessage));
        }
      });
    } else {
      Log.i("GooglePlayServices", isGooglePlayServicesAvailable() + "");
    }
  }

  private boolean isGooglePlayServicesAvailable() {
    GoogleApiAvailability gms = GoogleApiAvailability.getInstance();
    int isGMS = gms.isGooglePlayServicesAvailable(reactContext);
    return isGMS == ConnectionResult.SUCCESS;
  }
}

