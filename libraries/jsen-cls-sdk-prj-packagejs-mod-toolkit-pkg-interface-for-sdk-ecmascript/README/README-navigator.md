// @signature
const $ms_constructor = function (
  $oIJSENModInterfaceClsState,
  $oIJSENModInterfaceClsDOM,
  $oIJSENModInterfaceClsLoaderComponent,
  $aSLoaderTransitionDuration,
  $oHJSENDOMContextComponents
) {
try {
  
  // @assign
  let $rI = this;
  
  // @assign
  $rI.pIJSENModInterfaceClsState = $oIJSENModInterfaceClsState;
  
  // @assign
  $rI.pIJSENModInterfaceClsDOM = $oIJSENModInterfaceClsDOM;
  
  // @assign
  $rI.pIJSENModInterfaceClsLoaderComponent = $oIJSENModInterfaceClsLoaderComponent;
  
  // @assign
  $rI.pHJSENDOMContextComponents = $oHJSENDOMContextComponents;
  
  // @modify 20210404
  // @assign
  //  Every component module must populate the missing components with default
  //  handlers for resources / actions, since the components are used by the
  //  navigators for route handling (and the absence of default components
  //  would cause some routing to fail).
  //  Component modules must update this attribute to true
  //  after they've waited for the API / DOM to load its
  //  contract, and then have had a chance to populate
  //  any missing components with default components.
  $rI.pBJSENDOMContextComponents = false;
  
  // @readme
  //  To determine if a new context is loading...
  //  check if ($rI.pIContext === null) OR
  //  if ($rI.pAContextUpdates.length > 0).
  
  // @assign
  //  A reference to the current context.
  //  Set to $rI.pIJSENModInterfaceClsDOM.pIItemAPI,
  //  or any of the API's items, lists,
  //  item-actions, or list-actions.
  $rI.pIContext = null;
  
  // @assign
  //  Makes sure that pushed contexts are handled in order:
  //  - User loads home context,
  //  - User clicks on "posts" link,
  //  - Posts context begins loading, but the API is slow,
  //  - User clicks on "login" link,
  //  - Login context loads instantly,
  //  - Posts context finally loads and steals
  //    control of the focus and meta data from
  //    login context.
  $rI.pAContextUpdates = [];
  
  // @assign
  $rI.pBIsInitialNavigation = true;
  
  // @assign
  $rI.pBIsNavigating = true;
  
  // @assign
  $rI.pNNavigatingTransitionDuration = 0;
  
  // @switch
  if ($aSLoaderTransitionDuration.length > 0) {
    
    // @action
    try {
      $rI.pNNavigatingTransitionDuration = parseInt($aSLoaderTransitionDuration);
    } catch ($e) {
      throw new $xCError($e.message);
    }
    
  }
  
  // @assign
  Object.defineProperty($rI, 'state', {
    get: function () {
      return $rI.pIJSENModInterfaceClsState;
    }
  });
  
  // @assign
  Object.defineProperty($rI, 'dom', {
    get: function () {
      return $rI.pIJSENModInterfaceClsDOM;
    }
  });
  
  // @assign
  Object.defineProperty($rI, 'context', {
    get: function () {
      return $rI.pIContext;
    },
    set: function ($oI) {
      $rI.pIContext = $oI;
    }
  });
  
  // @assign
  Object.defineProperty($rI, 'booting', {
    get: function () {
      return $rI.pBIsInitialNavigation;
    }
  });
  
  // @assign
  Object.defineProperty($rI, 'navigating', {
    get: function () {
      return $rI.pBIsNavigating;
    }
  });
  
  // @return
  return;
  
} catch ($e) {
  throw new $xCError($e.message);
}};
