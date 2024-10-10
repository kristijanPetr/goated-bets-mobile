'use strict';

////////////////////////////////////////////////////////////////////////////////

// @license Copyright 2020 PackageJS. All Rights Reserved. <https://packagejs.com/license>

//////////////////////////////////////////////////////////////////////////////////////////

// @import
import $xCError from 'error-ecmascript';



////////////////////////////////////////////////////////////////////////////////

// @signature
const $ms_constructor = function (
  $oIJSENModInterfaceClsDOM, // $oADOMSettings = [],
  $aBHistoryPushState = false,
  $aBDebug = false
) {
try {
  
  // @assign
  let $rI = this;
  
  // @assign
  $rI.pIJSENModInterfaceClsDOM = $oIJSENModInterfaceClsDOM;
  
  // @assign
  $rI.pBHistoryPushState = $aBHistoryPushState;
  
  // @assign
  $rI.pBDebug = $aBDebug;
  
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


// @signature
const $ma_navigate = function (
  $aVPath = null,
  $oIContext = null
) {
return new Promise (async (resolve, reject) => {
try {
  
  // @assign
  let $rI = this,
  $vIContextUpdate = {};
  
  // @assign
  let $vVPath = $aVPath;
  
  // @assign
  $rI.pAContextUpdates.push($vIContextUpdate);
  
  // @assign
  let $vNInterval = setInterval(async () => {
    
    // @switch
    if (($rI.pBIsNavigating === false
    || $rI.pBIsInitialNavigation === true)
    && $rI.pAContextUpdates[0] === $vIContextUpdate) {
      
      // @switch
      if ($rI.pBDebug === true) {
        
        // @prints
        console.log('[routing] dom ('+$rI.pIJSENModInterfaceClsDOM.name+') -> navigator -> ma_navigate', [
          $vVPath,
          $oIContext
        ]);
        
      }
      
      // @assign
      let $vBWasInitialNavigation = $rI.pBIsInitialNavigation;
      
      // @assign
      $rI.pBIsInitialNavigation = false;
      
      // @assign
      $rI.pBIsNavigating = true;
      
      // @narrow
      try {
        
        // @assign
        let $rIContext;
        
        // @switch
        if (typeof $aVPath === 'string') {
          
          // @assign
          let $vSAction = '';

          // @switch
          if ($aVPath.indexOf('#') > -1) {
            
            // @action
            try {
              $vSAction = $aVPath.split('#').pop();
            } catch ($e) {
              throw new $xCError($e.message)
            }
            
            // @action
            try {
              $aVPath = $aVPath.split('#').slice(0, -1).join('#');
            } catch ($e) {
              throw new $xCError($e.message)
            }
            
          }
          
          // @assign
          let $vAPathComponents = [];

          // @switch
          if ($aVPath !== '/') {
            
            // @action
            try {
              $vAPathComponents = $aVPath.replace(/^\/+/, '').replace(/\/+$/, '').split('/');
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
          $rIContext = (($aVPath.substr(0, 1) === '/' || $oIContext === null) ? $rI.pIJSENModInterfaceClsDOM.pIItemAPI : $oIContext);
          
          // @repeat
          for (
            let $i1i = 0,
            $i1n = $vAPathComponents.length;
            $i1i < $i1n;
            $i1i += 1
          ) {
            
            // @switch
            if ($rI.pBDebug === true
            && $vBIsValidPath === true) {
              
              // @prints
              console.log('[routing] dom ('+$rI.pIJSENModInterfaceClsDOM.name+') -> navigator -> ma_navigate', [
                $vVPath,
                $oIContext,
                $rIContext.name,
                $rIContext
              ]);
              
            }

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
              
              // @switch
              if ($rI.pBDebug === true) {
                
                // @prints
                console.log('[routing] dom ('+$rI.pIJSENModInterfaceClsDOM.name+') -> navigator -> ma_navigate', [
                  $vVPath,
                  $oIContext,
                  $rIContext.name,
                  $rIContext
                ]);
                
              }
              
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
          
        } else {
          
          // @checks
          if ($oIContext === null) {
            throw new $xCError('Improper context.');
          }
          
          // @assign
          $rIContext = $oIContext;
          
          // @assign
          $aVPath = $rI.pIJSENModInterfaceClsDOM.constructor.fs_build_context_path($rIContext);
          
        }
        
        // @switch
        if ($rI.pBDebug === true) {
          
          // @prints
          console.log('[routing] dom ('+$rI.pIJSENModInterfaceClsDOM.name+') -> navigator -> ma_navigate', [
            $vVPath,
            $oIContext,
            $rIContext.name,
            $rIContext
          ]);
          
        }
        
        // @switch
        if ($rI.pBHistoryPushState === true
        && $vBWasInitialNavigation === false) {
          
          // @action
          window.history.pushState({
            // 'shouldReload': true
          }, '', $aVPath);
          
        }
        
        // @assign
        $rI.pIContext = $rIContext;
        
        // @assign
        $rI.pBIsNavigating = false;
        
        // @action
        $rI.pAContextUpdates.shift();
        
        // @action
        clearInterval($vNInterval);
        
      } catch ($e) {
        
        // @assign
        $rI.pBIsNavigating = false;
        
        // @action
        $rI.pAContextUpdates.shift();
        
        // @action
        clearInterval($vNInterval);
        
        // @throws
        throw new $xCError($e.message);
        
      }
      
      // @return
      resolve();
      return;
      
    }
    
  }, 100);
  
} catch ($e) {
  reject(new $xCError($e.message));
  return;
}})};



////////////////////////////////////////////////////////////////////////////////

// @define
const $xC = $ms_constructor;

// @assign
$xC.prototype.ma_navigate = $ma_navigate;



////////////////////////////////////////////////////////////////////////////////

// @export
export default $xC;



////////////////////////////////////////////////////////////////////////////////
