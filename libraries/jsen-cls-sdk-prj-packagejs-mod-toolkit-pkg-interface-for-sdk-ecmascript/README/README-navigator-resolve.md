// @signature
//  Calls ma_on_navigate on all of
//  its $rI.pHJSENDOMContextComponents
//  that fall along the route (each component
//  should set the next context if there is one
//  along the path, to reaching the terminating
//  component...
//  Such as profiles/:x/posts/:y should
//  start at the root context... move into
//  profiles.list component, then hit
//  the profiles.item.GET call first, then
//  shift context to profiles.item, then
//  move into the profiles/posts.list, then
//  attempt the posts.item.GET call, and
//  shift context to posts.item).
// @readme $aFNext
//  https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards
//  next: Function: this function must be called to resolve the hook. The
//  action depends on the arguments provided to next:
//  - next(): move on to the next hook in the pipeline. If no hooks are
//    left, the navigation is confirmed.
//  - next(false): abort the current navigation. If the browser URL was
//    changed (either manually by the user or via back button), it will
//    be reset to that of the from route.
//  - next('/') or next({ path: '/' }): redirect to a different location.
//    The current navigation will be aborted and a new one will be started.
//    You can pass any location object to next, which allows you to specify
//    options like replace: true, name: 'home' and any option used in
//    router-link's to prop or router.push
//  - next(error): (2.4.0+) if the argument passed to next is an instance
//    of Error, the navigation will be aborted and the error will be passed
//    to callbacks registered via router.onError().
const $fa_resolve_context = function (
  $oIJSENModInterfaceClsStateExtVueJSClsDOMNavigator,
  $aHTo,
  $aHFrom,
  $aFNext
) {
return new Promise (async (resolve, reject) => {
try {
  
  // @assign
  //  Calling a component's ma_on_navigate method gives
  //  that component an opportunity to update the DOM's
  //  context (usually to the next context in the path
  //  if a path is being navigated)... if there is an
  //  error, or the resource is not found, or if the
  //  resource is restricted, then the component should
  //  just load a shared component displaying the warning
  //  or error message instead of throwing a redirect.
  //  ...there's no need to worry that the context was
  //  changed by another request, essentially breaking
  //  this chain, because $rI.pAContextUpdates ensures
  //  that each context request is fully navigated before
  //  allowing another context request to be processed.
  let $rIContext = $oIJSENModInterfaceClsStateExtVueJSClsDOMNavigator.pIContext;
  
  // @assign
  //  Get the component name from the context.
  //  Lists: $dom:list/somedb.sometable,somedb.someothertable
  //  List actions: $dom:list.GET:/somedb.sometable,somedb.someothertable
  //  Custom list actions: $dom:list.GET:/somedb.sometable,somedb.someothertable/dosomething
  //  Items: $dom:item/somedb.sometable,somedb.someothertable
  //  Item actions: $dom:item.GET:/somedb.sometable,somedb.someothertable
  //  Custom item actions: $dom:item.GET:/somedb.sometable,somedb.someothertable/dosomething
  //  Root: $dom:root
  //  Root actions: $dom:root.POST/register
  //  No name: $dom:none
  let $vSComponentName = $rIContext.pSComponentName;
  
  // @modify 20240129
  // @switch
  if ($oIJSENModInterfaceClsStateExtVueJSClsDOMNavigator
  && $oIJSENModInterfaceClsStateExtVueJSClsDOMNavigator.pIJSENModInterfaceClsState
  && $oIJSENModInterfaceClsStateExtVueJSClsDOMNavigator.pIJSENModInterfaceClsState.pSEnableDebugging === '1') {
    
    // @prints
    console.log([
      '[routing] dom ('+$oIJSENModInterfaceClsStateExtVueJSClsDOMNavigator.pIJSENModInterfaceClsDOM.pSDOMName+') -> navigator -> fa_resolve_context', {
      'to': $aHTo,
      'from': $aHFrom,
      'componentName': $vSComponentName
    }]);
    
  }
  
  // @assign
  let $rHContextComponents = $oIJSENModInterfaceClsStateExtVueJSClsDOMNavigator.pHJSENDOMContextComponents;
  
  // @switch
  //  Get the custom component for this context (otherwise
  //  the default JSEN DOM component will be loaded, displaying
  //  default information about this context)... and then call
  //  its ma_on_navigate method if it has one.
  if ($rHContextComponents.hasOwnProperty($vSComponentName)
  // @modify 20230331
  //  In React, these are function classes, not objects (so remove this check from both vue and react)...
  // && typeof $rHContextComponents[$vSComponentName] === 'object'
  // && $rHContextComponents[$vSComponentName] !== null
  // && Array.isArray($rHContextComponents[$vSComponentName]) !== true
  && (
    $rHContextComponents[$vSComponentName].hasOwnProperty('ma_on_navigate')
    || 'ma_on_navigate' in $rHContextComponents[$vSComponentName] === true
  )) {
    
    // @modify 20240129
    // @switch
    if ($oIJSENModInterfaceClsStateExtVueJSClsDOMNavigator
    && $oIJSENModInterfaceClsStateExtVueJSClsDOMNavigator.pIJSENModInterfaceClsState
    && $oIJSENModInterfaceClsStateExtVueJSClsDOMNavigator.pIJSENModInterfaceClsState.pSEnableDebugging === '1') {
      
      // @prints
      console.log([
        '[routing] dom ('+$oIJSENModInterfaceClsStateExtVueJSClsDOMNavigator.pIJSENModInterfaceClsDOM.pSDOMName+') -> navigator -> fa_resolve_context -> component ('+$vSComponentName+') -> ma_on_navigate', {
        'to': $aHTo,
        'from': $aHFrom
      }]);
      
    }
    
    // @action
    try {
      await $rHContextComponents[$vSComponentName].ma_on_navigate(
        $oIJSENModInterfaceClsStateExtVueJSClsDOMNavigator,
        $aHTo,
        $aHFrom,
        $aFNext
      );
    } catch ($e) {
      throw new $xCError($e.message);
    }
    
  } else {
    
    // @prints
    //console.log('Component ("'+$vSComponentName+'") is not defined.');
    
  }
  
  // @switch
  //  If ma_on_navigate was called, and it changed the
  //  $oIJSENModInterfaceClsStateExtVueJSClsDOMNavigator.pIContext,
  //  then call this function again. This function will continue to
  //  be called recursively until the terminating context is resolved.
  if ($rIContext !== $oIJSENModInterfaceClsStateExtVueJSClsDOMNavigator.pIContext) {
    
    // @action
    try {
      await $fa_resolve_context(
        $oIJSENModInterfaceClsStateExtVueJSClsDOMNavigator,
        $aHTo,
        $aHFrom,
        $aFNext
      );
    } catch ($e) {
      throw new $xCError($e.message);
    }
    
  }
  
  // @return
  resolve();
  return;
  
} catch ($e) {
  reject(new $xCError($e.message));
  return;
}})};
