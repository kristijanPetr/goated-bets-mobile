'use strict';

////////////////////////////////////////////////////////////////////////////////

// @license Copyright 2020 PackageJS. All Rights Reserved. <https://packagejs.com/license>

//////////////////////////////////////////////////////////////////////////////////////////

// @import
import $xCError from 'error-ecmascript';

// @import
import $xCJSENModInterfaceClsDOM from 'jsen-mod-interface-cls-dom-ecmascript';



////////////////////////////////////////////////////////////////////////////////

// @signature
const $ms_constructor = function (
  ...args
) {
try {
  
  // @assign
  let $rI = this;

  // @action
  try {
    $xCJSENModInterfaceClsDOM.call(
      $rI,
      ...args
    );
  } catch ($e) {
    throw new $xCError($e.message);
  }
  
  // @switch
  if ($rI.pIJSENModInterfaceClsStateImmutableInfo.hasOwnProperty('kFWindow') !== true) {
  
    // @assign
    $rI.pIJSENModInterfaceClsStateImmutableInfo['kFWindow'] = () => {
      return window;
    }
  
  }
  
  // @switch
  if ($rI.pIJSENModInterfaceClsStateImmutableInfo.hasOwnProperty('kSURL') !== true) {
  
    // @assign
    $rI.pIJSENModInterfaceClsStateImmutableInfo['kSURL'] = (new URL(window.location.href)).origin;
  
  }
  
  // @return
  return;
  
} catch ($e) {
  throw new $xCError($e.message);
}};



////////////////////////////////////////////////////////////////////////////////

// @define
const $xC = $ms_constructor;

// @extend
$xC.prototype = Object.create($xCJSENModInterfaceClsDOM.prototype);

// @assign
$xC.prototype.constructor = $xC;

// @assign
$xC.prototype.instanceof = $xC.instanceof;

// @assign
$xC.fs_action_default_search_init = $xCJSENModInterfaceClsDOM.fs_action_default_search_init;

// @assign
$xC.fs_build_context_path = $xCJSENModInterfaceClsDOM.fs_build_context_path;



////////////////////////////////////////////////////////////////////////////////

// @export
export default $xC;



////////////////////////////////////////////////////////////////////////////////
