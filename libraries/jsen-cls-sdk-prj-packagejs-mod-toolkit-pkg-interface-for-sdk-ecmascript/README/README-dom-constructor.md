// @signature
// @readme $aSLocalStorageIdentifier
//  This is specified because you could have 2 instances
//  of the same JSEN API URL with different authorizations
//  that should both resume their own respective AUTHORIZATION
//  states... such as allowing a user to be logged into multiple
//  multiple accounts on the same page (similar to gmail accounts
//  or twitter account management dashboards / account switchers).
// @readme $oIJSENModInterfaceClsDOM
//  If this API shares an authentication mechanism
//  with another API, only the other API has to have
//  the login/register etc. functions defined. Once
//  that API's DOM has been constructed (such as an
//  application with basic features), when constructing
//  another API's DOM (such as a blog or customer support
//  forum), then point this.pHAuthorization to the
//  application API's $oIJSENModInterfaceClsDOM.pHAuthorization.
//  That way, requests to the blog, such as adding a
//  comment, will use the "main" authorization token.
//  The blog API will only, then, need to include the
//  main application api, and connect all authorized-type
//  requests through to it before allowing actions such
//  as commenting. That way it will not ever
//  need to have its own user system.
const $ms_constructor = function (
  $aSDOMName,
  $aSJSENAPIURL,
  $aSJSENAPIVersionFormat = '',
  $aHWarningMessages = {},
  $aHErrorMessages = {},
  $aSLocalStorageIdentifier = '',
  $oIJSENModInterfaceClsDOMRootAuthorization = null,
  $oIJSENModInterfaceClsDOMItemDirectory = null,
  $oAJSENAPIURLAlternatives = [],
  $aHStaticCache = {},
  $aIJSENModInterfaceClsStateImmutableInfo = {}
) {
try {
  
  // @checks
  //  Action warnings are loaded into an array, with a
  //  warning for each field that is in violation, and
  //  why (only one warning per field). The custom warning
  //  object argument passed into this constructor can either
  //  contain additional details about the specific
  //  warning / message (string)...
  //  such as, for field 'name' warning 'required'
  //  "Please enter your full name, thanks!" instead of
  //  the default "Field 'name' is required."...
  //  OR, a custom function, that passes in a pointer to
  //  the field, and allows you to construct a very detailed
  //  message based on your own processing of the information
  //  (generally most helpful for string field regex failures
  //  or number place errors, both under warning 'format').
  //  - [$rI.pSRoute, $rI.pSAction, $rI.pSField, 'maxlength']
  //  - [$rI.pSRoute, $rI.pSAction, $rI.pSField, 'format']
  //  - [$rI.pSRoute, $rI.pSAction, $rI.pSField, 'required']
  //  - [$rI.pSRoute, $rI.pSAction, $rI.pSField, '>']
  //  - [$rI.pSRoute, $rI.pSAction, $rI.pSField, '>=']
  //  - [$rI.pSRoute, $rI.pSAction, $rI.pSField, '<']
  //  - [$rI.pSRoute, $rI.pSAction, $rI.pSField, '<=']
  if (typeof $aHWarningMessages !== 'object'
  || $aHWarningMessages === null
  || Array.isArray($aHWarningMessages) !== false) {
    throw new $xCError();
  }
  
  // @repeat
  //  Actual testing of the route key / action name / field name
  //  format is not performed... nor is checking if the route exists
  //  in the API contract once it's retrieved.
  //  Instead, if a key in $aHWarningMessages is missing from the
  //  API contract, then the custom warnings just won't be used.
  //  This object will not automatically update, like all of the
  //  other things in the JSEN stack, because this is a UI implementation
  //  only, similar to a template, which is dependent on the interface logic
  //  itself. Maybe in one interface you want to display one error message
  //  but in another interface using the exact same JSEN API contract, you
  //  might want to display an entirely different error message for the same
  //  route/action/field warning. It wouldn't make sense to clutter up the
  //  JSEN API contract with that information.
  for (
    let $i1k in $aHWarningMessages
  ) {
    
    // @switch
    if ($aHWarningMessages.hasOwnProperty($i1k) === true) {
      
      // @checks
      //  Routes always start with a slash...
      //  Routes could technically be validated to
      //  match list/item type route key strings, but
      //  that's a bit unnecessary here (and would probably
      //  create an unintended bug if the format in the backend
      //  was ever changed to allow more characters, but forgot
      //  to update the regex in this test).
      if ($i1k.substr(0, 1) !== '/') {
        throw new $xCError();
      }
      
      // @repeat
      for (
        let $i2k in $aHWarningMessages[$i1k]
      ) {
        
        // @switch
        if ($aHWarningMessages[$i1k].hasOwnProperty($i2k) === true) {
          
          // @checks
          //  Action names always start with the method.
          if ([
            'DELETE',
            'GET',
            'PATCH',
            'POST',
            'PUT'
          ].includes($i2k.split(':')[0]) !== true) {
            throw new $xCError();
          }
          
          // @checks
          //  ...optionally split by a colon with the
          //  custom action name prefixed with a slash.
          if ($i2k.split(':').length > 1
          && (
            $i2k.split(':').length !== 2
            || $i2k.split(':').pop().substr(0, 1) !== '/'
          )) {
            throw new $xCError();
          }
          
          // @repeat
          for (
            let $i3k in $aHWarningMessages[$i1k][$i2k]
          ) {
            
            // @switch
            if ($aHWarningMessages[$i1k][$i2k].hasOwnProperty($i3k) === true) {
              
              // @readme
              //  Field names aren't validated in this object at all.
              
              // @repeat
              for (
                let $i4k in $aHWarningMessages[$i1k][$i2k][$i3k]
              ) {
                
                // @switch
                if ($aHWarningMessages[$i1k][$i2k][$i3k].hasOwnProperty($i4k) === true) {
                  
                  // @checks
                  //  Action names always start with the method.
                  if ([
                    'maxlength',
                    'format',
                    'required',
                    '>',
                    '>=',
                    '<',
                    '<='
                  ].includes($i4k) !== true) {
                    throw new $xCError();
                  }
                  
                  // @checks
                  if (typeof $aHWarningMessages[$i1k][$i2k][$i3k][$i4k] !== 'string'
                  && typeof $aHWarningMessages[$i1k][$i2k][$i3k][$i4k] !== 'function') {
                    throw new $xCError();
                  }
                  
                }
                
              }
              
            }
            
          }
          
        }
        
      }
      
    }
    
  }
  
  // @checks
  //  The action's pHStatus.kBFailure field, when set to
  //  true, will display a toast message (by default) with
  //  the standard error message for the HTTP status code
  //  in pHStatus.kNError (500 by default).
  //  If you, instead, wish to display different text for
  //  the error, then you can supply a message (string)
  //  OR a custom function, that takes a pointer to the
  //  action, so that you can do additional probing of
  //  the request object to see what caused the error
  //  before outputting a custom error message response.
  //  - [$rI.pSRoute, $rI.pSAction, '400']
  //  - [$rI.pSRoute, $rI.pSAction, '401']
  //  ...
  //  - [$rI.pSRoute, $rI.pSAction, '500']
  //  ...
  //  - [$rI.pSRoute, $rI.pSAction, '599']
  if (typeof $aHErrorMessages !== 'object'
  || $aHErrorMessages === null
  || Array.isArray($aHErrorMessages) !== false) {
    throw new $xCError();
  }
  
  // @repeat
  //  Actual testing of the route key / action name
  //  format is not performed... nor is checking if
  //  the route exists in the API contract once it's
  //  retrieved.
  //  Instead, if a key in $aHErrorMessages is missing from the
  //  API contract, then the custom warnings just won't be used.
  //  This object will not automatically update, like all of the
  //  other things in the JSEN stack, because this is a UI implementation
  //  only, similar to a template, which is dependent on the interface logic
  //  itself. Maybe in one interface you want to display one error message
  //  but in another interface using the exact same JSEN API contract, you
  //  might want to display an entirely different error message for the same
  //  route/action/field warning. It wouldn't make sense to clutter up the
  //  JSEN API contract with that information.
  for (
    let $i1k in $aHErrorMessages
  ) {
    
    // @switch
    if ($aHErrorMessages.hasOwnProperty($i1k) === true) {
      
      // @checks
      //  Routes always start with a slash...
      //  Routes could technically be validated to
      //  match list/item type route key strings, but
      //  that's a bit unnecessary here (and would probably
      //  create an unintended bug if the format in the backend
      //  was ever changed to allow more characters, but forgot
      //  to update the regex in this test).
      if ($i1k.substr(0, 1) !== '/') {
        throw new $xCError();
      }
      
      // @repeat
      for (
        let $i2k in $aHErrorMessages[$i1k]
      ) {
        
        // @switch
        if ($aHErrorMessages[$i1k].hasOwnProperty($i2k) === true) {
          
          // @checks
          //  Action names always start with the method.
          if ([
            'DELETE',
            'GET',
            'PATCH',
            'POST',
            'PUT'
          ].includes($i2k.split(':')[0]) !== true) {
            throw new $xCError();
          }
          
          // @checks
          //  ...optionally split by a colon with the
          //  custom action name prefixed with a slash.
          if ($i2k.split(':').length > 1
          && (
            $i2k.split(':').length !== 2
            || $i2k.split(':').pop().substr(0, 1) !== '/'
          )) {
            throw new $xCError();
          }
          
          // @repeat
          for (
            let $i3k in $aHErrorMessages[$i1k][$i2k]
          ) {
            
            // @switch
            if ($aHErrorMessages[$i1k][$i2k].hasOwnProperty($i3k) === true) {
              
              // @checks
              if (/^(4|5)[0-9]{2}$/.test($i3k) !== true) {
                throw new $xCError();
              }
              
              // @checks
              if (typeof $aHErrorMessages[$i1k][$i2k][$i3k] !== 'string'
              && typeof $aHErrorMessages[$i1k][$i2k][$i3k] !== 'function') {
                throw new $xCError();
              }
              
            }
            
          }
          
        }
        
      }
      
    }
    
  }
  
  // @switch
  if (typeof $aSDOMName !== 'string'
  || $aSDOMName.length < 1) {
    throw new $xCError();
  }
  
  // @checks
  if (typeof $aSJSENAPIURL !== 'string'
  || $aSJSENAPIURL.length < 1) {
    throw new $xCError();
  }
  
  // @checks
  if (Array.isArray($oAJSENAPIURLAlternatives) !== true) {
    throw new $xCError();
  }
  
  // @checks
  if (typeof $aSJSENAPIVersionFormat !== 'string') {
    throw new $xCError();
  }
  
  // @checks
  if (typeof $aSLocalStorageIdentifier !== 'string') {
    throw new $xCError();
  }
  
  // @checks
  //  If this is a reference to another DOM, then
  //  make sure it is another DOM instance, since
  //  it must share its pHAuthorization attribute.
  if ($oIJSENModInterfaceClsDOMRootAuthorization !== null
  && (
    typeof $oIJSENModInterfaceClsDOMRootAuthorization !== 'object'
    || Array.isArray($oIJSENModInterfaceClsDOMRootAuthorization) !== false
    || $oIJSENModInterfaceClsDOMRootAuthorization.hasOwnProperty('pHAuthorization') !== true
    || typeof $oIJSENModInterfaceClsDOMRootAuthorization.pHAuthorization !== 'object'
    || $oIJSENModInterfaceClsDOMRootAuthorization.pHAuthorization === null
    || Array.isArray($oIJSENModInterfaceClsDOMRootAuthorization.pHAuthorization) !== false
    || $oIJSENModInterfaceClsDOMRootAuthorization.pHAuthorization.hasOwnProperty('+') !== true
    || typeof $oIJSENModInterfaceClsDOMRootAuthorization.pHAuthorization['+'] !== 'string'
    || $oIJSENModInterfaceClsDOMRootAuthorization.pHAuthorization.hasOwnProperty('=') !== true
    || typeof $oIJSENModInterfaceClsDOMRootAuthorization.pHAuthorization['='] !== 'string'
  )) {
    throw new $xCError();
  }
  
  // @checks
  //  If this is a reference to another DOM instance,
  //  then the local storage identifier for this DOM
  //  instance should NOT be set, since it should NOT
  //  store a separate entry in local storage for the
  //  same authorization token.
  if ($oIJSENModInterfaceClsDOMRootAuthorization !== null
  && $aSLocalStorageIdentifier.length > 0) {
    throw new $xCError();
  }
  
  // @checks
  //  If this is a reference to another DOM, then
  //  make sure it is another DOM instance, since
  //  it must share its pHItemDirectory attribute.
  if ($oIJSENModInterfaceClsDOMItemDirectory !== null
  && (
    typeof $oIJSENModInterfaceClsDOMItemDirectory !== 'object'
    || Array.isArray($oIJSENModInterfaceClsDOMItemDirectory) !== false
    || $oIJSENModInterfaceClsDOMItemDirectory.hasOwnProperty('pHItemDirectory') !== true
    || typeof $oIJSENModInterfaceClsDOMItemDirectory.pHItemDirectory !== 'object'
    || $oIJSENModInterfaceClsDOMItemDirectory.pHItemDirectory === null
    || Array.isArray($oIJSENModInterfaceClsDOMItemDirectory.pHItemDirectory) !== false
  )) {
    throw new $xCError();
  }
  
  // @readme
  //  If $oIJSENModInterfaceClsDOMRootAuthorization.pHAuthorization is null
  //  $aSLocalStorageIdentifier CAN be empty,
  //  since a DOM instance's authorization
  //  token does NOT have to persist in
  //  local storage if that functionality
  //  is not necessary for that API.
  
  // @assign
  let $rI = this;
  
  // @assign
  $rI.pHStaticCache = $aHStaticCache;
  
  // @assign
  $rI.pIJSENModInterfaceClsStateImmutableInfo = ((typeof $aIJSENModInterfaceClsStateImmutableInfo === 'object'
  && $aIJSENModInterfaceClsStateImmutableInfo !== null
  && Array.isArray($aIJSENModInterfaceClsStateImmutableInfo) !== true) ? $aIJSENModInterfaceClsStateImmutableInfo : {});
  
  // @assign
  $rI.pHWarningMessages = $aHWarningMessages;
  
  // @assign
  $rI.pHErrorMessages = $aHErrorMessages;
  
  // @assign
  $rI.pSDOMName = $aSDOMName;
  
  // @assign
  $rI.pBUsesOpenAPIContract = (($aSJSENAPIURL.substr(-13) === '/openapi.json') ? true : false);
  
  // @assign
  $rI.pSJSENAPIURL = (($rI.pBUsesOpenAPIContract === true) ? $aSJSENAPIURL.slice(0, -13) : $aSJSENAPIURL);
  
  // @assign
  $rI.pAJSENAPIURLAlternatives = [$rI.pSJSENAPIURL, ...$oAJSENAPIURLAlternatives];
  
  // @assign
  $rI.pSJSENAPIVersionFormat = $aSJSENAPIVersionFormat;
  
  // @assign
  $rI.pSJSENAPIVersion = '';
  
  // @assign
  $rI.pBJSENAPIVersionIsIncompatible = false;
  
  // @assign
  $rI.pJJSENAPIContract = null;
  
  // @assign
  $rI.pBJSENAPIContractConnectionMutex = false;
  
  // @assign
  $rI.pBJSENAPIContractConnectionError = false;
  
  // @assign
  $rI.pJJSENDOMContract = null;
  
  // @assign
  $rI.pIItemAPI = null;
  
  // @assign
  $rI.pHItemDirectory = (($oIJSENModInterfaceClsDOMItemDirectory !== null) ?
  $oIJSENModInterfaceClsDOMItemDirectory.pHItemDirectory :
  {});
  
  // @assign
  $rI.pHAuthorization = null;
  
  // @assign
  $rI.pSLocalStorageIdentifier = $aSLocalStorageIdentifier;
  
  // @assign
  //  This length MUST be 0 if this DOM manages its own authorization.
  $rI.pSRootStorageIdentifier = '';
  
  // @switch
  if ($oIJSENModInterfaceClsDOMRootAuthorization !== null) {
    
    // @assign
    $rI.pHAuthorization = $oIJSENModInterfaceClsDOMRootAuthorization.pHAuthorization;
    
    // @assign
    $rI.pSRootStorageIdentifier = $oIJSENModInterfaceClsDOMRootAuthorization.pSLocalStorageIdentifier;
    
  }
  
  // @switch
  //  If there was an issue getting a reference
  //  to the authorization property of the root
  //  auth DOM (if specified), then we'll end
  //  up in here.
  if ($rI.pHAuthorization === null) {
    
    // @assign
    $rI.pHAuthorization = {
      '+': '',
      '=': ''
    };
    
  }
  
  // @assign
  $rI.pBIsLoaded = false;
  
  // @assign
  Object.defineProperty($rI, 'name', {
    get: function () {
      return $rI.pSDOMName;
    }
  });
  
  // @assign
  Object.defineProperty($rI, 'auth', {
    get: function () {
      return $rI.pHAuthorization;
    }
  });
  
  // @assign
  Object.defineProperty($rI, 'info', {
    get: function () {
      return $rI.pIJSENModInterfaceClsStateImmutableInfo;
    }
  });
  
  // @assign
  Object.defineProperty($rI, 'root', {
    get: function () {
      return $rI.pIItemAPI;
    }
  });
  
  // @assign
  Object.defineProperty($rI, 'loaded', {
    get: function () {
      return $rI.pBIsLoaded;
    }
  });
  
  // @return
  return;
  
} catch ($e) {
  throw new $xCError($e.message);
}};
