<script setup>
  
  import toolkit from 'jsen-cls-sdk-prj-packagejs-mod-toolkit-pkg-interface-for-sdk-ecmascript';
  
  let dom = new toolkit.sdk.dom(
    'main', // dom name
    'http://localhost:49000/openapi.json', // api url
    '', // '^(0\.0\.0)$', // version
    {
      // '/someapi.members/:0(email)/someapi.blogs': {
      //   'POST:/test': {
      //     'text': {
      //       'maxlength': 'This is maxlength custom.',
      //       'format': 'This is format custom.',
      //       'required': 'This is required custom.',
      //       '>': '',
      //       '>=': '',
      //       '<': '',
      //       '<=': ''
      //     }
      //   }
      // }
    }, // warnings
    {
      // '/someapi.members/:0(email)/someapi.payments': {
      //   'POST': {
      //     '400': 'This is 400 custom.'
      //   }
      // }
    }, // errors
    'main', // localstorage
    null, // auth root (dom obj reference)
    null, // item cache dir (dom obj reference)
    [], // api url alts
    {
      // '$dom:root': '/db' // (/public/db/openapi.json)
    }, // static cache
    {
      // ...JSON.parse(JSON.stringify({
      //   'kSEnableDebugging': '1', // $rI.pSEnableDebugging,
      //   'kSDeployment': 'development', // $rI.pSDeployment,
      //   'kSVersion': '0.0.0', // $rI.pSVersion,
      //   'kSURL': 'http://localhost:9992', // $rI.pSURL,
      //   'kSProtocol': 'http://', $rI.pSProtocol,
      //   'kSHostname': 'localhost', // $rI.pSHostname,
      //   'kSPort': '9992', // $rI.pSPort,
      //   'kHOptions': {}, // $rI.pHOptions
      // })),
      // 'kFWindow': function () { return window; }
    }
  );
  
  let navigator = new toolkit.sdk.navigator(
    dom,
    true,
    // true
  );
  
  dom.ma_init().then(() => {
    
    let url = new URL(window.location.href);
    
    // /someapi.members#POST
    // /someapi.members/someemail%40gmail.com#GET
    // /someapi.members/someemail%40gmail.com/someapi.payments#POST
    // /someapi.members/someemail%40gmail.com/someapi.blogs#POST
    navigator.ma_navigate(url.pathname + url.hash).then(() => {
      
      // /someapi.members/:0(email)
      console.log(navigator.context);
      
      // navigator.context.ma_resubmit();
      
      // navigator.context.ma_submit().finally(() => {
      //   console.log(navigator.context);
      //   console.log(navigator.context.ms_get_error_message());
      // });
      
      // dom.ms_set_authorization('');
      
      // console.log(dom.auth);
      
      // navigator.context.fields['email'].value = 'someemail@gmail.com';
      // navigator.context.ma_submit();
      
    });
    
  });
  
</script>

<template>
</template>

<style scoped>
</style>
