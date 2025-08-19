package com.cicddemo.utility;

import androidx.annotation.Nullable;

import com.facebook.react.TurboReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.model.ReactModuleInfo;
import com.facebook.react.module.model.ReactModuleInfoProvider;

import java.util.HashMap;
import java.util.Map;

public class UtilityPackage extends TurboReactPackage {

  @Override
  public @Nullable NativeModule getModule(String name, ReactApplicationContext reactContext) {
    if (UtilityBridgeModule.NAME.equals(name)) {
      return new UtilityBridgeModule(reactContext);
    }
    return null;
  }

  @Override
  public ReactModuleInfoProvider getReactModuleInfoProvider() {
    return () -> {
      final Map<String, ReactModuleInfo> moduleInfos = new HashMap<>();
      moduleInfos.put(
          UtilityBridgeModule.NAME,
          new ReactModuleInfo(
              UtilityBridgeModule.NAME, // name
              UtilityBridgeModule.class.getName(), // className
              false, // canOverrideExistingModule
              false, // needsEagerInit
              false, // hasConstants
              false, // isCxxModule
              true // isTurboModule
              ));
      return moduleInfos;
    };
  }
}

