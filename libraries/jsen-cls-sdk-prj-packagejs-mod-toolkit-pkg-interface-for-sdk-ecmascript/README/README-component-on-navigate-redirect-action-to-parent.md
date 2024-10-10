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
    
    // @action
    try {
      await $aFNext(
        '/' + $vAPathComponents.join('/') + '#' + String(Date.now())
      );
    } catch ($e) {
      // @ignore
    }
    
    // @return
    resolve();
    return;
    
  } catch ($e) {
    reject(new $xCError($e.message));
    return;
  }});
};
