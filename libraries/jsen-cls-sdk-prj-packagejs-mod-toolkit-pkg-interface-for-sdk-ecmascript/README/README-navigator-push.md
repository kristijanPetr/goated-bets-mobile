// @signature
//  This method only handles router
//  "path" replacements, not hash or
//  query updates.
// @readme $aBReplace
//  If set to true, will replace the
//  current state in the history, such
//  as detecting that a user is logged
//  in and forwarding the initial navigation
//  from "/" to "/account" without adding "/"
//  unnecessarily to the history (since it can't
//  be navigated to while logged in).
const $ma_push = function (
  $oIReactRouter,
  $aVPath = '', // must be an absolute path starting with "/" OR {path:"",hash:""}
  $aBReplace = false
) {
return new Promise (async (resolve, reject) => {
try {
  
  // @assign
  let $rI = this;
  
  // @assign
  let $vSCurrentPath = $rI.pIJSENModInterfaceClsState.pIWindow.location.pathname.replace(/\/+$/, '').replace(/^\/+/, ''),
  $vSCurrentHash = $rI.pIJSENModInterfaceClsState.pIWindow.location.hash.replace(/^\#+/, '');
  
  // @assign
  let $vSPath = '',
  $vSHash = '';
  
  // @switch
  if (typeof $aVPath === 'string') {
    
    // @assign
    $vSHash = $aVPath.split('#').slice(1).shift();
    
    // @assign
    $vSHash = ((typeof $vSHash === 'string') ? $vSHash.replace(/^\#+/, '') : '');
    
    // @assign
    $vSPath = $aVPath.split('#').shift().replace(/\/+$/, '').replace(/^\/+/, '');
    
  } else {
    
    // @switch
    if (typeof $aVPath === 'object'
    && $aVPath !== null
    && Array.isArray($aVPath) !== true) {
      
      // @switch
      if (($aVPath.hasOwnProperty('path') === true
      || 'path' in $aVPath === true)
      && typeof $aVPath['path'] === 'string') {
        
        // @assign
        $vSPath = $aVPath['path'].replace(/\/+$/, '').replace(/^\/+/, '');
        
      } else {
        
        // @assign
        $vSPath = $vSCurrentPath;
        
      }
      
      // @switch
      if (($aVPath.hasOwnProperty('hash') === true
      || 'hash' in $aVPath === true)
      && typeof $aVPath['hash'] === 'string') {
        
        // @assign
        $vSHash = $aVPath['hash'].replace(/^\#+/, '');
        
      }
      
    }
    
  }
  
  // @switch
  if ($vSPath === $vSCurrentPath
  && $vSHash === $vSCurrentHash) {
    
    // @action
    //  Because the route isn't changing,
    //  still trigger the animation, but
    //  don't allow any sort of next()
    //  functionality (redirection,
    //  updating metadata) since
    //  we're not really naviagating.
    try {
      await $rI.ma_navigate(
        null,
        {
          'path': (($vSPath.length > 0) ? '/' + $vSPath + '/' : '/'),
          ...(($vSHash.length > 0) ? {
            'hash': '#' + $vSHash
          } : {})
        },
        {
          'path': (($vSPath.length > 0) ? '/' + $vSPath + '/' : '/'),
          ...(($vSHash.length > 0) ? {
            'hash': '#' + $vSHash
          } : {})
        }, // "from" is obviously the same as "to"
        function () { return; } // do nothing since nothing is actually changing
      );
    } catch ($e) {
      throw new $xCError($e.message);
    }
  
  } else {
    
    // @assign
    let $vSHREF = (($vSPath.length > 0) ? '/' + $vSPath + '/' : '/');
    
    // @assign
    $vSHREF += (($vSHash.length > 0) ? '#' + $vSHash : '');
    
    // @switch
    if (($vSPath === $vSCurrentPath
    && $vSHash !== $vSCurrentHash)
    || $aBReplace === true) {
    // @modify 20230417
    // if ($aBReplace === true) {
      
      // @action
      $rI.pIJSENModInterfaceClsState.pIWindow.history.pushState({'shouldReload':true}, '', $vSHREF);
      
      // // @assign
      // $rI.pIJSENModInterfaceClsState.pIWindow.location.hash = $vSHash;
      
      // // @action
      // $rI.pIJSENModInterfaceClsState.pIWindow.location.reload();
    
    } else {
      
      // @action
      $rI.pIJSENModInterfaceClsState.pIWindow.history.pushState({}, '', $vSHREF);
      
      // // @assign
      // $rI.pIJSENModInterfaceClsState.pIWindow.location.href = $vSHREF;
    
    }
    
    
    
    // @modify 20230421
    //  We're adding this here, because in react (unlike vue),
    //  the state's before_each function is not called
    //  when using ma_push (but it should be).
    
    // @assign
    let $aFNext = function () { return; };
    
    // @switch
    if ($rI.pIJSENModInterfaceClsState.hasOwnProperty('ma_before_each') === true
    || 'ma_before_each' in $rI.pIJSENModInterfaceClsState === true) {
      
      // @assign
      $aFNext = function ($aSToPath, $aFResolve, $aFReject) {
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
            $rI.pIJSENModInterfaceClsState.pIWindow.location.href = $aSToPath;
          }
          $aFResolve();
          return;
        } catch ($e) {
          $aFReject(new $xCError($e.message));
          return;
        }
      };
      
    }
    
    // @switch
    if ($rI.pIJSENModInterfaceClsState.hasOwnProperty('ma_before_each') === true
    || 'ma_before_each' in $rI.pIJSENModInterfaceClsState === true) {
      
      // @action
      try {
        await $rI.ma_watch_call(
          $rI,
          (async () => {
            await $rI.pIJSENModInterfaceClsState.ma_before_each(
              {
                'path': (($vSPath.length > 0) ? '/' + $vSPath + '/' : '/'),
                ...(($vSHash.length > 0) ? {
                  'hash': '#' + $vSHash
                } : {})
              },
              {
                'path': (($vSCurrentPath.length > 0) ? '/' + $vSCurrentPath + '/' : '/'),
                ...(($vSCurrentHash.length > 0) ? {
                  'hash': '#' + $vSCurrentHash
                } : {})
              },
              $aFNext
            );
          })
        );
      } catch ($e) {
        throw new $xCError($e.message);
      }
      
    } else {
      
      // @action
      try {
        await $rI.ma_watch_call(
          $rI,
          (async () => {
            await $rI.ma_navigate(
              null,
              {
                'path': (($vSPath.length > 0) ? '/' + $vSPath + '/' : '/'),
                ...(($vSHash.length > 0) ? {
                  'hash': '#' + $vSHash
                } : {})
              },
              {
                'path': (($vSCurrentPath.length > 0) ? '/' + $vSCurrentPath + '/' : '/'),
                ...(($vSCurrentHash.length > 0) ? {
                  'hash': '#' + $vSCurrentHash
                } : {})
              },
              $aFNext
            );
          })
        );
      } catch ($e) {
        throw new $xCError($e.message);
      }
      
    }
    
    
    
    // @modify 20221112
    //  This needs to be called here, but also inside of ma_navigate,
    //  which is why we have to include it inside of this block, instead
    //  of after the call to ma_navigate above as well.
    // @narrow
    try {
    
      // @assign
      if (typeof $vSHash === 'string'
      && $vSHash.trim().replace(/^(\#)+/g, '').split('#').shift().length > 0) {
    
        // @action
        try {
          setTimeout(
            async () => {
    
              // @action
              try {
                $rI.pIJSENModInterfaceClsState.pIWindow.document.getElementById(
                  $vSHash.trim().replace(/^(\#)+/g, '').split('#').shift()
                ).scrollIntoView();
              } catch ($e) {
    
                // @modify 20221117
                //  Moved this into here so that it's always called UNLESS there is an active jumplink that worked.
                // @action
                try {
                  $rI.pIJSENModInterfaceClsState.pIWindow.scrollTo(0, 0);
                } catch ($e) {
                  // @ignore
                }
    
              }
    
            },
            $rI.pNNavigatingTransitionDuration + 100
          );
        } catch ($e) {
          throw new $xCError($e.message);
        }
    
      } else {
    
        // @modify 20221117
        // @throws
        //  This isn't actually an error.
        throw new $xCError();
    
      }
    
    } catch ($e) {
    
      // @modify 20221117
      //  Moved this into here so that it's always called UNLESS there is an active jumplink that worked.
      // @action
      try {
        $rI.pIJSENModInterfaceClsState.pIWindow.scrollTo(0, 0);
      } catch ($e) {
        // @ignore
      }
    
    }
  
  }
  
  // @return
  resolve();
  return;
  
} catch ($e) {
  reject(new $xCError($e.message));
  return;
}})};

// @assign
$xC.prototype.ma_push = $ma_push;
