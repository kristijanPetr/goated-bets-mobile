// @signature
const $ma_path_to_context = function (
  $aSPath,
  $oIContext = null
) {
return new Promise (async (resolve, reject) => {
try {
  
  // @assign
  let $rI = this;
  
  // @assign
  let $vSAction = '';

  // @switch
  if ($aSPath.indexOf('#') > -1) {
    
    // @action
    try {
      $vSAction = $aSPath.split('#').pop();
    } catch ($e) {
      throw new $xCError($e.message)
    }
    
    // @action
    try {
      $aSPath = $aSPath.split('#').slice(0, -1).join('#');
    } catch ($e) {
      throw new $xCError($e.message)
    }
    
  }
  
  // @assign
  let $vAPathComponents = [];

  // @switch
  if ($aSPath !== '/') {
    
    // @action
    try {
      $vAPathComponents = $aSPath.replace(/^\/+/, '').replace(/\/+$/, '').split('/');
    } catch ($e) {
      throw new $xCError($e.message)
    }
    
  }
  
  // @assign
  let $vBIsValidPath = true;

  // @readme
  //  Even though "/" can be used for root navigation,
  //  do NOT allow relative navigation via "./" or "../"
  //  since the period could actually be a primary key.
  // @assign
  let $rIContext = (($aSPath.substr(0, 1) === '/' || $oIContext === null) ? $rI.pIJSENModInterfaceClsDOM.pIItemAPI : $oIContext);

  // @repeat
  for (
    let $i1i = 0,
    $i1n = $vAPathComponents.length;
    $i1i < $i1n;
    $i1i += 1
  ) {

    // @switch
    if ($rIContext.hasOwnProperty('pAItems') === true) {

      // @assign
      let $vSPrimaryKeyValue = decodeURIComponent($vAPathComponents[$i1i]);

      // @switch
      if ($rIContext.pHXItems.hasOwnProperty($vSPrimaryKeyValue) === true
      && !!$rIContext.pHXItems[$vSPrimaryKeyValue]['&']) {

        // @assign
        $rIContext = $rIContext.pHXItems[$vSPrimaryKeyValue]['&'];

      } else {

        // @assign
        let $vBFound = true;

        // @action
        try {
          await $rIContext.ma_select($vSPrimaryKeyValue);
        } catch ($e) {

          // @ignore

          // @assign
          $vBFound = false;

        }

        // @switch
        if ($vBFound === true
        && $rIContext.pHXItems.hasOwnProperty($vSPrimaryKeyValue) === true
        && !!$rIContext.pHXItems[$vSPrimaryKeyValue]['&']) {

          // @assign
          $rIContext = $rIContext.pHXItems[$vSPrimaryKeyValue]['&'];

        } else {

          // @assign
          $vBIsValidPath = false;

          break;

        }

      }

    } else {

      // @switch
      if ($rIContext.pHLists.hasOwnProperty($vAPathComponents[$i1i]) === true) {

        // @assign
        $rIContext = $rIContext.pHLists[$vAPathComponents[$i1i]];

      } else {

        // @assign
        $vBIsValidPath = false;

        break;

      }

    }

  }

  // @switch
  if ($vBIsValidPath === true
  && $vSAction.length > 0) {
    
    // @switch
    if ($rIContext.pHActions.hasOwnProperty($vSAction) === true) {
      
      // @assign
      $rIContext = $rIContext.pHActions[$vSAction];
      
    } else {
      
      // @assign
      $vBIsValidPath = false;
      
    }
    
  }
  
  // @checks
  if ($vBIsValidPath !== true) {
    throw new $xCError('Improper path.');
  }
  
  // @return
  resolve($rIContext);
  return;
  
} catch ($e) {
  reject(new $xCError($e.message));
  return;
}})};
