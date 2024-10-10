// @assign
$rI.pHWatchContexts = new WeakMap();

// @assign
Object.defineProperty($rI, 'watchContexts', {
  get: function () {
    return $rI.pHWatchContexts;
  }
});

// @signature
//  You can call this function like:
//  await $rI.navigator.ma_watch_call(
//    $rI.navigator.context,
//    $rI.navigator.context.ms_reload.bind($rI.navigator.context),
//    'resources'
//  );
//  or
//  await $rI.navigator.ma_watch_call(
//    $rI.navigator.context,
//    (async () => {
//      $rI.navigator.context.ms_reload('resources');
//    })
//  );
//  Or submit an array of affected contexts:
//  await $rI.navigator.ma_watch_call(
//    [$rI.contextAction, $rI.contextAction.parent]
//  ...
//  You would supply both, because the action itself might
//  not be a child component of the parent context (dynamically
//  tracking a bunch of different actions from a root context
//  for status progress / toast) in which case you would want
//  to also make sure that the action's parent context is updated
//  as well (if appropriate - list items added, item attributes
//  modified, -- probably via ma_submit, but not ms_reset -- etc.).
let $ma_watch_call = function (
  $oVContext,
  $oFMethod,
  ...args
) {
return new Promise (async (resolve, reject) => {
try {
  
  // @assign
  let $rI = this;
  
  // @assign
  let $vVResponse,
  $vIError,
  $vBError = false;
  
  // @action
  try {
    $vVResponse = await $oFMethod(...args);
  } catch ($e) {
    $vIError = $e;
    $vBError = true;
  }
  
  // @assign
  setTimeout(() => {
    
    // @assign
    let $vAContexts = ((Array.isArray($oVContext) === true) ? $oVContext : [$oVContext]);
    
    // @repeat
    for (
      let $i1i = 0,
      $i1n = $vAContexts.length;
      $i1i < $i1n;
      $i1i += 1
    ) {
      
      // @assign
      let $vIContext = $vAContexts[$i1i];
      
      // @switch
      if ($rI.pHWatchContexts.has($vIContext) === true) {
        
        // @action
        try {
          $rI.pHWatchContexts.get($vIContext).forEach(($vIComponent) => { $vIComponent.forceUpdate(); });
        } catch ($e) {
          // @ignore
        }
        
      }
      
    }
    
  });
  
  // @checks
  if ($vBError === true) {
    throw new $xCError($vIError.message);
  }
  
  // @return
  resolve($vVResponse);
  return;
  
} catch ($e) {
  reject(new $xCError($e.message));
  return;
}})};


// @signature
//  Same as above, but does not need to be called within an async function.
let $ms_watch_call = function (
  $oVContext,
  $oFMethod,
  ...args
) {
try {
  
  // @assign
  let $rI = this;
  
  // @assign
  let $vVResponse,
  $vIError,
  $vBError = false;
  
  // @action
  try {
    $vVResponse = $oFMethod(...args);
  } catch ($e) {
    $vIError = $e;
    $vBError = true;
  }
  
  // @assign
  setTimeout(() => {
    
    // @assign
    let $vAContexts = ((Array.isArray($oVContext) === true) ? $oVContext : [$oVContext]);
    
    // @repeat
    for (
      let $i1i = 0,
      $i1n = $vAContexts.length;
      $i1i < $i1n;
      $i1i += 1
    ) {
      
      // @assign
      let $vIContext = $vAContexts[$i1i];
      
      // @switch
      if ($rI.pHWatchContexts.has($vIContext) === true) {
        
        // @action
        try {
          $rI.pHWatchContexts.get($vIContext).forEach(($vIComponent) => { $vIComponent.forceUpdate(); });
        } catch ($e) {
          // @ignore
        }
        
      }
      
    }
    
  });
  
  // @checks
  if ($vBError === true) {
    throw new $xCError($vIError.message);
  }
  
  // @return
  return $vVResponse;
  
} catch ($e) {
  throw new $xCError($e.message);
}};


// @signature
let $ms_watch = function (
  $oIComponent,
  $oIContext
) {
try {
  
  // @assign
  let $rI = this;
  
  // @switch
  if ($rI.pHWatchContexts.has($oIContext) !== true) {
    
    // @assign
    //  This WeakMap uses dom contexts for keys.
    //  Each context stores a set of UI components it needs to rerender.
    $rI.pHWatchContexts.set($oIContext, new Set());;
    
  }
  
  // @assign
  let $rHWatchingContext = $rI.pHWatchContexts.get($oIContext);
  
  // @switch
  if ($rHWatchingContext.has($oIComponent) !== true) {
    
    // @assign
    //  Add this UI component to the context's Set.
    //  When this context's data is updated, we'll rerender this UI component.
    $rHWatchingContext.add($oIComponent);
  
  }
  
  // @return
  return $oIContext;
  
} catch ($e) {
  throw new $xCError($e.message);
}};


// @signature
//  You do not need to support multiple components watching the same context,
//  since any "custom" subcomponents watching the parent's context will
//  automatically update when the parent component itself updates (because
//  there is already a watcher registered for the same context for it too).
let $ms_unwatch = function (
  $oIComponent,
  $oIContext
) {
try {
  
  // @assign
  let $rI = this;
  
  // @switch
  if ($rI.pHWatchContexts.has($oIContext) === true) {
  
    // @assign
    let $rHWatchingContext = $rI.pHWatchContexts.get($oIContext);
  
    // @switch
    if ($rHWatchingContext.has($oIComponent) === true) {
      
      // @action
      //  This component is no longer watching this context,
      //  so the context can remove this component from its Set.
      try {
        $rHWatchingContext.delete($oIComponent);
      } catch ($e) {
        throw new $xCError($e.message);
      }
  
      // @switch
      if ($rHWatchingContext.size < 1) {
      
        // @action
        //  This context is no longer being watched by any components,
        //  and can be cleaned up.
        try {
          $rI.pHWatchContexts.delete($oIContext);
        } catch ($e) {
          throw new $xCError($e.message);
        }
      
      }
  
    }
  
  }
  
  // @return
  return;
  
} catch ($e) {
  throw new $xCError($e.message);
}};
