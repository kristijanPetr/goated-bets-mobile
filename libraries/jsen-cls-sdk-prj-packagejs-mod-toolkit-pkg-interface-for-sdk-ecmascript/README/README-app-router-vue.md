// @switch
if ($vIJSENModInterfaceClsState.hasOwnProperty('ma_before_each') === true
|| 'ma_before_each' in $vIJSENModInterfaceClsState === true) {
  
  // @assign
  //  The router's data layer functionality.
  $vIRouter.beforeEach((
    $aHTo,
    $aHFrom,
    $aFNext
  ) => {
    
    // @modify 20240129
    // @switch
    if ($vIJSENModInterfaceClsState
    && $vIJSENModInterfaceClsState.pSEnableDebugging === '1') {
      
      // @prints
      console.log([
        '[routing] app -> router (beforeEach)', {
        'to': $aHTo,
        'from': $aHFrom
      }]);
      
    }
    
    // @action
    return $vIJSENModInterfaceClsState.ma_before_each(
      $aHTo,
      $aHFrom,
      $aFNext
    );
    
  });
  
}
