// @signature
const $ma_on_navigate = function (
  $oIJSENModInterfaceClsStateExtReactJSClsDOMNavigator,
  $aHTo,
  $aHFrom,
  $aFNext
) {
  return new Promise (async (resolve, reject) => {
  try {
    
    // @assign
    let $vSPath = '/';
    
    // @switch
    if ((
      $aHTo.hasOwnProperty('path') === true
      || 'path' in $aHTo === true
    )
    && typeof $aHTo.path === 'string'
    && $aHTo.path.substr(0, 1) === '/') {
    
      // @assign
      $vSPath = $aHTo.path;
    
    }
    
    // @assign
    let $vAPathComponents = [];
    
    // @action
    try {
      $vAPathComponents = $vSPath.substr(1).split('/');
    } catch ($e) {
      // @ignore
    }
    
    // @switch
    if ($vAPathComponents.slice(-1).pop() === '') {
    
      // @action
      try {
        $vAPathComponents.pop();
      } catch ($e) {
        // @ignore
      }
    
    }
    
    // @assign
    let $rIContext = $oIJSENModInterfaceClsStateExtReactJSClsDOMNavigator.pIContext;
    
    // @assign
    let $vANameComponents = [];
    
    // @action
    try {
      $vANameComponents = $rIContext.pSComponentName.split('/')[1].split(',');
    } catch ($e) {
      // @ignore
    }
    
    // @assign
    let $vBIsThisRoute = (($vANameComponents.length > 0) ? true : false);
    
    // @repeat
    for (
      let $i1i = 0,
      $i1n = $vANameComponents.length;
      $i1i < $i1n;
      $i1i += 1
    ) {
    
      // @switch
      if ($vANameComponents[$i1i] !== $vAPathComponents[$i1i * 2]) {
    
        // @assign
        $vBIsThisRoute = false;
    
        break;
    
      }
    
    }
    
    // @switch
    //  If the url path components do not match the
    //  name component for this list, then the context
    //  was set to this item incorrectly. This should
    //  not happen using the default navigator and
    //  resource components.
    if ($vBIsThisRoute === true) {
    
      // @switch
      //  If the url path contains more components than the
      //  current component this item belongs to, then there's
      //  more routing to do.
      //  List: db.profiles,db.posts
      //  Path: /db.profiles/123/db.posts/abc (would end here)
      //  Path: /db.profiles/123/db.posts/abc/db.tags
      //        (would route to this item's db.tags list)
      //  Path: /db.profiles/123/db.posts/abc/db.tags/345/db.images/789
      //        (would still only route to this item's db.tags list)
      if ($vAPathComponents.length > $vANameComponents.length * 2) {
    
        // @assign
        let $vSListName = $vAPathComponents[($vANameComponents.length * 2)];
    
        // @switch
        if ($rIContext.pHLists.hasOwnProperty($vSListName) === true) {
    
          // @assign
          $oIJSENModInterfaceClsStateExtReactJSClsDOMNavigator.pIContext = $rIContext.pHLists[$vSListName];
    
        } else {
    
          // @action
          try {
            await $aFNext('/not-found');
          } catch ($e) {
            // @ignore
          }
    
        }
    
      } else {
    
        // @switch
        if ((
          $aHTo.hasOwnProperty('hash') === true
          || 'hash' in $aHTo === true
        )
        && typeof $aHTo.hash === 'string'
        && $aHTo.hash.substr(0, 1) === '#'
        && $rIContext.pHActions.hasOwnProperty($aHTo.hash.substr(1)) === true) {
    
          // @assign
          $oIJSENModInterfaceClsStateExtReactJSClsDOMNavigator.pIContext = $rIContext.pHActions[$aHTo.hash.substr(1)];
    
        }
    
      }
    
    }
    
    // @return
    resolve();
    return;
    
  } catch ($e) {
    reject(new $xCError($e.message));
    return;
  }});
};
