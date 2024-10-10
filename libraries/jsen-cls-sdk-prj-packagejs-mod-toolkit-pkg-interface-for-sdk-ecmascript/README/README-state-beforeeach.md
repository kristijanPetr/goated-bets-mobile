// @signature
const $ma_before_each = function (
  $aHTo,
  $aHFrom,
  $aFNext
) {
return new Promise (async (resolve, reject) => {
try {
  
  // @assign
  let $rI = this;
  
  // @modify 20240129
  // @switch
  if ($rI.pSEnableDebugging === '1') {
    
    // @prints
    console.log([
      '[routing] state -> ma_before_each', {
      'to': $aHTo,
      'from': $aHFrom
    }]);
    
  }
  
  // @assign
  let $vBNextWasCalled = false;
  
  // @repeat
  for (
    let $i1k in $rI.pHJSENDOMsNavigator
  ) {
    
    // @switch
    if ($rI.pHJSENDOMsNavigator.hasOwnProperty($i1k) === true
    && (
      $rI.pHJSENDOMsNavigator[$i1k].hasOwnProperty('ma_navigate') === true
      || 'ma_navigate' in $rI.pHJSENDOMsNavigator[$i1k] === true
    )) {
      
      // @action
      try {
        await $rI.pHJSENDOMsNavigator[$i1k].ma_navigate(
          null,
          $aHTo,
          $aHFrom,
          async (...args) => {
            try {
              
              // @readme
              //  Wrap the "next" function so that if one of
              //  the navigators calls it, then this function
              //  stops processing the route / sending the bad
              //  route to all of the other navigators...
              //  Instead, the next function should have switched
              //  the path/hash/query, and should be re-routing
              //  meaning that another beforeEach should be
              //  about to execute, which should then operate
              //  on all of the navigators cleanly / once.
              
              // @switch
              if (Array.isArray(args) === true
              && args.length > 0) {
                
                // @assign
                $vBNextWasCalled = true;
                
                // @action
                try {
                  $aFNext(
                    args[0],
                    resolve,
                    ($e) => { reject(new $xCError($e.message)); return; }
                  );
                } catch ($e) {
                  throw new $xCError($e.message);
                }
                
              }
              
            } catch ($e) {
              reject(new $xCError($e.message));
              return;
            }
          }
        );
      } catch ($e) {
        throw new $xCError($e.message);
      }
      
    }
    
  }
  
  // @switch
  if ($vBNextWasCalled === false) {
    
    // @action
    try {
      $aFNext(
        {},
        resolve,
        ($e) => { reject(new $xCError($e.message)); return; }
      );
    } catch ($e) {
      throw new $xCError($e.message);
    }
    
  }
  
} catch ($e) {
  reject(new $xCError($e.message));
  return;
}})};
