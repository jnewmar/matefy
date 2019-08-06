App.info({
  id: 'br.com.matefy',
  name: 'Matefy',
  description: 'Matefy, patique outros idiomas e conheça pessoas ',
  version: '0.0.13',
  author: 'William Mori',
  email: 'william.mori@gmail.com	',
  buildNumber: '10000013' 
});


App.setPreference('Orientation', 'portrait');
App.setPreference('ios-orientation-iphone', 'portrait');
App.accessRule('*');
App.accessRule("blob:*");
App.setPreference('StatusBarOverlaysWebView', 'true');
App.setPreference('StatusBarStyle', 'lightcontent');





App.icons({
  // iOS
 // 'iphone': 'resources/icons/icon-60x60.png',
 // 'iphone_2x': 'resources/icons/icon-60x60@2x.png',
 // 'ipad': 'resources/icons/icon-72x72.png',
 // 'ipad_2x': 'resources/icons/icon-72x72@2x.png',

  // Android
  'android_ldpi': 'resources/icons/drawable-ldpi/icon.png',
  'android_mdpi': 'resources/icons/drawable-mdpi/icon.png',
  'android_hdpi': 'resources/icons/drawable-hdpi/icon.png',
  'android_xhdpi': 'resources/icons/drawable-xhdpi/icon.png'
});

App.launchScreens({
  // iOS
 // 'iphone': 'resources/splash/splash-320x480.png',
 // 'iphone_2x': 'resources/splash/splash-320x480@2x.png',
 // 'iphone5': 'resources/splash/splash-320x568@2x.png',
 // 'ipad_portrait': 'resources/splash/splash-768x1024.png',
 // 'ipad_portrait_2x': 'resources/splash/splash-768x1024@2x.png',
 // 'ipad_landscape': 'resources/splash/splash-1024x768.png',
 // 'ipad_landscape_2x': 'resources/splash/splash-1024x768@2x.png',

  // Android
  'android_ldpi_portrait':  'resources/splash/res-long-port-ldpi/default.png',
  'android_ldpi_landscape': 'resources/splash/res-long-land-ldpi/default.png',
  'android_mdpi_portrait':  'resources/splash/res-long-port-mdpi/default.png',
  'android_mdpi_landscape': 'resources/splash/res-long-land-mdpi/default.png',
  'android_hdpi_portrait':  'resources/splash/res-long-port-hdpi/default.png',
  'android_hdpi_landscape': 'resources/splash/res-long-land-hdpi/default.png',
  'android_xhdpi_portrait': 'resources/splash/res-long-port-xhdpi/default.png',
  'android_xhdpi_landscape':'resources/splash/res-long-land-xhdpi/default.png',
  
});
