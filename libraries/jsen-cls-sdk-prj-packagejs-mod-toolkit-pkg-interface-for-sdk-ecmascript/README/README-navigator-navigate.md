// @signature
//  Load a new context based, optionally
//  taking into account the navigated-to
//  URL path.
//  Uses $rI.pAContextUpdates to make sure
//  that pushed contexts are handled in order:
//  - User loads home context,
//  - User clicks on "posts" link,
//  - Posts context begins loading, but the API is slow,
//  - User clicks on "login" link,
//  - Login context loads instantly,
//  - Posts context finally loads and steals
//    control of the focus and meta data from
//    login context.
// @readme $oIContext
//  The context to load directly. Should only
//  be one step from the current context (either
//  the parent or child).
//  - From item down to item-action,
//  - From item down to list,
//  - From item up to parent list
//  - From list down to list-action,
//  - From list up to parent item.
const $ma_navigate = function (
  $oIContext = null,
  $aHTo = null,
  $aHFrom = null,
  $aFNext = null,
  $aBScrollToTop = true
) {
return new Promise (async (resolve, reject) => {
try {
  
  // @readme
  //  !IMPORTANT FOOTGUN
  //  If you are having trouble with a forced browser redirection
  //  seemingly loading the page twice / calling the root created+mounted
  //  sequence 2 times... CHECK IF YOU ARE NAVIGATING BOTH IN
  //  mounted/created/watch AND ma_on_navigate!!!
  //  If so, then in mounted/created/watch you will want to check
  //  for $rI.pIJSENModInterfaceClsStateExtVueJSClsDOMNavigator.pBIsNavigating
  //  before calling ma_navigate.
  
  // @assign
  let $rI = this;
  
  // @modify 20240129
  // @switch
  if ($rI.pIJSENModInterfaceClsState
  && $rI.pIJSENModInterfaceClsState.pSEnableDebugging === '1') {
    
    // @prints
    console.log([
      '[routing] dom ('+$rI.pIJSENModInterfaceClsDOM.pSDOMName+') -> navigator -> ma_navigate', {
      'to': $aHTo,
      'from': $aHFrom,
      'context': $oIContext
    }]);
    
  }
  
  // @assign
  //  If the navigator is already navigating,
  //  then it has already waited for the
  //  transition duration animation to
  //  fully load, so there's no point
  //  in waiting again (but of course,
  //  also if it's already fully loaded...
  //  $rI.pAContextUpdates.length > 0)
  //  NOR if it is the initial load (if
  //  there is an ease-in animation on
  //  initial page load, google web
  //  crawler and other page/image
  //  generators will just draw a
  //  blank screen... so load the
  //  content immediately on first
  //  request).
  let $vNNavigatingTransitionDuration = ((
    $rI.pBIsInitialNavigation === true
    || (
      $rI.pBIsNavigating === true
      && $rI.pAContextUpdates.length > 0
    )
  ) ? 0 : $rI.pNNavigatingTransitionDuration);
  
  // @assign
  $rI.pBIsNavigating = true;
  
  // @action
  try {
    setTimeout(
      async () => {
        try {
          
          // @assign
          let $vBIntervalAwaitingMutex = false;
          
          // @assign
          let $rAIntervalAwaitingPointer = [];
          
          // @assign
          let $vNIntervalAwaiting;
          
          // @action
          try {
            $vNIntervalAwaiting = setInterval(
              async () => {
                try {
                  
                  // @narrow
                  try {
                    
                    // @switch
                    //  $rAIntervalAwaitingPointer is empty upon
                    //  initially receiving a context update request.
                    if ($rAIntervalAwaitingPointer.length === 0) {
                      
                      // @action
                      //  Always only a single element (at index [0]...
                      //  the javascript id of the interval). Cannot just
                      //  pust the interval id into $rI.pAContextUpdates,
                      //  because it would just be a copy of the Number,
                      //  and not a pointer / reference to it.
                      try {
                        $rAIntervalAwaitingPointer.push($vNIntervalAwaiting);
                      } catch ($e) {
                        throw new $xCError($e.message);
                      }
                      
                      // @action
                      try {
                        $rI.pAContextUpdates.push($rAIntervalAwaitingPointer);
                      } catch ($e) {
                        throw new $xCError($e.message);
                      }
                      
                    }
                    
                    // @modify 20210404
                    // @switch
                    //  DOM must be loaded ($rI.pIJSENModInterfaceClsDOM.pIItemAPI !== null),
                    //  OTHERWISE, this is a connection error / lag. We have to
                    //  allow the interface to load... so the router-view needs
                    //  to resolve temporarily while the DOM continues to attempt
                    //  to connect to the API.
                    //  Do NOT clear the interval.
                    if ($rI.pIJSENModInterfaceClsDOM.pIItemAPI === null
                    || $rI.pBJSENDOMContextComponents !== true) {
                      
                      // @assign
                      $rI.pIContext = $rI.pIJSENModInterfaceClsDOM.pIItemAPI;
                      
                      // @return
                      resolve();
                      return;
                      
                    } else {
                      
                      // @switch
                      //  The interval should be cleared and removed from the array
                      //  upon resolve/reject, so if this interval is still running,
                      //  $rI.pAContextUpdates should always at least have one element.
                      //  If conditions, in order:
                      //  - Must be processing this specific context push,
                      //  - Must not already be processing this specific
                      //    context push.
                      if ($rI.pAContextUpdates[0][0] === $vNIntervalAwaiting
                      && $vBIntervalAwaitingMutex === false) {
                        
                        // @assign
                        //  Prevent this context push from
                        //  being processed multiple times.
                        $vBIntervalAwaitingMutex = true;
                        
                        // @switch
                        if (typeof $oIContext === 'string') {
                          
                          // @action
                          //  If a path (string) is provided instead of a context,
                          //  then we're to use that path to "GET" the context through
                          //  a series of SELECTs along the chain from the API.
                          try {
                            $oIContext = await $rI.ma_path_to_context(
                              $oIContext,
                              $rI.pIContext
                            );
                          } catch ($e) {
                            throw new $xCError($e.message);
                          }
                          
                        }
                        
                        // @switch
                        //  The context must be a valid DOM context
                        //  object that belongs to this DOM instance.
                        if (typeof $oIContext === 'object'
                        && $oIContext !== null
                        && Array.isArray($oIContext) !== true
                        && (
                          (
                            (
                              $oIContext.hasOwnProperty('pIJSENModInterfaceClsDOM') === true
                              || 'pIJSENModInterfaceClsDOM' in $oIContext === true
                            )
                            && $oIContext.pIJSENModInterfaceClsDOM === $rI.pIJSENModInterfaceClsDOM
                          )
                          || (
                            (
                              $oIContext.hasOwnProperty('parent') === true
                              || 'parent' in $oIContext === true
                            )
                            && (
                              $oIContext.parent.hasOwnProperty('pIJSENModInterfaceClsDOM') === true
                              || 'pIJSENModInterfaceClsDOM' in $oIContext.parent === true
                            )
                            && $oIContext.parent.pIJSENModInterfaceClsDOM === $rI.pIJSENModInterfaceClsDOM
                          )
                        )) {
                          
                          // @assign
                          $rI.pIContext = $oIContext;
                          
                        } else {
                          
                          // @assign
                          //  Navigation via path is always processed through
                          //  the root / home route (deeper contexts can further
                          //  process and route requests to deeper contexts, such
                          //  as home processes /profiles/:username, sends to
                          //  profiles-list for profile GET query for :username,
                          //  and if username is found, then set context to
                          //  profile-item... etc.)
                          //  This prevents each component from having to have
                          //  instructions to route all requests... without processing
                          //  all routes at the home route, the "/" button in the top
                          //  left corner on all pages would mean that all pages would
                          //  need to have independent instructions to handle a push to
                          //  "/"... Even the back button would cause issues (as every
                          //  page would need a reference to all possible routes that
                          //  it could "go back" to).
                          $rI.pIContext = $rI.pIJSENModInterfaceClsDOM.pIItemAPI;
                          
                          // @switch
                          if (typeof $aHTo !== 'object'
                          || $aHTo === null
                          || Array.isArray($aHTo) !== false) {
                            
                            // @assign
                            $aHTo = {};
                            
                          }
                          
                          // @switch
                          if (typeof $aHFrom !== 'object'
                          || $aHFrom === null
                          || Array.isArray($aHFrom) !== false) {
                            
                            // @assign
                            $aHFrom = {};
                            
                          }
                          
                          // @switch
                          if (typeof $aFNext !== 'function') {
                            
                            // @assign
                            $aFNext = function () { return; };
                            
                          }
                          
                          // @action
                          try {
                            await $fa_resolve_context(
                              $rI,
                              $aHTo,
                              $aHFrom,
                              $aFNext
                            );
                          } catch ($e) {
                            throw new $xCError($e.message);
                          }
                          
                        }
                        
                        // @readme
                        //  The following order of actions is critical...
                        
                        // @action
                        try {
                          clearInterval($rI.pAContextUpdates[0][0]);
                        } catch ($e) {
                          throw new $xCError($e.message);
                        }
                        
                        // @action
                        try {
                          $rI.pAContextUpdates.shift();
                        } catch ($e) {
                          throw new $xCError($e.message);
                        }
                        
                        // @switch
                        if ($rI.pAContextUpdates.length < 1) {
                          
                          // @assign
                          $rI.pBIsNavigating = false;
                          
                          // @assign
                          $rI.pBIsInitialNavigation = false;
                          
                          // @switch
                          if ($aBScrollToTop === true) {
                            
                            // @modify 20221117
                            // // @action
                            // try {
                            //   $rI.pIJSENModInterfaceClsState.pIWindow.scrollTo(0, 0);
                            // } catch ($e) {
                            //   // @ignore
                            // }
                            
                            // @modify 20221112
                            // @narrow
                            try {
                              
                              // @assign
                              if (typeof $aHTo.hash === 'string'
                              && $aHTo.hash.trim().replace(/^(\#)+/g, '').split('#').shift().length > 0) {
                                
                                // @action
                                try {
                                  setTimeout(
                                    async () => {
                                      
                                      // @action
                                      try {
                                        $rI.pIJSENModInterfaceClsState.pIWindow.document.getElementById(
                                          $aHTo.hash.trim().replace(/^(\#)+/g, '').split('#').shift()
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
                                    $vNNavigatingTransitionDuration + 100
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
                          
                        }
                        
                        // @return
                        resolve();
                        return;
                        
                      }
                      
                    }
                    
                  } catch ($e) {
                    
                    // @readme
                    //  This context push failed, remove
                    //  it from the context updates array,
                    //  and clear its interval, THEN reject.
                    
                    // @assign
                    let $vNIndexOfAwaitingPointer = $rI.pAContextUpdates.indexOf($rAIntervalAwaitingPointer);
                    
                    // @switch
                    if ($vNIndexOfAwaitingPointer > -1) {
                      
                      // @action
                      try {
                        clearInterval($rI.pAContextUpdates[$vNIndexOfAwaitingPointer][0]);
                      } catch ($e) {
                        throw new $xCError($e.message);
                      }
                      
                      // @action
                      try {
                        $rI.pAContextUpdates.splice($vNIndexOfAwaitingPointer, 1);
                      } catch ($e) {
                        throw new $xCError($e.message);
                      }
                      
                    }
                    
                    // @switch
                    if ($rI.pAContextUpdates.length < 1) {
                      
                      // @assign
                      $rI.pBIsNavigating = false;
                      
                      // @assign
                      $rI.pBIsInitialNavigation = false;
                      
                      // @modify 20221117
                      // // @action
                      // try {
                      //   $rI.pIJSENModInterfaceClsState.pIWindow.scrollTo(0, 0);
                      // } catch ($e) {
                      //   // @ignore
                      // }
                      
                      // @modify 20221112
                      // @narrow
                      try {
                        
                        // @assign
                        if (typeof $aHTo.hash === 'string'
                        && $aHTo.hash.trim().replace(/^(\#)+/g, '').split('#').shift().length > 0) {
                          
                          // @action
                          try {
                            setTimeout(
                              async () => {
                                
                                // @action
                                try {
                                  $rI.pIJSENModInterfaceClsState.pIWindow.document.getElementById(
                                    $aHTo.hash.trim().replace(/^(\#)+/g, '').split('#').shift()
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
                              $vNNavigatingTransitionDuration + 100
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
                    
                    // @throws
                    throw new $xCError($e.message);
                    
                  }
                  
                } catch ($e) {
                  reject(new $xCError($e.message));
                  return;
                }
              },
              100
            );
          } catch ($e) {
            throw new $xCError($e.message);
          }
          
        } catch ($e) {
          reject(new $xCError($e.message));
          return;
        }
      },
      $vNNavigatingTransitionDuration
    );
  } catch ($e) {
    throw new $xCError($e.message);
  }
  
} catch ($e) {
  reject(new $xCError($e.message));
  return;
}})};
