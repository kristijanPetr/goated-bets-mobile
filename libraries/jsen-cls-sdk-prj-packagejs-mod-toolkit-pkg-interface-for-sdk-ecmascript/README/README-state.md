// @signature
const $ms_constructor = function (
  $aHConstructorArguments,
  $aHWebpackHackPreloadedComponents
) {
try {
  
  // @switch
  if (!(!!this.pJConstructorArguments)) {
    
    // @repeat
    for (
      let $i1k in $gJConstructorDefaults
    ) {
      
      // @switch
      if ($gJConstructorDefaults.hasOwnProperty($i1k) === true
      && $aHConstructorArguments.hasOwnProperty($i1k) !== true) {
        
        // @assign
        $aHConstructorArguments[$i1k] = $gJConstructorDefaults[$i1k];
        
      }
      
    }
    
    // @action
    try {
      $xMJSEN.fs_test(
        $gJConstructorArguments,
        $aHConstructorArguments,
        'IGNORE_EXTRANEOUS'
      );
    } catch ($e) {
      throw new $xCError($e.message);
    }
    
    // @assign
    this.pJConstructorArguments = $gJConstructorArguments;
    
  }

  // @assign
  let $rI = this;

  // @action
  try {
    $xCJSENModInterfaceClsState.call(
      $rI,
      $aHConstructorArguments
    );
  } catch ($e) {
    throw new $xCError($e.message);
  }
  
  // @repeat
  for (
    let $i1k in $rI.pHJSENDOMs
  ) {
    
    // @switch
    if ($rI.pHJSENDOMs.hasOwnProperty($i1k) === true) {
      
      
      
      // @repeat
      for (
        let $i2k in $rI.pHJSENDOMs[$i1k].pHWarningMessages
      ) {
        
        // @switch
        if ($rI.pHJSENDOMs[$i1k].pHWarningMessages.hasOwnProperty($i2k) === true) {
          
          // @repeat
          for (
            let $i3k in $rI.pHJSENDOMs[$i1k].pHWarningMessages[$i2k]
          ) {
            
            // @switch
            if ($rI.pHJSENDOMs[$i1k].pHWarningMessages[$i2k].hasOwnProperty($i3k) === true) {
              
              // @repeat
              for (
                let $i4k in $rI.pHJSENDOMs[$i1k].pHWarningMessages[$i2k][$i3k]
              ) {
                
                // @switch
                if ($rI.pHJSENDOMs[$i1k].pHWarningMessages[$i2k][$i3k].hasOwnProperty($i4k) === true) {
                  
                  // @repeat
                  for (
                    let $i5k in $rI.pHJSENDOMs[$i1k].pHWarningMessages[$i2k][$i3k][$i4k]
                  ) {
                    
                    // @switch
                    if ($rI.pHJSENDOMs[$i1k].pHWarningMessages[$i2k][$i3k][$i4k].hasOwnProperty($i5k) === true) {
                      
                      // @switch
                      if ($aHWebpackHackPreloadedComponents.hasOwnProperty($rI.pHJSENDOMs[$i1k].pHWarningMessages[$i2k][$i3k][$i4k][$i5k]) === true) {
                        
                        // @assign
                        $rI.pHJSENDOMs[$i1k].pHWarningMessages[$i2k][$i3k][$i4k][$i5k] = $aHWebpackHackPreloadedComponents[$rI.pHJSENDOMs[$i1k].pHWarningMessages[$i2k][$i3k][$i4k][$i5k]];
                        
                      } else {
                        
                        // @action
                        try {
                          $rI.pHJSENDOMs[$i1k].pHWarningMessages[$i2k][$i3k][$i4k][$i5k] = require($rI.pHJSENDOMs[$i1k].pHWarningMessages[$i2k][$i3k][$i4k][$i5k]).default;
                        } catch ($e) {
                          // @ignore
                          //  If this fails to include as a function,
                          //  then it is probably a static warning message.
                        }
                        
                      }
                      
                    }
                    
                  }
                  
                }
                
              }
              
            }
            
          }
          
        }
        
      }
      
      
      
      // @repeat
      for (
        let $i2k in $rI.pHJSENDOMs[$i1k].pHErrorMessages
      ) {
        
        // @switch
        if ($rI.pHJSENDOMs[$i1k].pHErrorMessages.hasOwnProperty($i2k) === true) {
          
          // @repeat
          for (
            let $i3k in $rI.pHJSENDOMs[$i1k].pHErrorMessages[$i2k]
          ) {
            
            // @switch
            if ($rI.pHJSENDOMs[$i1k].pHErrorMessages[$i2k].hasOwnProperty($i3k) === true) {
              
              // @repeat
              for (
                let $i4k in $rI.pHJSENDOMs[$i1k].pHErrorMessages[$i2k][$i3k]
              ) {
                
                // @switch
                if ($rI.pHJSENDOMs[$i1k].pHErrorMessages[$i2k][$i3k].hasOwnProperty($i4k) === true) {
                  
                  // @switch
                  if ($aHWebpackHackPreloadedComponents.hasOwnProperty($rI.pHJSENDOMs[$i1k].pHErrorMessages[$i2k][$i3k][$i4k]) === true) {
                    
                    // @assign
                    $rI.pHJSENDOMs[$i1k].pHErrorMessages[$i2k][$i3k][$i4k] = $aHWebpackHackPreloadedComponents[$rI.pHJSENDOMs[$i1k].pHErrorMessages[$i2k][$i3k][$i4k]];
                    
                  } else {
                    
                    // @action
                    try {
                      $rI.pHJSENDOMs[$i1k].pHErrorMessages[$i2k][$i3k][$i4k] = require($rI.pHJSENDOMs[$i1k].pHErrorMessages[$i2k][$i3k][$i4k]).default;
                    } catch ($e) {
                      // @ignore
                      //  If this fails to include as a function,
                      //  then it is probably a static error message.
                    }
                    
                  }
                  
                }
                
              }
              
            }
            
          }
          
        }
        
      }
      
      
      
    }
    
  }
  
  // @assign
  let $vHJSENDOMsComponent = {};
  
  // @assign
  let $vHJSENDOMsLoaderComponent = {};
  
  // @assign
  let $vHJSENDOMsContextComponents = {};
  
  // @assign
  let $vHJSENDOMsNavigator = {};
  
  // @repeat
  for (
    let $i1k in $aHConstructorArguments['$aHStateConfigureJSENDOMs']
  ) {
    
    // @switch
    //  If there is a configuration, then a DOM of the
    //  same name must already exist in the state's JSEN DOMs.
    if ($aHConstructorArguments['$aHStateConfigureJSENDOMs'].hasOwnProperty($i1k) === true
    && $rI.pHJSENDOMs.hasOwnProperty($i1k) === true) {
      
      // @assign
      $vHJSENDOMsComponent[$i1k] = null;
      
      // @assign
      $vHJSENDOMsLoaderComponent[$i1k] = null;
      
      // @assign
      $vHJSENDOMsContextComponents[$i1k] = {};
      
      // @switch
      if ($aHConstructorArguments['$aHStateConfigureJSENDOMs'][$i1k]['kSComponentModule'].length > 0) {
        
        // @switch
        if ($aHWebpackHackPreloadedComponents.hasOwnProperty($aHConstructorArguments['$aHStateConfigureJSENDOMs'][$i1k]['kSComponentModule']) === true) {
          
          // @assign
          $vHJSENDOMsComponent[$i1k] = $aHWebpackHackPreloadedComponents[$aHConstructorArguments['$aHStateConfigureJSENDOMs'][$i1k]['kSComponentModule']];
          
        } else {
          
          // @action
          try {
            $vHJSENDOMsComponent[$i1k] = require($aHConstructorArguments['$aHStateConfigureJSENDOMs'][$i1k]['kSComponentModule']).default;
          } catch ($e) {
            throw new $xCError($e.message);
          }
          
        }
        
        // @switch
        if ($aHConstructorArguments['$aHStateConfigureJSENDOMs'][$i1k]['kSLoaderComponentModule'].length > 0) {
          
          // @switch
          if ($aHWebpackHackPreloadedComponents.hasOwnProperty($aHConstructorArguments['$aHStateConfigureJSENDOMs'][$i1k]['kSLoaderComponentModule']) === true) {
            
            // @assign
            $vHJSENDOMsLoaderComponent[$i1k] = $aHWebpackHackPreloadedComponents[$aHConstructorArguments['$aHStateConfigureJSENDOMs'][$i1k]['kSLoaderComponentModule']];
            
          } else {
            
            // @action
            try {
              $vHJSENDOMsLoaderComponent[$i1k] = require($aHConstructorArguments['$aHStateConfigureJSENDOMs'][$i1k]['kSLoaderComponentModule']).default;
            } catch ($e) {
              throw new $xCError($e.message);
            }
            
          }
          
        }
        
        // @repeat
        for (
          let $i2k in $aHConstructorArguments['$aHStateConfigureJSENDOMs'][$i1k]['kHContractContextComponents']
        ) {
          
          // @switch
          if ($aHConstructorArguments['$aHStateConfigureJSENDOMs'][$i1k]['kHContractContextComponents'].hasOwnProperty($i2k) === true) {
            
            // @switch
            if ($aHWebpackHackPreloadedComponents.hasOwnProperty($aHConstructorArguments['$aHStateConfigureJSENDOMs'][$i1k]['kHContractContextComponents'][$i2k]) === true) {
              
              // @assign
              $vHJSENDOMsContextComponents[$i1k][$i2k] = $aHWebpackHackPreloadedComponents[$aHConstructorArguments['$aHStateConfigureJSENDOMs'][$i1k]['kHContractContextComponents'][$i2k]];
              
            } else {
              
              // @action
              try {
                $vHJSENDOMsContextComponents[$i1k][$i2k] = require($aHConstructorArguments['$aHStateConfigureJSENDOMs'][$i1k]['kHContractContextComponents'][$i2k]).default;
              } catch ($e) {
                
                // @prints
                console.warn('Warning: Failed to load component ("'+$aHConstructorArguments['$aHStateConfigureJSENDOMs'][$i1k]['kHContractContextComponents'][$i2k]+'") for key ("'+$i2k+'"), removing from DOM ("'+$i1k+'").');
                console.log('');
                
                // @modify 20210330
                //  Gracefully handle missing components.
                try {
                  delete $vHJSENDOMsContextComponents[$i1k][$i2k];
                } catch ($e) {
                  // @ignore
                }
                
              }
              
            }
            
          }
          
        }
        
        // @action
        try {
          $vHJSENDOMsNavigator[$i1k] = new $xCJSENModInterfaceClsStateExtVueJSClsDOMNavigator(
            $rI,
            $rI.pHJSENDOMs[$i1k],
            $vHJSENDOMsLoaderComponent[$i1k],
            $aHConstructorArguments['$aHStateConfigureJSENDOMs'][$i1k]['kSLoaderTransitionDuration'],
            $vHJSENDOMsContextComponents[$i1k]
          );
        } catch ($e) {
          throw new $xCError($e.message);
        }
        
      }
      
    }
    
  }
  
  // @assign
  $rI.pHJSENDOMsComponent = $vHJSENDOMsComponent;
  
  // @assign
  $rI.pHJSENDOMsNavigator = $vHJSENDOMsNavigator;
  
  // @assign
  Object.defineProperty($rI, 'navigators', {
    get: function () {
      return $rI.pHJSENDOMsNavigator;
    }
  });
  
  // @return
  return;
  
} catch ($e) {
  throw new $xCError($e.message);
}};
