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
    //  was set to this list incorrectly. This should
    //  not happen using the default navigator and
    //  resource components.
    if ($vBIsThisRoute === true) {
    
      // @switch
      //  If the url path contains more components that the
      //  current component this list belongs to, then there's
      //  more routing to do.
      //  List: db.profiles,db.posts,db.tags
      //  Path: /db.profiles/123/db.posts/abc/db.tags (would end here)
      //  Path: /db.profiles/123/db.posts/abc/db.tags/345 (would select
      //        tag 345, then switch the context to tag 345)
      //  Path: /db.profiles/123/db.posts/abc/db.tags/345/db.images/789
      //        (would still only select tag 345, then switch the context
      //        to tag 345)
      if ($vAPathComponents.length >= $vANameComponents.length * 2) {
    
        // @assign
        let $vSPrimaryValue;
    
        // @action
        try {
          $vSPrimaryValue = decodeURIComponent($vAPathComponents[(($vANameComponents.length * 2) - 1)]);
        } catch ($e) {
          // @ignore
        }
    
        // @switch
        if (typeof $vSPrimaryValue === 'string') {
    
          // @assign
          let $vBFound = true;
    
          // @action
          try {
            await $rIContext.ma_select($vSPrimaryValue);
          } catch ($e) {
    
            // @ignore
    
            // @assign
            $vBFound = false;
    
          }
    
          // @switch
          if ($vBFound === true
          && $rIContext.pHXItems.hasOwnProperty($vSPrimaryValue) === true) {
    
            // @assign
            $oIJSENModInterfaceClsStateExtReactJSClsDOMNavigator.pIContext = $rIContext.pHXItems[$vSPrimaryValue]['&'];
    
          } else {
    
            // @assign
            //  When an item is deleted, the deleted action component
            //  route is replaced from the router history, but the item's
            //  page isn't replaced. To prevent the back button from just
            //  erroring out unnecessarily, when that page is accessed,
            //  just replace its state in the history with the route of
            //  its parent list.
            let $vBItemWasDeleted = false;
    
            // @narrow
            try {
    
              // @switch
              if ($rIContext.pJContract.hasOwnProperty('kJItemTemplate') === true
              && $rIContext.pJContract['kJItemTemplate'].hasOwnProperty('kSPrimary') === true
              && $rIContext.pJContract['kJItemTemplate']['kSPrimary'].length > 0
              && $rIContext.pIJSENModInterfaceClsDOM.pHItemDirectory.hasOwnProperty($rIContext.pJContract['kSType']) === true
              && $rIContext.pIJSENModInterfaceClsDOM.pHItemDirectory[$rIContext.pJContract['kSType']].hasOwnProperty($vSPrimaryValue) === true
              && $rIContext.pIJSENModInterfaceClsDOM.pHItemDirectory[$rIContext.pJContract['kSType']][$vSPrimaryValue].hasOwnProperty($rIContext.pJContract['kJItemTemplate']['kSPrimary']) === true
              && $rIContext.pIJSENModInterfaceClsDOM.pHItemDirectory[$rIContext.pJContract['kSType']][$vSPrimaryValue][$rIContext.pJContract['kJItemTemplate']['kSPrimary']]['-'] === '1') {
    
                // @assign
                $vBItemWasDeleted = true;
    
              }
    
            } catch ($e) {
              // @ignore
            }
    
            // @switch
            if ($vBItemWasDeleted === true) {
    
              // @action
              try {
                await $aFNext(
                  '/' + $vAPathComponents.slice(0, (($vANameComponents.length * 2) - 1)).join('/')
                );
              } catch ($e) {
                // @ignore
              }
    
            } else {
    
              // @action
              try {
                await $aFNext('/not-found');
              } catch ($e) {
                // @ignore
              }
    
            }
    
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
