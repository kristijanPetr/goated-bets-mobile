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
    let $vAPathComponents;
    
    // @action
    try {
      $vAPathComponents = $vSPath.substr(1).split('/');
    } catch ($e) {
      throw $e;
    }
    
    // @assign
    let $rIContext = $oIJSENModInterfaceClsStateExtReactJSClsDOMNavigator.pIContext;
    
    // @switch
    if ($rIContext.pHLists.hasOwnProperty($vAPathComponents[0]) === true) {
    
      // @assign
      $oIJSENModInterfaceClsStateExtReactJSClsDOMNavigator.pIContext = $rIContext.pHLists[$vAPathComponents[0]];
    
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
    
    // @return
    resolve();
    return;
    
  } catch ($e) {
    reject(new $xCError($e.message));
    return;
  }});
};
