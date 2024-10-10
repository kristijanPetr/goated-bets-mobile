// @switch
if ($vIJSENModInterfaceClsState.hasOwnProperty('ma_before_each') === true
|| 'ma_before_each' in $vIJSENModInterfaceClsState === true) {
  
  // @assign
  let $aFNext = function ($aSToPath, $aFResolve, $aFReject) {
    try {
      if (typeof $aSToPath === 'string'
      && $aSToPath.length > 0) {
        // @readme
        //  indexOf > 0 is used here on purpose.
        //  if $aSToPath starts with ? or #, then there isn't
        //  a new "path" being navigated to...
        //  This code looks like shit because I've stopped caring...
        //  React and Vite are just garbage, and that has obviously
        //  encouraged me to get so sick of their footguns that i
        //  then also write garbage. Paths need to end in a slash
        //  if the path contains ANY periods, or else Vite server
        //  will return a 404 if it doesn't find a file...
        //  If 404 -> then return index.html is the configuration we set, yay!
        //  But guess what! Vite doesn't listen to its own configuration options!
        //  Cool footgun!
        //  TBH, not sure why. Vite is written by Vue.
        //  Vue is amazing and does everything right.
        let $vNSearch = $aSToPath.indexOf('?');
        let $vNHash = $aSToPath.indexOf('#');
        let $vSSplitBy = '';
        if ($vNSearch > 0 && $vNHash > 0) {
          $vSSplitBy = (($vNSearch < $vNHash) ? '?' : '#');
        } else if ($vNSearch > 0) {
          $vSSplitBy = '?';
        } else if ($vNHash > 0) {
          $vSSplitBy = '#';
        }
        if ($vSSplitBy.length > 0) {
          let $vAToPathComponents = $aSToPath.split($vSSplitBy);
          if ($vAToPathComponents[0].slice(-1) !== '/') {
            $vAToPathComponents[0] = $vAToPathComponents[0] + '/';
          }
          $aSToPath = $vAToPathComponents.join($vSSplitBy);
        } else {
          if ($aSToPath.slice(-1) !== '/') {
            $aSToPath = $aSToPath + '/';
          }
        }
        $vIJSENModInterfaceClsState.pIWindow.location.href = $aSToPath;
      }
      $aFResolve();
      return;
    } catch ($e) {
      $aFReject(new $xCError($e.message));
      return;
    }
  };
  
  // @assign
  $vIJSENModInterfaceClsState.pIWindow.onpopstate = ($oIEvent) => {
    if (typeof $oIEvent === 'object'
    && $oIEvent !== null
    && Array.isArray($oIEvent) !== true) {
      if (($oIEvent.hasOwnProperty('state') === true
      || 'state' in $oIEvent === true)
      && typeof $oIEvent.state === 'object'
      && $oIEvent.state !== null
      && Array.isArray($oIEvent.state) !== true) {
        if ($oIEvent.state.shouldReload === true) {
          // @readme
          //  Browser back button press.
          // console.log('ONPOPSTATE HAS STATE HAS RELOAD');
          // console.log($oIEvent);
          // console.log('');
          $vIJSENModInterfaceClsState.pIWindow.location.reload();
        } else {
          // console.log('ONPOPSTATE HAS STATE NO RELOAD');
          // console.log($oIEvent);
          // console.log('');
        }
      } else {
        // @readme
        //  Manually changed hash in browser URL bar.
        // console.log('ONPOPSTATE NO STATE');
        // console.log($oIEvent);
        // console.log('');
        $vIJSENModInterfaceClsState.pIWindow.location.reload();
      }
    }
  };
  
  // @assign
  //  The router's data layer functionality.
  $vHRouteConfig['loader'] = ({ request, params }) => {
    return new Promise (async (resolve, reject) => {
    try {
      
      // @modify 20240129
      // @switch
      if ($vIJSENModInterfaceClsState
      && $vIJSENModInterfaceClsState.pSEnableDebugging === '1') {
        
        // @prints
        console.log([
          '[routing] app -> router (loader)', {
          // 'request': request,
          // 'params': params,
          'href': $vIJSENModInterfaceClsState.pIWindow.location.href
        }]);
        
      }
      
      // @assign
      let $vIURL;
      
      // @action
      try {
        // $vIURL = new URL(request.url);
        $vIURL = new URL($vIJSENModInterfaceClsState.pIWindow.location.href);
      } catch ($e) {
        throw new $xCError($e.message);
      }
      
      // @action
      try {
        await $vIJSENModInterfaceClsState.ma_before_each(
          {
            hash: $vIURL.hash,
            path: $vIURL.pathname
          },
          {}, // @todo: can we populate from?
          $aFNext // @todo: this was "$aFNext" in Vue
        );
      } catch ($e) {
        throw new $xCError($e.message);
      }
      
      // @return
      resolve(true);
      return;
      
    } catch ($e) {
      reject(new $xCError($e.message));
      return;
    }});
  };
  
}
